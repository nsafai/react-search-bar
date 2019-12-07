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
    const searchResults = complete(searchTree, searchTerms);
    let resultsElement;
    if (searchResults.length > 0) {
      resultsElement = searchResults.map(result => <a className="result" href={result.url}>{result.name}</a>);
    } else {
      resultsElement = <p className="no-result">No results for '{searchTerms}'</p>
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
        <div className="all-results" style={searchTerms.length > 0 ? {} : {display: "none"}}>
          {resultsElement}
        </div>
      </div>
    );
  }
}
