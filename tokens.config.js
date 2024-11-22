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
    // We intentionally skip over the following primitive
    // design tokens as we prefer using semantic tokens.
    const primitiveNamesToSkip = ['color', 'component'];

    for (const name of primitiveNamesToSkip) {
      if (variable.name.includes(name)) {
        return true;
      }
    }

    // `data-viz-chart` tokens are currently a work in
    // progress and need to be excluded for the time being.
    if (variable.name.startsWith('data-viz-chart')) {
      return true;
    }
  },
  fileId: 'WUB2u7DW0sLp04vFzQVFx1',
  cssPrefix: 'glide-core',
  outputDirectoryForStyles: 'src/styles/variables',
};
