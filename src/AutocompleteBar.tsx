import React, { Component } from 'react';
import { createTree, complete, PrefixTree } from "./PrefixTree";
import './AutocompleteBar.css';

export interface PublicProps {
  placeholderText?: string,
  type?: ResultType,
  values: Option[],
}

export type Option = {
  label: string,
  value?: string, // if no value is passed, label is used as value
}

type SearchState = {
  searchTerms: string,
  searchTree: PrefixTree,
  selectedResult: number,
}

enum ResultType {
  TEXT = "TEXT",
  LINK = "LINK"
}

export class AutocompleteBar extends Component<PublicProps, SearchState> {
  state = {
    searchTerms: '',
    searchTree: createTree(this.props.values),
    selectedResult: -1, // default -1 so it goes to index 0 on first keydown
  }

  static defaultProps = {
    placeholderText: "Enter search terms",
    type: ResultType.TEXT,
  }

  updateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ 
      searchTerms: e.target.value,
      selectedResult: -1, // resets to default value
    });
  }

  handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>, numResults: number) => {
    const { selectedResult } = this.state;
    let chosenResult: any;
    switch(e.key) {
      case('ArrowDown'):
        // if press down arrow, check if we are in bounds, then move down 1 result
        if (selectedResult < numResults - 1) {
          chosenResult = document.getElementById(`result-${selectedResult+1}`);
          chosenResult && chosenResult.focus();
          this.setState({ selectedResult: this.state.selectedResult + 1 });
        }
        break;
      case('ArrowUp'):
        // if press up arrow, check if we are in bounds, then move up 1 result
        if (selectedResult > 0) {
          chosenResult = document.getElementById(`result-${selectedResult-1}`);
          chosenResult && chosenResult.focus();
          this.setState({ selectedResult: selectedResult - 1 })
        }
        break;
      case('Enter'):
        // if press Enter, do not shift focus to search bar as for other keypresses. 
        if (this.props.type === ResultType.TEXT) {
          chosenResult = document.getElementById(`result-${selectedResult}`);
          if (chosenResult instanceof HTMLElement) {
            const searchTerms: string = chosenResult.innerHTML;
            this.setState({ searchTerms });
          }
        }
        // if props.type === ResultType.LINK, we can use default Enter behavior, nav to link
        break;
      default:
        // for all other keypresses, bring focus back to search bar
        const searchBar = document.getElementById("autocomplete-bar");
        searchBar && searchBar.focus();
        break;
    }
  }
  
  render() {
    const { searchTerms, searchTree } = this.state;
    const searchResults = complete(searchTree, searchTerms);
    let resultsElement;

    // if there is at least one result for user's search terms
    if (searchResults.length > 0) {
      resultsElement = searchResults.map((result, idx) => {
        if (this.props.type === ResultType.LINK) {
          return (
            <a className="result" href={result.value} id={`result-${idx}`} key={`r-${idx}`}>
              {result.label}
            </a>
          );
        } else {
          return <button className="result" id={`result-${idx}`} key={`r-${idx}`}>{result.value}</button>;
        }
      });
    } else {
      resultsElement = <p className="no-result">Nothing starts with '{searchTerms}'</p>
    }

    return (
      <div className="container" onKeyDown={(e) => this.handleKeyPress(e, searchResults.length)}>
        <input 
          id="autocomplete-bar"
          className="autocomplete-bar" 
          placeholder={this.props.placeholderText}
          value={this.state.searchTerms}
          onChange={this.updateSearch}
        />
        <div className="all-results" style={ searchTerms.length > 0 ? {} : { display: "none" }}>
          {resultsElement}
        </div>
      </div>
    );
  }
}
