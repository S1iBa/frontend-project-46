import YAML from 'js-yaml';

const parsersMap = {
  json: JSON.parse,
  yaml: YAML.load,
  yml: YAML.load,
};

const parsers = (data, format) => {
  const parse = parsersMap[format];
  if (!parse) return null;

  return parse(data);
};

export default parsers;
