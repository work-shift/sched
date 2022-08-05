import util from 'node:util';
import {
  mkdtemp,
} from 'node:fs/promises';
import {
  join,
} from 'node:path';
import {
  tmpdir,
} from 'node:os';
import {
  execa,
} from 'execa';
import * as dotenv from 'dotenv';
import {
  getServerConfig,
} from '../helpers/getServerConfig.mjs';
import {
  LibWebsocketServer,
} from '../../LibWebsocketServer.mjs';

const generateTLS = async () => {
  const tmpPath = await mkdtemp(join(tmpdir(), 'tls-'));
  const keyFileName = join(tmpPath, 'localhost.key.pem');
  const crtFileName = join(tmpPath, 'localhost.cert.pem');

  await execa('mkcert', [
    '-ecdsa',
    '-cert-file',
    crtFileName,
    '-key-file',
    keyFileName,
    '127.0.0.1',
  ], {
    all: true,
  });

  process.env.WS_TLS_ROOT_PATH = tmpPath;
  process.env.WS_TLS_KEY_FILE_NAME = keyFileName;
  process.env.WS_TLS_CERT_FILE_NAME = crtFileName;
};

export async function mochaGlobalSetup() {
  dotenv.config({
    path: './specs/.env',
  });

  await generateTLS();

  const debuglog = util.debug(`${LibWebsocketServer.name}:specs`);
  const serverConfig = getServerConfig(debuglog);

  serverConfig.server.tls.keyFileName = process.env.WS_TLS_KEY_FILE_NAME;
  serverConfig.server.tls.crtFileName = process.env.WS_TLS_CERT_FILE_NAME;

  this.accountRegistrationServer = new LibWebsocketServer(serverConfig);

  return await this.accountRegistrationServer.start();
}
