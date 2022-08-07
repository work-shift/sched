import {
  interpret,
} from 'xstate';
import {
  RegisterAccountMachine,
} from './RegisterAccountMachine.mjs';

export class RegisterAccountService {
  #config = null;
  #context = null;
  #adgs = null;
  // eslint-disable-next-line class-methods-use-this
  #debuglog = () => {};

  constructor(config = null, context = null, adgs = null, debuglog = () => {}) {
    this.#config = Object.freeze(Object.assign(Object.create(null), config));
    this.#context = Object.assign(Object.create(null), context);
    this.#adgs = Object.freeze(Object.assign(Object.create(null), adgs));
    this.#debuglog = debuglog;
  }

  // eslint-disable-next-line class-methods-use-this
  get service() {
    return interpret(
      RegisterAccountMachine(this.#config, this.#context, this.#adgs, this.#debuglog),
    )
      .onTransition((state) => {
        this.#debuglog(`RegisterAccountService.onTransition: ${state.value}`);
      })
      .onChange((ctx, prevCtx) => {
        this.#debuglog(`RegisterAccountService.onChange: ${JSON.stringify(prevCtx)} -> ${JSON.stringify(ctx)}`);
      })
      .onDone((doneEvent) => {
        this.#debuglog('RegisterAccountService.onDone', doneEvent);
      })
      .onEvent((event) => {
        this.#debuglog('RegisterAccountService.onEvent', event);
      })
      .onSend((sendEvent) => {
        this.#debuglog('RegisterAccountService.onSend', sendEvent);
      })
      .onStop(() => {
        this.#debuglog('RegisterAccountService.onStop');
      });
  }
}
