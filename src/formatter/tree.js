import createOutputStr from './stylish';

const tree = (file1, file2) => {
  console.log(file1);
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const arr = keys1.concat(keys2);
  const arr1 = [...arr].sort();
  const result = {};
  arr1.map((key) => {
    if (typeof file1[key] === 'object' && typeof file2[key] === 'object') {
      tree(file1[key], file2[key]);
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
  return result;
};

export default tree;
