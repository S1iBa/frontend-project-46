const format = (difObj, outputType = 'json') => {
  if (outputType === 'json') {
    return createOutputStrJSON(difObj);
  }
  if (outputType === 'yaml') {
    return createOutputStrYAML(difObj);
  }
  if (outputType === 'yml') {
    return createOutputStrYAML(difObj);
  }
};

const createOutputStrJSON = (difObj) => {
  let result = '{\n';

  for (let key of Object.keys(difObj)) {
    let value = difObj[key];
    result += `${key}: ${value}\n`;
  }

  result += '}';

  return result;
};

const createOutputStrYAML = (difObj) => {
  let result = '\n';

  for (let key of Object.keys(difObj)) {
    let value = difObj[key];
    result += `${key}: ${value}\n`;
  }

  result += '';

  return result;
};

export default format;
