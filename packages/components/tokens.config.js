export default {
  themes: [
    {
      name: 'dark',
      colorScheme: 'dark',
      tokenKey: 'dark',
    },
    {
      name: 'light',
      colorScheme: 'light',
      tokenKey: 'light',
    },
    {
      name: 'system',
      colorScheme: 'normal',
      tokenKey: 'primitive',
    },
  ],
  excludeCollections(collection) {
    const collectionIds = [
      'VariableCollectionId:14:62',
      'VariableCollectionId:44:2502',
    ];

    return !collectionIds.includes(collection.id);
  },
  excludeVariables(variable) {
    const variableNames = ['color', 'component', 'data-viz'];

    for (const name of variableNames) {
      if (variable.name.includes(name)) {
        return true;
      }
    }
  },
  fileId: 'U5EY5xuIIibSN68gGRKlqt',
  cssPrefix: 'cs',
  outputDirectoryForStyles: 'src/styles/variables',
};
