import WebSocket from 'ws';

export const newClient = (serverConfig = null, path = null) => {
  const serverAddress = `wss://${serverConfig.server.host}:${serverConfig.server.port}${path}`;
  const serverProtocols = Object.freeze([]);
  const serverOpts = Object.freeze({});

  return new WebSocket(serverAddress, serverProtocols, serverOpts);
};
