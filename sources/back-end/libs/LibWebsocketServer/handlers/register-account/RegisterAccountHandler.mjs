import {
  nanoid,
} from 'nanoid';
import {
  RegisterAccountService,
} from './fsm/RegisterAccountService.mjs';
import {
  doGenerateRegistrationOptions,
} from './fsm/services/doGenerateRegistrationOptions.mjs';
import {
  doSendToClient,
} from './fsm/services/doSendToClient.mjs';

class RegisterAccountHandlerClass {
  #rpConfig = null;
  // eslint-disable-next-line class-methods-use-this
  #debuglog = () => {};
  #config = {};
  #adgs = {
    actions: {},
    delays: {},
    guards: {},
    services: {
      doGenerateRegistrationOptions: undefined,
      doSendToClient: undefined,
    },
  };
  #IS_BINARY = true;
  #SHOULD_COMPRESS = false;

  constructor(rpConfig = null, debuglog = () => {}) {
    this.#rpConfig = rpConfig;
    this.#debuglog = debuglog;

    this.#adgs.services.doGenerateRegistrationOptions = doGenerateRegistrationOptions(this.#debuglog);
    this.#adgs.services.doSendToClient = doSendToClient(this.#debuglog);

    this.open = this.open.bind(this);
    this.message = this.message.bind(this);
    this.close = this.close.bind(this);
    this.ping = this.ping.bind(this);

    // this.#registerAccountService.start();
  }

  // eslint-disable-next-line class-methods-use-this
  open(ws = null) {
    const wsid = nanoid();
    const cfg = Object.assign(Object.create(null), this.#config);
    const ctx = {
      ws,
      rp: Object.assign(Object.create(null), this.#rpConfig),
    };

    // FIXME: remove dangle
    // eslint-disable-next-line no-underscore-dangle
    ws.__schedule__ = {
      wsid,
      svc: (new RegisterAccountService(cfg, ctx, this.#adgs, this.#debuglog)).service,
    };

    this.#debuglog('RegisterAccountHandler.open', ws);

    // eslint-disable-next-line no-underscore-dangle
    ws.__schedule__.svc.start();

    // eslint-disable-next-line no-underscore-dangle
    ws.__schedule__.svc.send({
      type: 'WS_CONNECTED',
      ws,
    });
  }
  // eslint-disable-next-line no-unused-vars, class-methods-use-this
  message(ws = null, message = null, isBinary = false) {}
  // eslint-disable-next-line no-unused-vars, class-methods-use-this
  close(ws = null, code = -1, message = null) {}
  // eslint-disable-next-line no-unused-vars, class-methods-use-this
  ping(ws = null, message = null) {
    this.#debuglog(['PING', message]);
  }
}

export const RegisterAccountHandler = (rpConfig = null, debuglog = () => {}) => (new RegisterAccountHandlerClass(rpConfig, debuglog));
