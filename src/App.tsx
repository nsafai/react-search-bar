import React from 'react';
import { SearchBar, Option } from './SearchBar';
import './App.css';

const App: React.FC = () => {
  const pages: Option[] = [
    {label: "Home", value: "/"}, 
    {label: "About", value: "/about"},
    {label: "Adam's website", value: "/adam"},
    {label: "Google", value: "http://www.google.com"}, 
    {label: "Reddit", value: "http://www.reddit.com"},
  ];

  return (
    <div className="App">
      {/* <SearchBar values={pages.map(value => { return { label: value.label }})} /> */}
      <SearchBar values={pages} />
    </div>
  );
}

export default App;
