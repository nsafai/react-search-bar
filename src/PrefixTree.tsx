const START_CHARACTER = ''; // stored in the prefix tree's root node

export type PrefixTree = {
  root: PrefixTreeNode;
  size: number;
}

export type PrefixTreeNode = {
    character: string,
    terminal: boolean, // this node is the last character of a string
    children: Map<string, PrefixTreeNode>,
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
    let current_node: PrefixTreeNode = tree.root;
    for (const char of str) {        
        const child_node = current_node.children.get(char)
        // if child node doesn't exist yet
        if (child_node === undefined) {
            const child_node: PrefixTreeNode = {
                character: char,
                terminal: false,
                children: new Map<string, PrefixTreeNode>(),
            }
            current_node.children.set(char, child_node)
            current_node = child_node
        } else {
            // if child node does exist, we keep moving down
            current_node = child_node
        }
    }
    // By this point, 'character' represents last char of the string
    if (current_node && current_node.terminal === false) {
        current_node.terminal = true;
        tree.size += 1
    }
}

export function traverse(tree: PrefixTree, node: PrefixTreeNode, prefix: string, visit: (result: string) => void) {
    /* Traverse this prefix tree with recursive depth-first traversal.
Start at the given node and visit each node with the given function. */

    node.children.forEach((child_node, char) => { 
        console.log(char + ":" + child_node);
        const new_prefix = prefix + char;
        if (node.terminal) {
            visit(new_prefix);
        }
        traverse(tree, child_node, new_prefix, visit);
    });
}

export function complete(tree: PrefixTree, prefix: string) {
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

export function findNode(tree: PrefixTree, str: string) {
    /* Return a tuple containing the node that terminates the given string
    in this prefix tree and the node's depth, or if the given string is not
    completely found, return None and the depth of the last matching node.
    Search is done iteratively with a loop starting from the root node. */

    if (str.length === 0) {
        return null
    }

    let node = tree.root
    for (const char of str) {
        const child_node = node.children.get(char)
        if (child_node !== undefined) {
                node = child_node;
        } else {
            // no matches for latest char in string
            return null
        }
    }
    // found matches for every char in string
    return node
}

// export function strings(tree: PrefixTree) {
//     // Return a list of all strings stored in this prefix tree.
//     let all_strings: string[] = [];
//     traverse(tree, tree.root, "", all_strings.push)
//     return all_strings
// }

// function contains(tree: PrefixTree, str: string) {
//     // Return True if this prefix tree contains the given string.
//     // if find_node returns a node as first part of tuple
//     const node: PrefixTreeNode | null = findNode(tree, str)
//     if (node) {
//         return node.terminal === true;
//     } else {
//         return false;
//     }
// }
