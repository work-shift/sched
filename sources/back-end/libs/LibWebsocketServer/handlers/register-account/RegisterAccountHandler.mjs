const IS_BINARY = true;
const SHOULD_COMPRESS = false;

// eslint-disable-next-line no-unused-vars
export const RegisterAccountHandler = (uWS = null, debuglog = () => {}) => Object.freeze({
  open: (ws = null) => {
    debuglog('RegisterAccountHandler.open', ws);

    const message = Buffer.from('hello');

    ws.send(message, IS_BINARY, SHOULD_COMPRESS);
  },
  // eslint-disable-next-line no-unused-vars
  message: (ws = null, message = null, isBinary = false) => {},
  // eslint-disable-next-line no-unused-vars
  close: (ws = null, code = -1, message = null) => {},
  // eslint-disable-next-line no-unused-vars
  ping: (ws = null, message = null) => {
    debuglog(['PING', message]);
  },
});
