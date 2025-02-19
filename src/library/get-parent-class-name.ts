import { isClassDeclaration, isIdentifier, type Node } from 'typescript';

export default (node: Node) => {
  if (isClassDeclaration(node) && node.name && isIdentifier(node.name)) {
    return node.name.text;
  }

  let parent = node.parent;

  while (parent && !isClassDeclaration(parent)) {
    parent = parent.parent;
  }

  if (parent?.name && isIdentifier(parent.name)) {
    return parent.name.text;
  }
};
