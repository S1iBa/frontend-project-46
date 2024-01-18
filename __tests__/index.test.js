import { test, expect } from '@jest/globals';
import genDiff from '../src';
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
  const filepath1 = getFixturePath(`file1.${format}`);
  const filepath2 = getFixturePath(`file2.${format}`);
  expect(genDiff(filepath1, filepath2)).toEqual(
    readFixture('expectedStylish.txt'),
  );
  genDiff(filepath1, filepath2, 'stylish').toEqual(
    readFixture('expectedStylish.txt'),
  );
  // expect(reverse('')).toEqual('');
});
