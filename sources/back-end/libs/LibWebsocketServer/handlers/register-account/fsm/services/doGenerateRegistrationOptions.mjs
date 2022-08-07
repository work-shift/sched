import {
  generateRegistrationOptions,
} from '@simplewebauthn/server';
import {
  serializeRegistrationOptions,
} from '../../../../serde/serializers/serializeRegistrationOptions.mjs';

// eslint-disable-next-line no-unused-vars
export const doGenerateRegistrationOptions = (debuglog = () => {}) => (ctx, evt) => new Promise((ok, fail) => {
  debuglog('doGenerateRegistrationOptions.rest', ctx, evt);

  const {
    wsid,
    // eslint-disable-next-line no-underscore-dangle
  } = evt.ws.__schedule__;

  const registrationOptions = generateRegistrationOptions({
    rpName: 'RP NAME',
    rpID: 'RP ID',
    userID: wsid,
    userName: wsid,
    attestationType: 'indirect',
  });

  const serializedRegistrationOptions = serializeRegistrationOptions(registrationOptions);

  ok(serializedRegistrationOptions);
});
