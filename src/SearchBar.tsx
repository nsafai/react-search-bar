import React, { Component } from 'react';
import { createTree, complete, PrefixTree } from "./PrefixTree";
import './SearchBar.css';

export interface PublicProps {
  width?: number;
  pages: Page[],
}

export type Page = {
  name: string,
  url: string,
}

type SearchState = {
  searchTerms: string,
  searchTree: PrefixTree,
}

export class SearchBar extends Component<PublicProps, SearchState> {
  state = {
    searchTerms: '',
    searchTree: createTree(this.props.pages),
  }

  updateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerms: e.target.value });
  }
  
  render() {
    const { searchTerms, searchTree } = this.state;
    let searchResults;
    if (searchTerms) {
      searchResults = (
        <div className="all-results">
          {complete(searchTree, searchTerms).map(result => {
            return <a className="result" href={result.url}>{result.name}</a>;
          })}
        </div>
      );
    }
    return (
      <div className="container">
        <input 
          className="search-bar" 
          placeholder="Enter search terms"
          width={this.props.width}
          value={this.state.searchTerms}
          onChange={this.updateSearch}
        />
        {searchResults}
      </div>
    );
  }
}
