import YAML from 'js-yaml';

const parsers = (data, format) => {
  if (format === 'json') {
    return JSON.parse(data);
  }
  if (format === 'yaml') {
    return YAML.load(data);
  }
  if (format === 'yml') {
    return YAML.load(data);
  }
  return null;
};

export { parsers };
