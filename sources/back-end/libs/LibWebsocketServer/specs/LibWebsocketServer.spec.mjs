import util from 'node:util';
import {
  join,
  resolve,
} from 'node:path';
import {
  tmpdir,
} from 'node:os';
import {
  mkdtemp,
  rm,
} from 'node:fs/promises';
import dotenv from 'dotenv';
import {
  execa,
} from 'execa';
import {
  before,
  after,
  describe,
  it,
} from 'mocha';
import {
  expect,
} from 'chai';
// eslint-disable-next-line no-unused-vars
import WebSocket from 'ws';
import {
  LibWebsocketServer,
} from '../LibWebsocketServer.mjs';

describe('LibWebsocketServer', function describeLibWebsocketServer() {
  const debuglog = util.debug(`${LibWebsocketServer.name}:specs`);
  // eslint-disable-next-line no-unused-vars
  const inspect = (whatToInspect = null) => debuglog(util.inspect(whatToInspect, {
    showHidden: true,
    depth: Infinity,
    colors: true,
    showProxy: true,
    maxArrayLength: Infinity,
    maxStringLength: Infinity,
  }));
  let server = null;
  let serverConfig = null;
  let tmpDir = null;

  const generateTLS = async () => {
    const tmpPath = await mkdtemp(join(tmpdir(), 'tls-'));
    const keyFileName = join(tmpPath, 'localhost.key.pem');
    const crtFileName = join(tmpPath, 'localhost.cert.pem');

    debuglog({ tmpPath });

    const stdOut = await execa('mkcert', [
      '-ecdsa',
      '-cert-file',
      crtFileName,
      '-key-file',
      keyFileName,
      '127.0.0.1',
    ], {
      all: true,
    });

    debuglog(stdOut.all);

    return {
      tmpPath,
      keyFileName,
      crtFileName,
    };
  };

  const deleteTLS = async (tmpPath = null) => await rm(tmpPath, {
    recursive: true,
  });

  const getServerConfig = () => ({
    server: {
      host: process.env.WS_HOST,
      port: parseInt(process.env.WS_PORT, 10),
      tls: {
        keyFileName: resolve(process.env.WS_TLS_KEY_FILE_NAME),
        crtFileName: resolve(process.env.WS_TLS_CERT_FILE_NAME),
        passphrase: process.env.WS_TLS_PASSPHRASE,
      },
    },
  });

  before(async function doBefore() {
    dotenv.config({
      path: './specs/.env',
    });

    const {
      tmpPath,
      keyFileName,
      crtFileName,
    } = await generateTLS();

    tmpDir = tmpPath;

    serverConfig = getServerConfig();

    serverConfig.server.tls.keyFileName = keyFileName;
    serverConfig.server.tls.crtFileName = crtFileName;

    server = new LibWebsocketServer(serverConfig);

    server.start();
  });

  after(async function doAfter() {
    server.stop();

    try {
      await deleteTLS(tmpDir);
    } catch (error) {
      debuglog(error);
    }
  });

  it('should start/stop the server', function startStopServer() {
    expect(server).to.exist;
    expect(server.IS_RUNNING).to.equal(true);
  });
});
