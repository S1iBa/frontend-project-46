#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/index.js';

// const program = new Command();

program
  .version('0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action(function (filepath1, filepath2, dict) {
    const diff = genDiff(filepath1, filepath2, dict.format ?? 'stylish');
    console.log(diff);
  });
program.parse();
