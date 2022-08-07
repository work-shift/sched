export const serializeRegistrationOptions = (RegistrationOptions = null) => {
  const envelope = Object.freeze({
    type: 'RegistrationOptions',
    payload: RegistrationOptions,
  });

  const envelopeBuffer = Buffer.from(JSON.stringify(envelope));

  return envelopeBuffer;
};
