import util from 'node:util';

export const inspect = (whatToInspect = null, debuglog = () => {}) => debuglog(util.inspect(whatToInspect, {
  showHidden: true,
  depth: Infinity,
  colors: true,
  showProxy: true,
  maxArrayLength: Infinity,
  maxStringLength: Infinity,
}));
