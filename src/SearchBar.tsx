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
  selectedResult: number,
}

export class SearchBar extends Component<PublicProps, SearchState> {
  state = {
    searchTerms: '',
    searchTree: createTree(this.props.pages),
    selectedResult: -1, // default -1 so it goes to index 0 on first keydown
  }

  updateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerms: e.target.value });
  }

  handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>, numResults: number) => {
    const { selectedResult } = this.state;
    // if press down arrow, move down 1 search result
    if (e.keyCode === 40) {
      const chosenResult = document.getElementById(`result-${selectedResult+1}`);
      chosenResult && chosenResult.focus();
      if (selectedResult < numResults - 1) {
        this.setState({ selectedResult: this.state.selectedResult + 1 })
      }
    }
    // if press up arrow, move up 1 search result
    else if (e.keyCode === 38) {
      const chosenResult = document.getElementById(`result-${selectedResult-1}`);
      chosenResult && chosenResult.focus();
      if (selectedResult >= 1) {
        this.setState({ selectedResult: selectedResult - 1 })
      }
    }
    // for all other keypresses, bring foocus back to search bar
    else {
      const searchBar = document.getElementById("search-bar");
      searchBar && searchBar.focus();
    }
  }
  
  render() {
    const { searchTerms, searchTree } = this.state;
    const searchResults = complete(searchTree, searchTerms);
    const numResults = searchResults.length;
    let resultsElement;
    if (searchResults.length > 0) {
      resultsElement = searchResults.map((result, idx) => {
        return (
          <a className="result" href={result.url} id={`result-${idx}`} key={`r-${idx}`}>
            {result.name}
          </a>
        );
      });
    } else {
      resultsElement = <p className="no-result">No results for '{searchTerms}'</p>
    }

    return (
      <div className="container" onKeyDown={(e) => this.handleKeyPress(e, numResults)}>
        <input 
          id="search-bar"
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
