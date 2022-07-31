import util from 'node:util';
import uWS from 'uWebSockets.js';

export class LibWebsocketServer {
  // eslint-disable-next-line class-methods-use-this
  #inspect = () => {};
  // eslint-disable-next-line class-methods-use-this
  #debuglog = () => {};
  #config = null;
  #handle = null;
  #server = null;

  constructor(config = null) {
    this.#debuglog = util.debug(this.constructor.name);
    this.#inspect = (whatToInspect = null) => this.#debuglog(util.inspect(whatToInspect, {
      showHidden: true,
      depth: Infinity,
      colors: true,
      showProxy: true,
      maxArrayLength: Infinity,
      maxStringLength: Infinity,
    }));

    if (config === null) {
      throw new ReferenceError('config is undefined');
    }

    this.#config = Object.freeze({ ...config });

    // this.#inspect(this.#config);
  }

  get IS_RUNNING() {
    return this.#handle !== null;
  }

  start() {
    return new Promise((ok, fail) => {
      if (this.#handle !== null) {
        this.#debuglog(`${this.constructor.name} has already been started on ${this.#config.server.host}:${this.#config.server.port}`);

        // eslint-disable-next-line no-promise-executor-return
        return fail();
      }

      this.#server = uWS.SSLApp({
        key_file_name: this.#config.server.tls.keyFileName,
        cert_file_name: this.#config.server.tls.crtFileName,
        passphrase: this.#config.server.tls.passphrase,
      })
        .ws(this.#config.server.handlers.REGISTER_ACCOUNT.path, this.#config.server.handlers.REGISTER_ACCOUNT.opts)
        .ws(this.#config.server.handlers.AUTHENTICATE.path, this.#config.server.handlers.AUTHENTICATE.opts)
        .ws(this.#config.server.handlers.API.path, this.#config.server.handlers.API.opts)
        // eslint-disable-next-line no-unused-vars
        .any('/*', (res, req) => {
          res.end('good bye');
        })
        .listen(this.#config.server.host, this.#config.server.port, async (handle = null) => {
          if (handle === null) {
            throw new Error(`${this.constructor.name} has failed to listen to ${this.#config.server.host}:${this.#config.server.port}`);
          }

          this.#handle = handle;

          this.#debuglog(`${this.constructor.name} is listening on ${this.#config.server.host}:${this.#config.server.port}`);

          ok();
        });

      // eslint-disable-next-line no-promise-executor-return
      return undefined;
    });
  }

  stop() {
    if (this.#handle) {
      uWS.us_listen_socket_close(this.#handle);

      this.#handle = null;
    }

    this.#debuglog(`${this.constructor.name} has stopped listening on ${this.#config.server.host}:${this.#config.server.port}`);
  }
}
