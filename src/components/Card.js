import React, { useState, useEffect } from 'react';
// import 'react-lazy-load-image-component/src/effects/blur.css';
import './Card.css';
import clouds from './images/clouds.png';
import clear_clouds from './images/clear-clouds.png';
import drizzle from './images/drizzle.png';
import haze from "./images/Haze.png";
import smoke from "./images/smoke.png";
import rain from "./images/rain.png";
import weather from "./images/weather.png";
import bgclear from "./images/bg-clear.jpg";
import bgclouds from "./images/bg-clouds.jpg";
import bgdrizzle from "./images/bg-drizzle.jpg";
import bgMHF from "./images/bg-mist,haze,fog.jpg";
import bgrain from "./images/bg-rain.png";
import bgsnow from "./images/bg-snow.jpg";
import bgthunderstorm from "./images/bg-thunderstorm.jpg";
import bgdefault from "./images/bg-default.jpg";

function useInterval(callback) {
  const [value, setValue] = useState(callback()); 

  useEffect(() => {
    const interval = setInterval(() => setValue(callback()), 1000);
    return () => clearInterval(interval);
  }, [callback]);

  return value; 
}

function Card(props) {
  const temperature = Number(props.temp) - 273.15;
  const currentTime = useInterval(() => new Date(), 1000);
  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const [loading, setLoading] = useState(true);

  const changeImg = () => {
    if (temperature > 30 && props.main === "Clouds") {
      return <img src={clear_clouds} alt="" effect="blur"/>;
    } else if (temperature < 30 && props.main === "Clouds") {
      return <img src={clouds} alt="" effect="blur" />;
    } else if (props.main === "Rain" && props.description === "light rain") {
      return <img src={drizzle} alt="" effect="blur" />;
    } else if (props.main === "Rain" && (props.description === "moderate rain" || props.description === "heavy intensity rain")) {
      return <img src={rain} alt="" effect="blur" />;
    } else if (props.main === "Rain") {
      return <img src={rain} alt="" effect="blur" />;
    } else if (props.main === "Haze") {
      return <img src={haze} alt="" effect="blur" />;
    } else if (props.main === "Smoke") {
      return <img src={smoke} alt="" effect="blur" />;
    } else {
      return <img src={weather} alt="" effect="blur" />;
    }
  };

  useEffect(() => {

    const preloadImage = (imageSrc) => {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        document.body.style.backgroundImage = `url(${imageSrc})`; // Set page background
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundSize = "cover";
        setLoading(false); // Set loading to false after background loads
      };
    };

    const loadBackgroundImage = () => {
      setLoading(true);
      switch (props.main.toLowerCase()) {
        case 'clear':
          preloadImage(bgclear);
          break;
        case "clouds":
          preloadImage(bgclouds);
          break;
        case "rain":
          preloadImage(bgrain);
          break;
        case "haze":
        case "mist":
        case "fog":
          preloadImage(bgMHF);
          break;
        case "snow":
          preloadImage(bgsnow);
          break;
        case "thunderstorm":
          preloadImage(bgthunderstorm);
          break;
        case "drizzle":
          preloadImage(bgdrizzle);
          break;
        default:
          preloadImage(bgdefault);
          break;
      }
    };

    loadBackgroundImage();

  }, [props.main]);

  return (
    <div>
      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <div
          className="container"
        >
          <div className="temperature">
            {changeImg()}
            <h3>{temperature.toFixed(2)}°C</h3>
          </div>
          {props.location && <h5>{props.location}</h5>}
          <div className="date-time">
            <div className="date">{formattedDate}</div>
            <div className="time" id="time">
              {currentTime.toLocaleTimeString()}
            </div>
          </div>
          <div className="small-card">
            <div className="wind-speed">
              <h6>Wind Speed</h6>
              <p>{props.wind_speed}</p>
            </div>
            <div className="humidity">
              <h6>Humidity</h6>
              <p>{props.humidity}</p>
            </div>
          </div>
          <div className="outer-line">
            <div className="line"></div>
          </div>
          <div className="weather">{`${props.main}`}</div>
        </div>
      )}
    </div>
  );
}

export default Card;
