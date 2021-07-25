import React, {useState, useEffect} from 'react';
import axios from 'axios';
import dateFormat from 'dateformat';

import './style.css';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from "@material-ui/icons/Close";

export default function App() {
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [show, setShow] = useState("");
  const [showTitle, setShowTitle] = useState("");

  // update the search value onChange
  const updateValue = (event) => {
    const searchWord = event.target.value;
    setSearchValue(searchWord);
  }

  // clear search query when x is clicked
  const clearInput = () => {
    setFilteredData([]);
    setSearchValue("");
  }

  // retrieve the selected show and update the show state to display
  // the title and show description
  const updateShow = (event) => {
    const showSelect = event.target.accessKey;
    const newShow = filteredData.filter((value) => {

      if (value.show.id.toString() === showSelect) {
        return value.show
      }
    });

    // remove the html tags from the tvmaze string
    const removeTags = (sum) => {
      if ((sum === null) || (sum === ''))
      return false;
      else
      return sum.replace( /(<([^>]+)>)/ig, '');
    }
    const summary = removeTags(newShow[0].show.summary);
    const title = newShow[0].show.name;

    setShowTitle(title);
    setShow(summary);
    setFilteredData([]);
  }

  useEffect(() => {

    // call the api and filter through the results
    const performSearch = () => {

      // makes a call to the tvmaze api
      axios.get('https://api.tvmaze.com/search/shows?q=' + searchValue)
      .then(response => {
        const show = response.data;

        // filter through and return show names in the response that match the current input value
        const newFilter = show.filter((value) => {
          return value.show.name.toLowerCase().includes(searchValue.toLowerCase());
        });
        
        // set our filtered data if the string is not empty
        if (searchValue === "") {
          setFilteredData([]);
        } else {
          setFilteredData(newFilter);
        }

      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      })
    };

    performSearch()
  }, [searchValue]);


  return (
    <div className="App">
      <h4 className="search-bar__title">Search TV Show</h4>
      <div className="search-bar">
        <div className="search-bar__input">
          <input 
            type="text" 
            placeholder="Please enter TV show title"
            value={searchValue}
            onChange={updateValue} />
          <div className="search-bar__icon">
            {searchValue.length === 0 ? 
              <SearchIcon /> 
              : 
              <CloseIcon id="clearButton" onClick={clearInput}/>
            }
          </div>
        </div>
        {filteredData.length !== 0 && (
          <div className="search-bar__data">
            {filteredData.map((value) => {
              return (
                <li className="search-bar__button" key={value.show.id} accessKey={value.show.id}>
                  <button
                    onClick={updateShow}
                    accessKey={value.show.id}
                  >
                    <div className="search-bar__button--description" accessKey={value.show.id}>
                      <p accessKey={value.show.id}>{value.show.name}</p>
                      <p id="date" accessKey={value.show.id}>
                        premiered on {dateFormat(value.show.premiered, "mmmm dd, yyyy")}
                      </p>
                      <p accessKey={value.show.id}>Rating: {value.show.rating.average}</p>
                    </div>
                  </button>
                </li>
              )
            })}
          </div>
        )}
      </div>
      {show !== "" ?
        <div className="clear-button">
          <button
            onClick={() => setShow("")}
          >Clear</button>
        </div>
        :
        <div></div>
      }
      {show !== "" ? 
        <div>
          <div className="show-description">
                <h3 className="show-description__title">
                  {showTitle}
                </h3>
                <p>
                  {show}
                </p>
            </div>
            <div className="season-selector">
              <h4>Seasons</h4>
              <select className="season-selector__select">
                  <option>Select Season</option>
                  <option>Season 1</option>
                  <option>Season 2</option>
                  <option>Season 3</option>
              </select>
          </div>      
          <div className="timeline"></div>
        </div>
        :
        <div id="emptyDiv"></div> 
      }
      <div className="footer">
          <h1 id="contact">Contact us</h1>
          <div className="footer__column-container">
            <div className="footer__column">
              <div className="footer__column-title">
                <p className="footer__column-main">Address</p>
                <p className="footer__column-secondary">| Mailing</p>
              </div>
              <div>
                <p className="footer__column-third">Primary Address Line</p>
                <p className="footer__column-fourth">Secondary Address Line</p>
                <p className="footer__column-fourth">12345 Postal Code</p>
              </div>
            </div>
            <div className="footer__column">
              <div className="footer__column-title">
                <p className="footer__column-main">Address</p>
                <p className="footer__column-secondary">| Mailing</p>
              </div>
              <div>
                <p className="footer__column-third">Headline</p>
                <p className="footer__column-fourth">+1 123 456 789</p>
              </div>
            </div>
            <div className="footer__column">
              <div className="footer__column-title">
                <p className="footer__column-main">Address</p>
                <p className="footer__column-secondary">| Mailing</p>
              </div>
              <div>
              <p className="footer__column-third">email@email.com</p>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}