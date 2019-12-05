export type PrefixTreeNode = {
  character: string,
  terminal: boolean, // this node us the last character of a string in a prefix tree
  children: Map<string, PrefixTreeNode>,
}

export function hasChild(node: PrefixTreeNode, char: string) {
  /* Return True if this prefix tree node has a child node that
  represents the given character amongst its children. */
  return (char in node.children);
}

export function getChild(node: PrefixTreeNode, char: string) {
  // Find child node for given character in this node's children
  return node.children.get(char);
}

export function addChild(node: PrefixTreeNode, char: string) {
  // Add given character and child node to this node's children
  if (!hasChild(node, char)) {
    const child_node: PrefixTreeNode = {
      character: char,
      terminal: false,
      children: new Map<string, PrefixTreeNode>(),
    }
    node.children.set(char, child_node)
  }
}
