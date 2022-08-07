import WebSocket from 'ws';

export const newClient = (host = null, port = null, path = null) => {
  const serverAddress = `wss://${host}:${port}${path}`;
  const serverProtocols = Object.freeze([]);
  const serverOpts = Object.freeze({});

  return new WebSocket(serverAddress, serverProtocols, serverOpts);
};
