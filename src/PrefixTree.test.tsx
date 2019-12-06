// import { createTree, findNode, traverse, complete, strings, contains } from "./PrefixTree";

// const examples = ['clever', 'classic', 'test'];

// const tree = createTree(examples);
// console.log(tree); // works
// assert size = 3

// const completeWord = complete(tree, 'classic');
// console.log("should be classic:", completeWord);

// const completions = complete(tree, 'cl');
// console.log("should be clever and classic:", completions);

// const allStrings = strings(tree);
// console.log('allStrings:', allStrings);

// const findsExistingNode = findNode(tree, 'cle');
// console.log("should be an object:", findsExistingNode)

// const findsNonExistantNode = findNode(tree, 'clepto');
// console.log("should be null:", findsNonExistantNode)

// const containsClever = contains(tree, 'clever');
// console.log("should be true:", containsClever)

// const doesNotContainClever = contains(tree, 'cleverr');
// console.log("should be false:", doesNotContainClever)