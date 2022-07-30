import util from 'node:util';
import {
  resolve,
} from 'node:path';
import dotenv from 'dotenv';
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

  const getServerConfig = () => Object.freeze({
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

  before(function doBefore() {
    dotenv.config({
      path: './specs/.env',
    });

    serverConfig = getServerConfig();
    server = new LibWebsocketServer(serverConfig);

    server.start();
  });

  after(function doAfter() {
    server.stop();
  });

  it('should start/stop the server', function startStopServer() {
    expect(server).to.exist;
    expect(server.IS_RUNNING).to.equal(true);
  });
});
