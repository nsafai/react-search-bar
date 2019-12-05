import React from 'react';
import { createTree, strings, traverse } from "./PrefixTree";
import './SearchBar.css';

interface PublicProps {
  // TODO: Ensure/enforce proper hex colors as type
  backgroundColor?: string;
  textColor?: string;
  padding?: number;
}

const SearchBar: React.FC<PublicProps> = (props: PublicProps) => {
  const examples = ['clever', 'classic', 'test'];
  const tree = createTree(examples);
  const tests = strings(tree);
  // console.log('traversing list:', traverse(tree, tree.root, "", console.log));
  console.log(tree);


  return (
    <div className="container">
      <input className="search-bar" placeholder="Enter search terms" />
      <div className="all-results">
        <a className="result" href="">Some title</a>
        <a className="result" href="">Some title</a>
      </div>
    </div>
  );
}

SearchBar.defaultProps = {
  backgroundColor: "#FFFFFF",
  textColor: "#FFFFFF",
  padding: 0.5,
}

export default SearchBar;
