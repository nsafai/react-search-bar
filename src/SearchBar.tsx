import React from 'react';
import { createTree, findNode, traverse, complete, strings, contains } from "./PrefixTree";
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
  console.log(tree); // works

  const completions = complete(tree, 'cl');
  console.log("should be clever and classic:", completions);

  const allStrings = strings(tree);
  console.log('allStrings:', allStrings);

  return (
    <div className="container">
      <input className="search-bar" placeholder="Enter search terms" />
      <div className="all-results">
        <a className="result" href="/">Some title</a>
        <a className="result" href="/">Some title</a>
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
