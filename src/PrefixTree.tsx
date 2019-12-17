import { Option } from "./AutocompleteBar";

const START_CHARACTER = ''; // stored in the prefix tree's root node

export type PrefixTree = {
    root: PrefixTreeNode;
    size: number;
}

export type PrefixTreeNode = {
    character: string,
    value?: Option["value"], // only terminal nodes will have a URL
    terminal: boolean, // this node is the last character of a string
    children: Map<string, PrefixTreeNode>,
}
  
export function createTree(options: Option[]) {
    const root: PrefixTreeNode = {
        character: START_CHARACTER,
        terminal: false,
        children: new Map<string, PrefixTreeNode>()
    }
    let tree: PrefixTree = {
        size: 0,
        root: root,
    }
    options.forEach(option => insertString(tree, option.label, option.value));
    return tree;
}

function insertString(tree: PrefixTree, str: string, value?: PrefixTreeNode["value"]) {
    let currentNode: PrefixTreeNode = tree.root;
    for (const char of str.toLowerCase()) {        
        const childNode = currentNode.children.get(char)
        // if child node doesn't exist yet
        if (childNode === undefined) {
            const childNode: PrefixTreeNode = {
                character: char,
                terminal: false,
                children: new Map<string, PrefixTreeNode>(),
            }
            currentNode.children.set(char, childNode);
            currentNode = childNode;
        } else {
            // if child node does exist, we keep moving down
            currentNode = childNode;
        }
    }
    // By this point, 'character' represents last char of the string
    if (currentNode && currentNode.terminal === false) {
        currentNode.terminal = true;
        if (value !== undefined) {
            currentNode.value = value;
        } else {
            currentNode.value = str;
        }
        tree.size += 1;
    }
}

export function traverse(tree: PrefixTree, node: PrefixTreeNode, prefix: string, results: Option[]) {
    /* Traverse this prefix tree with recursive depth-first traversal.
    Start at the given node and visit each node with the given function. */
    if (node.terminal && node.value) {
        const option: Option = { label: prefix, value: node.value };
        results.push(option);
    }
    node.children.forEach((childNode, char) => { 
        const newPrefix = prefix + char;
        traverse(tree, childNode, newPrefix, results);
    });
}

export function complete(tree: PrefixTree, prefix: string) {
    /* Return a list of all strings stored in this prefix tree that start
    with the given prefix string. */
    let results: Option[] = [];
    // find node with prefix
    const node = findNode(tree, prefix);
    if (node) {
        // use traverse from that node to get all possible endings, add them to completions
        traverse(tree, node, prefix, results);
    }
        
    return results;
}

export function findNode(tree: PrefixTree, str: string) {
    /* Return a tuple containing the node that terminates the given string
    in this prefix tree and the node's depth, or if the given string is not
    completely found, return None and the depth of the last matching node.
    Search is done iteratively with a loop starting from the root node. */
    if (str.length === 0) {
        return null;
    }
    // start at root node
    let node = tree.root
    for (const char of str) {
        const childNode = node.children.get(char)
        if (childNode !== undefined) {
                node = childNode;
        } else {
            // no matches for latest char in string
            return null;
        }
    }
    // found matches for every char in string
    return node;
}

export function strings(tree: PrefixTree) {
    // Return a list of all strings stored in this prefix tree.
    let results: Option[] = [];
    traverse(tree, tree.root, "", results);
    return results;
}

export function contains(tree: PrefixTree, str: string) {
    // Return True if this prefix tree contains the given string.
    const node: PrefixTreeNode | null = findNode(tree, str)
    if (node) {
        return node.terminal === true;
    } else {
        return false;
    }
}
