// import { Command } from 'commander';
// import fs from 'fs';
// Диф строится на основе того, как файлы изменились относительно друг друга,
// ключи выводятся в алфавитном порядке.
import { parsers } from './parsers';

const createOutputStr = (difObj) => {
  let result = '{\n';

  for (let key of Object.keys(difObj)) {
    let value = difObj[key];
    result += `${key}: ${value}\n`;
  }

  result += '}';

  return result;
};

// const readFile = (filepath) => {
//   const fullPath = path.resolve(process.cwd(), filepath);
//   const data = readFileSync(fullPath, 'utf-8');
//   return parseData(data, getFormat(filepath));
// };

const genDiff = (file1, file2) => {
  console.log(file1);
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const arr = keys1.concat(keys2);
  const arr1 = [...arr].sort();
  const result = {};
  arr1.forEach((key) => {
    if (typeof file1[key] === 'object' && typeof file2[key] === 'object') {
      genDiff(file1[key], file2[key]);
      if (Object.hasOwn(file1, key) && !Object.hasOwn(file2, key)) {
        result[`- ${key}`] = file1[key];
      }
      if (Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
        if (file1[key] !== file2[key]) {
          result[`- ${key}`] = file1[key];
          result[`+ ${key}`] = file2[key];
        } else {
          result[`  ${key}`] = file1[key];
        }
      }
      if (!Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
        result[`+ ${key}`] = file2[key];
      }
    }
  });
  return createOutputStr(result);
};

export default genDiff;
export { createOutputStr };
