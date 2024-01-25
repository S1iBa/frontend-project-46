import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (diff, formatStyle) => {
  if (formatStyle === 'stylish') {
    return stylish(diff);
  }
  if (formatStyle === 'plain') {
    return plain(diff);
  }
  if (formatStyle === 'json') {
    return JSON.stringify(diff);
  }
};

export default formatter;
