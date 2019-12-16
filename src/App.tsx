import React from 'react';
import { AutocompleteBar, Option } from './AutocompleteBar';
import { listOfCountries } from './Countries';
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
      {/* <AutocompleteBar values={pages} /> */}
      <AutocompleteBar values={listOfCountries} placeholderText={"Enter country name"} />
    </div>
  );
}

export default App;
