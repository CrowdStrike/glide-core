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

    // We want to ignore tokens that are for
    // designers experimenting.
    if (variable.name.startsWith('dev-only/')) {
      return true;
    }

    // `data-viz/pink` tokens are not intended to be
    // used by developers and are for design use
    // cases only.
    if (variable.name.startsWith('data-viz/pink')) {
      return true;
    }
  },
  fileId: 'U5EY5xuIIibSN68gGRKlqt',
  cssPrefix: 'glide-core',
  outputDirectoryForStyles: 'src/styles/variables',
};
