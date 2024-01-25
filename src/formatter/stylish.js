const countSpace = 4;

const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return value;
  }

  const fields = Object.entries(value)
    .map(
      ([key, val]) => `${' '.repeat((depth + 1) * countSpace)}${key}: ${stringify(
        val,
        depth + 1,
      )}`,
    )
    .join('\n');

  return `{\n${fields}\n${' '.repeat(depth * countSpace)}}`;
};

const stylish = (ast) => {
  const iter = (node, depth) => {
    switch (node.type) {
      case 'root': {
        const fields = node.children
          .flatMap((n) => iter(n, depth + 1))
          .join('\n');

        return `{\n${fields}\n}`;
      }

      case 'object': {
        const fields = node.children
          .flatMap((n) => iter(n, depth + 1))
          .join('\n');

        return `${' '.repeat(depth * countSpace)}${
          node.key
        }: {\n${fields}\n${' '.repeat(depth * countSpace)}}`;
      }

      case 'add': {
        return `${' '.repeat(depth * countSpace - 2)}+ ${node.key}: ${stringify(
          node.value,
          depth,
        )}`;
      }

      case 'remove': {
        return `${' '.repeat(depth * countSpace - 2)}- ${node.key}: ${stringify(
          node.value,
          depth,
        )}`;
      }

      case 'changed': {
        return [
          `${' '.repeat(depth * countSpace - 2)}- ${node.key}: ${stringify(
            node.oldValue,
            depth,
          )}`,
          `${' '.repeat(depth * countSpace - 2)}+ ${node.key}: ${stringify(
            node.newValue,
            depth,
          )}`,
        ];
      }

      case 'unchanged': {
        return `${' '.repeat(depth * countSpace)}${node.key}: ${stringify(
          node.value,
          depth,
        )}`;
      }
    }
  };

  return iter(ast, 0);
};

export default stylish;
