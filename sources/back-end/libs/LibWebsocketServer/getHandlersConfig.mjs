import {
  RegisterAccountHandler,
} from './handlers/register-account/RegisterAccountHandler.mjs';
import {
  AuthenticateHandler,
} from './handlers/authenticate/AuthenticateHandler.mjs';
import {
  APIHandler,
} from './handlers/api/APIHandler.mjs';
import {
  Paths,
} from './handlers/Paths.mjs';

export const getHandlersConfig = (uWS = null, rpConfig = null, debuglog = () => {}) => {
  const registerAccountHandler = RegisterAccountHandler(rpConfig, debuglog);

  return {
    REGISTER_ACCOUNT: {
      path: Paths.REGISTER_ACCOUNT,
      opts: {
        compression: uWS.SHARED_COMPRESSOR,
        maxPayloadLength: (16 * 1024 * 1024),
        idleTimeout: 12,
        ...registerAccountHandler,
      },
    },
    AUTHENTICATE: {
      path: Paths.AUTHENTICATE,
      opts: {
        compression: uWS.SHARED_COMPRESSOR,
        maxPayloadLength: (16 * 1024 * 1024),
        idleTimeout: 12,
        ...AuthenticateHandler(uWS, debuglog),
      },
    },
    API: {
      path: Paths.API,
      opts: {
        compression: uWS.SHARED_COMPRESSOR,
        maxPayloadLength: (16 * 1024 * 1024),
        idleTimeout: 12,
        ...APIHandler(uWS, debuglog),
      },
    },
  };
};
