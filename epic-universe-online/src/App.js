import logo from './logo.svg';
import './App.css';
import React, { useState,  useEffect } from 'react';
import initialState from 'react'
import axios from 'axios';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Footer } from "./Footer";

// const url = "http://localhost:9090" 
const url = "https://epic-universe-online-server.vercel.app"


function App() {
  

const [feed, setFeed] = useState([]);

 useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.visibility = 'visible';
          entry.target.style.animation = 'slideIn 1s ease-out';
        } else {
          entry.target.style.visibility = 'hidden';
          entry.target.style.animation = 'none';
        }
      });
    });

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      observer.observe(card);
    });

    // Clean up function
    return () => {
      cards.forEach(card => {
        observer.unobserve(card);
      });
    };
  }, [feed]);

  useEffect(() => {



    const getFeed = async () => {

      try {
        const res = await axios.get(url + "/api/nasa-rss");
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
            {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
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
        <SpeedInsights />
        <Analytics />
      </header>
      <Footer />
    </div>
  );
}

export default App;
