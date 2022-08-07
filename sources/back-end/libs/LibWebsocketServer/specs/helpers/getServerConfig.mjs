import {
  resolve,
} from 'node:path';
import uWS from 'uWebSockets.js';
import {
  getHandlersConfig,
} from '../../getHandlersConfig.mjs';

export const getServerConfig = (debuglog = () => {}) => {
  const rp = {
    id: process.env.RP_ID,
    name: process.env.RP_NAME,
  };

  return Object.freeze({
    server: {
      host: process.env.WS_HOST,
      port: parseInt(process.env.WS_PORT, 10),
      tls: {
        keyFileName: resolve(process.env.WS_TLS_KEY_FILE_NAME),
        crtFileName: resolve(process.env.WS_TLS_CERT_FILE_NAME),
        passphrase: process.env.WS_TLS_PASSPHRASE,
      },
      handlers: getHandlersConfig(uWS, rp, debuglog),
    },
  });
};
