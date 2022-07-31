import {
  RegisterAccountHandler,
} from './handlers/register-account/RegisterAccountHandler.mjs';
import {
  AuthenticateHandler,
} from './handlers/authenticate/AuthenticateHandler.mjs';
import {
  APIHandler,
} from './handlers/api/APIHandler.mjs';

export const getHandlersConfig = (uWS = null, debuglog = () => {}) => Object.freeze({
  REGISTER_ACCOUNT: {
    path: '/register-account',
    opts: {
      compression: uWS.SHARED_COMPRESSOR,
      maxPayloadLength: (16 * 1024 * 1024),
      idleTimeout: 12,
      ...RegisterAccountHandler(uWS, debuglog),
    },
  },
  AUTHENTICATE: {
    path: '/authenticate',
    opts: {
      compression: uWS.SHARED_COMPRESSOR,
      maxPayloadLength: (16 * 1024 * 1024),
      idleTimeout: 12,
      ...AuthenticateHandler(uWS, debuglog),
    },
  },
  API: {
    path: '/api',
    opts: {
      compression: uWS.SHARED_COMPRESSOR,
      maxPayloadLength: (16 * 1024 * 1024),
      idleTimeout: 12,
      ...APIHandler(uWS, debuglog),
    },
  },
});
