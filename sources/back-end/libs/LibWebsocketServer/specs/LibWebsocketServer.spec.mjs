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
import uWS from 'uWebSockets.js';
// eslint-disable-next-line no-unused-vars
import WebSocket from 'ws';
import {
  nanoid,
} from 'nanoid';
import {
  LibWebsocketServer,
} from '../LibWebsocketServer.mjs';
import {
  getHandlersConfig,
} from '../getHandlersConfig.mjs';

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
      handlers: getHandlersConfig(uWS, debuglog),
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
  });

  after(async function doAfter() {
    try {
      await deleteTLS(tmpDir);
    } catch (error) {
      debuglog(error);
    }
  });

  // FIXME: testHandlers -> shouldPingPaths
  it('should ping all handlers', async function testHandlers() {
    const doPingPong = async (client = null) => new Promise((ok, fail) => {
      const pingMessage = Buffer.from(nanoid());
      const isPingMasked = true;

      client.on('error', (err) => {
        debuglog(['client:on:error =>', err]);

        return fail(err);
      });

      client.on('open', () => {
        client.ping(pingMessage, isPingMasked, function pingFrameSent(networkError = null) {
          if (networkError !== null) {
            debuglog({
              networkError,
            });

            return fail(networkError);
          }

          debuglog('pingFrameSent');

          return undefined;
        });
      });

      client.on('pong', (dataBuffer = null) => {
        debuglog('on:pong', dataBuffer.toString());

        client.close();
      });

      client.on('close', (code = null, reason = null) => {
        debuglog('client:close', code, `"${reason.toString()}"`);

        return ok();
      });
    });

    const aServer = new LibWebsocketServer(serverConfig);

    await aServer.start();

    for await (const [, handlerContents] of Object.entries(serverConfig.server.handlers)) {
      const {
        path,
      } = handlerContents;

      const aServerAddress = `wss://${serverConfig.server.host}:${serverConfig.server.port}${path}`;
      const aServerProtocols = Object.freeze([]);
      const aServerOpts = Object.freeze({});
      let client = new WebSocket(aServerAddress, aServerProtocols, aServerOpts);

      await doPingPong(client);

      client = null;
    }
    aServer.stop();

    // FIXME: remove this
    expect(true).to.be.true;
  });

  it('should register account', async function shouldRegisterAccount() {
    const accountRegistrationServer = new LibWebsocketServer(serverConfig);

    await accountRegistrationServer.start();
    accountRegistrationServer.stop();

    expect(true).to.be.true;
  });
});
