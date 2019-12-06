import React from 'react';
import { SearchBar, Page } from './SearchBar';
import './App.css';

const App: React.FC = () => {
  const pages: Page[] = [
    {name: "Home", url: "/"}, 
    {name: "About", url: "/about"},
    {name: "Google", url: "http://www.google.com"}, 
    {name: "Reddit", url: "http://www.reddit.com"},
  ];

  return (
    <div className="App">
      <SearchBar pages={pages} />
    </div>
  );
}

export default App;
