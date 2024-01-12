import { test, expect } from '@jest/globals';
import genDiff from '../src/main';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import { parsers } from '../src/parsers';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const formats = ['yaml', 'json'];

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) =>
  readFileSync(getFixturePath(filename), 'utf-8');

test.each(formats)('genDiff should work correctly', (format) => {
  const filepath1 = readFixture(`file1.${format}`);
  const filepath2 = readFixture(`file2.${format}`);
  // console.log(filepath1);
  expect(
    genDiff(parsers(filepath1, format), parsers(filepath2, format)),
  ).toEqual(readFixture('expectedJSON.txt'));
  // expect(reverse('')).toEqual('');
});
