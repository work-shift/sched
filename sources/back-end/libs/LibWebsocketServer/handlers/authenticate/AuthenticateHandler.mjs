// eslint-disable-next-line no-unused-vars
export const AuthenticateHandler = (uWS = null, debuglog = () => {}) => Object.freeze({
  // eslint-disable-next-line no-unused-vars
  open: () => {},
  // eslint-disable-next-line no-unused-vars
  message: (ws = null, message = null, isBinary = false) => {},
  // eslint-disable-next-line no-unused-vars
  close: (ws = null, code = -1, message = null) => {},
  // eslint-disable-next-line no-unused-vars
  ping: (ws = null, message = null) => {
    debuglog(['PING', message]);
  },
});
