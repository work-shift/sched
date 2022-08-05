import util from 'node:util';
import {
  before,
  describe,
  it,
} from 'mocha';
import {
  expect,
} from 'chai';
import {
  LibWebsocketServer,
} from '../LibWebsocketServer.mjs';
import {
  getServerConfig,
} from './helpers/getServerConfig.mjs';
import {
  newClient,
} from './helpers/newClient.mjs';

describe('LibWebsocketServer', function describeLibWebsocketServer() {
  const debuglog = util.debug(`${LibWebsocketServer.name}:specs`);
  let serverConfig = null;

  before(async function doBefore() {
    serverConfig = getServerConfig(debuglog);
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

    //
    const {
      path,
    } = serverConfig.server.handlers.REGISTER_ACCOUNT;
    let client = newClient(serverConfig, path);

    await doRegisterAccount(client);

    //
    client = null;

    // FIXME: remove it
    expect(true).to.be.true;
  });
});
