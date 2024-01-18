import { Command } from 'commander';
import fs from 'fs';
import genDiff from '../src/index.js';
import { parsers } from '../src/parsers.js';
// Default option value
// You can specify a default value for an option.

// Example file: options-defaults.js

// program
//   .option('-c, --cheese <type>', 'add the specified type of cheese', 'blue');

// program.parse();

// console.log(`cheese: ${program.opts().cheese}`);
// в action
const program = new Command();

program
  .version('0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  //   .option('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action(function (filepath1, filepath2, dict) {
    console.log(JSON.stringify(dict));
    //добавить параметр, который будет определять, в каком формате должен быть вывод
    //gendiff применяю здесь.
    const diff = genDiff(filepath1, filepath2, dict.format ?? 'json');
    console.log(diff);
  });
program.parse();

//создать дерево, которое я буду отдавать в форматтер. свою структуру данных:
//древовидная структура, хранящая в себе данные о
//разницы между файлами. получаю два объекта, в котором буду выяснять, как изменились файлы.
//type add, changed, remove(поле value), вложенный(поле children).
//форматтер - отображение, как выглядит вывод приложения.
//сам текст из гендифф.
//папка форматтер.
//билд аст(создает дерево), часть в форматтер.
//индекс: обрабатывает дерево, тип форматтера.
//создать дерево(file1, file2) через map()
//плоская обрабобтка add, remove, changing
//получить ключи, оставить только уникальные значения. по нему пробежаться map(). если есть и там и там
//передать в main, возвращаю дерева typeroot вернуть объект;
//
