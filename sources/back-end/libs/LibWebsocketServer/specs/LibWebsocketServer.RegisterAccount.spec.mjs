import util from 'node:util';
import {
  before,
  describe,
  it,
} from 'mocha';
import {
  expect,
} from 'chai';
import WebSocket from 'ws';
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

  it('should register account', async function shouldRegisterAccount() {
    /**
     * reference: https://webauthn.guide/#registration
     * libs: https://github.com/MasterKale/SimpleWebAuthn
     *
     * 1. the client establishes wss to the /register-account path
     * 2. the wss immediately sends back a publicKeyCredentialCreationOptions message
     * 3. the client
     */
    const doRegisterAccount = async (c = null) => new Promise((ok, fail) => {
      if (c === null) {
        fail(new ReferenceError('client is undefined'));
      }

      c.on('error', function handleError(error) {
        fail(error);
      });

      c.on('open', function handleOpen() {
        debuglog('client connected to wss');
      });

      c.on('message', function handleServerMessage(data = null, isBinary = false) {
        debuglog(`client received ${isBinary ? 'binary' : 'non-binary'} "${data.toString()}"`);

        if (isBinary === false) {
          fail(new TypeError('expected to receive binary message'));
        }

        ok();
      });
    });

    const accountRegistrationServer = new LibWebsocketServer(serverConfig);

    await accountRegistrationServer.start();

    //
    const {
      path,
    } = serverConfig.server.handlers.REGISTER_ACCOUNT;
    const accountRegistrationServerAddress = `wss://${serverConfig.server.host}:${serverConfig.server.port}${path}`;
    const accountRegistrationServerProtocols = Object.freeze([]);
    const accountRegistrationServerOpts = Object.freeze({});
    let client = new WebSocket(
      accountRegistrationServerAddress,
      accountRegistrationServerProtocols,
      accountRegistrationServerOpts,
    );

    await doRegisterAccount(client);

    //
    client = null;
    accountRegistrationServer.stop();

    // FIXME: remove it
    expect(true).to.be.true;
  });
});
