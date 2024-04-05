import logo from './logo.svg';
import './App.css';
import React, { useState,  useEffect } from 'react';
import initialState from 'react'
import axios from 'axios';

const url = "http://localhost" 
// const url = "https://epicuniverseonline.web.app"


function App() {
  
  
  const [feed, setFeed] = useState([]);
  useEffect(() => {



    const getFeed = async () => {

      try {
        const res = await axios.get(url + "/nasa-rss");
        console.log(res.data);
        setFeed(res.data);
      } catch (error) {
        console.error(error);
      }
  
    } 

    getFeed();

  }, [])
 

  const showFeed = () => {

    // Put the feed in a list of cards to show in the frontend:
    if (!feed) {
      return 'No feed available';
    }
    return feed.map((item, index) => {
      return (
        <div  className="card" key={index}>
          <div className="card-body">
            <h5 className="card-title">{item.title}</h5>
            <p className="card-text">{item.content}</p>
            <a href={item.link} className="card-link"></a>
          <img className="card-image" width={300} height={200} src={item.enclosure} alt="NASA_IMAGE" />
          <h6 className="card-subtitle mb-1 text-muted">{item.pubDate}</h6>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        {feed ? showFeed() : 'Loading...'}
      </header>
    </div>
  );
}

export default App;
