import { readFileSync } from 'fs';
import path from 'path';
import parsers from './parsers.js';
import tree from '../tree.js';
import formatter from './formatter/index.js';

const getFormat = (filepath) => {
  const fmt = path.extname(filepath).split('.');
  return fmt[fmt.length - 1];
};

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const data = readFileSync(fullPath, 'utf-8');
  return parsers(data, getFormat(filepath));
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);
  const diff = tree(file1, file2);
  return formatter(diff, format);
};
export default genDiff;
