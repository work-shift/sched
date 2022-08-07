import util from 'node:util';
import {
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
  newClient,
} from './helpers/newClient.mjs';
import {
  Paths,
} from '../handlers/Paths.mjs';

describe('LibWebsocketServer', function describeLibWebsocketServer() {
  const debuglog = util.debug(`${LibWebsocketServer.name}:specs`);

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
    const host = process.env.WS_HOST;
    const port = parseInt(process.env.WS_PORT, 10);
    let client = newClient(host, port, Paths.REGISTER_ACCOUNT);

    await doRegisterAccount(client);

    //
    client = null;

    // FIXME: remove it
    expect(true).to.be.true;
  });
});
