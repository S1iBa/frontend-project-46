const stringify = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const makePath = (node, newPath) => (newPath !== '' ? `${newPath}.${node.key}` : node.key);

const plain = (ast) => {
  const iter = (node, path) => {
    const newPath1 = makePath(node, path);
    switch (node.type) {
      case 'root': {
        return node.children.flatMap((n) => iter(n, path));
      }

      case 'object': {
        return node.children.flatMap((n) => iter(n, newPath1));
      }

      case 'add': {
        return `Property '${newPath1}' was added with value: ${stringify(
          node.value,
        )}`;
      }

      case 'remove': {
        return `Property '${newPath1}' was removed`;
      }

      case 'changed': {
        return [
          `Property '${newPath1}' was updated. From ${stringify(
            node.oldValue,
          )} to ${stringify(node.newValue)}`,
        ];
      }

      case 'unchanged': {
        return [];
      }
    }
  };
  const result = iter(ast, '');
  return result.join('\n');
};

export default plain;
