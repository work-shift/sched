import util from 'node:util';
import {
  before,
  describe,
  it,
} from 'mocha';
import {
  // eslint-disable-next-line no-unused-vars
  expect,
} from 'chai';
// eslint-disable-next-line no-unused-vars
import WebSocket from 'ws';
import {
  nanoid,
} from 'nanoid';
import {
  LibWebsocketServer,
} from '../LibWebsocketServer.mjs';
import {
  getServerConfig,
} from './helpers/getServerConfig.mjs';

describe('LibWebsocketServer', function describeLibWebsocketServer() {
  const debuglog = util.debug(`${LibWebsocketServer.name}:specs`);
  let serverConfig = null;

  before(async function doBefore() {
    serverConfig = getServerConfig(debuglog);

    serverConfig.server.tls.keyFileName = process.env.WS_TLS_KEY_FILE_NAME;
    serverConfig.server.tls.crtFileName = process.env.WS_TLS_CERT_FILE_NAME;
  });

  it('should ping all handlers', async function shouldPingPaths() {
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
  });
});
