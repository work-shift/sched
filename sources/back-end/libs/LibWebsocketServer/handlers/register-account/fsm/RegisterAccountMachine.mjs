import {
  createMachine,
} from 'xstate';

export const RegisterAccountMachine = (config = null, context = null, adgs = null) => createMachine({
  predictableActionArguments: true,
  id: 'RegisterAccountMachine',
  initial: 'initial',
  context: {
    wsid: 'asshole-wsid',
  },
  states: {
    initial: {
      on: {
        WS_CONNECTED: {
          target: 'generateRegistrationOptions',
        },
      },
    },
    generateRegistrationOptions: {
      invoke: {
        id: 'doGenerateRegistrationOptions',
        src: 'doGenerateRegistrationOptions',
        onDone: {
          target: 'sendRegistrationOptionsToClient',
        },
        onError: {
          target: 'endFailure',
        },
      },
    },
    sendRegistrationOptionsToClient: {
      invoke: {
        id: 'sendRegistrationOptionsToClient',
        src: 'doSendToClient',
        onDone: {
          target: 'endOK',
        },
        onError: {
          target: 'endFailure',
        },
      },
    },
    endFailure: {
      type: 'final',
    },
    endOK: {
      type: 'final',
    },
  },
}, adgs)
  .withConfig(config)
  .withContext(context);
