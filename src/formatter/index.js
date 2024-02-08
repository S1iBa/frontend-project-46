import stylish from './stylish.js';
import plain from './plain.js';

const formatterMap = {
  stylish,
  plain,
  json: JSON.stringify,
};

const formatter = (diff, formatStyle) => {
  const mapper = formatterMap[formatStyle];

  if (!mapper) return null;

  return mapper(diff);
};

export default formatter;
