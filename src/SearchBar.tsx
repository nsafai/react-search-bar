import React from 'react';
import { createTree, complete } from "./PrefixTree";
import './SearchBar.css';

export interface PublicProps {
  width?: number;
  pages: Page[],
}

export type Page = {
  name: string,
  url: string | URL,
}

const SearchBar: React.FC<PublicProps> = (props: PublicProps) => {
  const searchTree = createTree(props.pages);
  console.log(searchTree);
  console.log(complete(searchTree, "Ho"));

  return (
    <div className="container">
      <input 
        className="search-bar" 
        placeholder="Enter search terms"
        width={props.width}
      />
      <div className="all-results">
        <a className="result" href="/">Some title</a>
        <a className="result" href="/">Some title</a>
      </div>
    </div>
  );
}

SearchBar.defaultProps = {
  // width:
}

export default SearchBar;
