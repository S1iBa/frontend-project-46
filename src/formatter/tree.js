const buildTree = (file1, file2) => {
  const iter = (data1, data2) => {
    const keys1 = Object.keys(data1);
    const keys2 = Object.keys(data2);

    const uniqKeys = Array.from(new Set(keys1.concat(keys2)));
    const sortedKeys = [...uniqKeys].sort();

    return sortedKeys.map((key) => {
      if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) {
        return {
          key,
          type: 'remove',
          value: data1[key],
        };
      }

      if (!Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
        return {
          key,
          type: 'add',
          value: data2[key],
        };
      }

      if (typeof data1[key] === 'object' && typeof data2[key] === 'object') {
        return {
          key,
          type: 'object',
          children: iter(data1[key], data2[key]),
        };
      }

      if (data1[key] !== data2[key]) {
        return {
          key,
          type: 'changed',
          oldValue: data1[key],
          newValue: data2[key],
        };
      }

      return {
        key,
        type: 'unchanged',
        value: data2[key],
      };
    });
  };

  return {
    type: 'root',
    children: iter(file1, file2),
  };
};

export default buildTree;
