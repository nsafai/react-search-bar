import { addChild, getChild, hasChild, PrefixTreeNode } from "./PrefixTreeNode";        

const START_CHARACTER = ''; // stored in the prefix tree's root node

export type PrefixTree = {
  root: PrefixTreeNode;
  size: number;
}

export function createTree(strings: string[]) {
    const root: PrefixTreeNode = {
        character: START_CHARACTER,
        terminal: false,
        children: new Map<string, PrefixTreeNode>()
    }
    let tree: PrefixTree = {
        size: 0,
        root: root,
    };
    strings.forEach(str => insertString(tree, str));
    return tree;
}

function insertString(tree: PrefixTree, str: string) {
    let current_node: PrefixTreeNode | undefined = tree.root;
    for (const char of str) {
        if (current_node) {
            if (hasChild(current_node, char)) {
                // move down
                current_node = getChild(current_node, char)
            } else {
                // add the character
                addChild(current_node, char)
                // move down
                current_node = getChild(current_node, char)
            }
        }
    }
    // By this point, 'character' represents last char of the string
    // node is being added for the first time
    if (current_node && current_node.terminal == false) {
        current_node.terminal = true;
        tree.size += 1
    }
}

function contains(tree: PrefixTree, str: string) {
    // Return True if this prefix tree contains the given string.
    // if find_node returns a node as first part of tuple
    const node: PrefixTreeNode | null = findNode(tree, str)
    if (node) {
        return node.terminal == true;
    } else {
        return false;
    }
}

function findNode(tree: PrefixTree, str: string) {
    /* Return a tuple containing the node that terminates the given string
    in this prefix tree and the node's depth, or if the given string is not
    completely found, return None and the depth of the last matching node.
    Search is done iteratively with a loop starting from the root node. */

    if (str.length == 0) {
        return null
    }

    let node = tree.root
    let depth = 0
    for (const char of str) {
        if (hasChild(node, char)) {
            const child_node = getChild(node!, char)
            if (child_node !== undefined) {
                // move down
                node = child_node;
                depth += 1;
            }
        } else {
            // no matches for latest char in string
            return null
        }
    }
    // found matches for every char in string
    return node
}

function complete(tree: PrefixTree, prefix: string) {
    /* Return a list of all strings stored in this prefix tree that start
    with the given prefix string. */
    let completions = [];
    // find node with prefix
    const node = findNode(tree, prefix);
    if (node) {
        if (node.terminal) {
            completions.push(prefix)
        }
        // use traverse from that node to get all possible endings, add them to completions
        traverse(tree, node, prefix, completions.push)
    }
        
    return completions
}

function strings(tree: PrefixTree) {
    // Return a list of all strings stored in this prefix tree.
    let all_strings: string[] = [];
    traverse(tree, tree.root, "", all_strings.push)
    return all_strings
}

function traverse(tree: PrefixTree, node: PrefixTreeNode, prefix: string, visit: (result: string) => void) {
    /* Traverse this prefix tree with recursive depth-first traversal.
    Start at the given node and visit each node with the given function. */
    for (let character in node.children) {
        const new_prefix = prefix + character
        const child_node = node.children.get(character)
        if (child_node) {
            if (child_node.terminal) {
                visit(new_prefix)
            }
            traverse(tree, child_node, new_prefix, visit)
        } 
    }
}
