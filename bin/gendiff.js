import { Command } from 'commander';
import fs from 'fs';
import genDiff from '../src/main.js';
import { parsers } from '../src/parsers.js';

const program = new Command();

program
  .version('0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  //   .option('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format')
  .action(function (filepath1, filepath2) {
    const f1 = filepath1.split('.');
    const f2 = filepath2.split('.');
    const fmt1 = f1[f1.length - 1];
    const fmt2 = f2[f2.length - 1];
    let file1 = fs.readFileSync(filepath1);
    let file2 = fs.readFileSync(filepath2);
    const diff = genDiff(parsers(file1, fmt1), parsers(file2, fmt2));
    console.log(diff);
  });
program.parse();
