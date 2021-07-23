import React, {useState} from 'react';
import './style.css';


export default function App() {
  return (
    <div className="App">
      <div className="search-bar">
          <h4>Search TV Show</h4>
          <input className="search-bar__input"/>
      </div>
      <div className="show-description">
          <h3>Show Title</h3>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et ex ut elit auctor 
          convallis. Pellentesque id mi tristique, ultricies sapien finibus, vulputate nisi. Nunc
          at mauris feugiat, dignissim mi efficitur, ultrices ipsum. Donec justo ligula, pulvinar
          mmodo interdum, mattis eu nisi. Curabitur congue leo diam, ac scelerisque nibh posuere id. 
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent velit justo, tristique et
          magna sed, dignissim commodo dolor. Aliquam sit amet finibus lorem.
          </p>
      </div>
      <div className="season-selector">
          <h4>Seasons</h4>
          <select>
              <option>Example 1</option>
              <option>Example 2</option>
              <option>Example 3</option>
          </select>
      </div>      
      <div className="timeline"></div>
      <div className="footer">
          <h1>Contact us</h1>
      </div>
    </div>
  );
}