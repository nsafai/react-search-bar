import React from 'react';
import './SearchBar.css';

interface PublicProps {
  // TODO: Ensure/enforce proper hex colors as type
  backgroundColor?: string;
  textColor?: string;
  padding?: number;
}

const SearchBar: React.FC<PublicProps> = (props: PublicProps) => {
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
