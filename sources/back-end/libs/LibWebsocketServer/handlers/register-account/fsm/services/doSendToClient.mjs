const IS_BINARY = true;
const SHOULD_COMPRESS = false;

export const doSendToClient = (debuglog = () => {}) => (ctx, evt) => {
  const {
    data,
  } = evt;

  ctx.ws.send(data, IS_BINARY, SHOULD_COMPRESS);

  debuglog('doSendToClient', ctx, evt);
};
