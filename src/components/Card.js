import React, { useState, useEffect } from 'react';
import 'react-lazy-load-image-component/src/effects/blur.css';
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
import 'bootstrap-icons/font/bootstrap-icons.css';

function useInterval(callback) {
  const [value, setValue] = useState(callback()); 

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(callback());
    }, 1000);

    return () => clearInterval(interval);
  }, [callback]);

  return value; 
}

function Card(props) {
  const temperature = Number(props.temp) - 273.15;
  const currentTime = useInterval(() => new Date(), 1000);
  const date = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  const changeImg = () => {
    if (temperature > 30 && props.main === "Clouds") {
      return <img src={clear_clouds} alt="" />;
    }
    else if (temperature < 30 && props.main === "Clouds")
      return <img src={clouds} alt="" />;
    else if (props.main === "Rain" && props.description === "light rain")
      return <img src={drizzle} alt="" />;
    else if (props.main === "Rain" && (props.description === "moderate rain" || props.description === "heavy intensity rain"))
      return <img src={rain} alt="" />;
    else if (props.main === "Rain")
      return <img src={rain} alt="" />;
    else if (props.main === "Haze")
      return <img src={haze} alt="" />;
    else if (props.main === "Smoke")
      return <img src={smoke} alt="" />;
    else
      return <img src={weather} alt="" />;
  };

  useEffect(() => {
    const tem = document.querySelector(".container")
    const body = document.querySelector("body");

    if (tem) {
      if (temperature >= 40) {
        tem.style.color = "red"
      }
      else if (30 <= temperature && temperature < 40) {
        tem.style.color = "orange"
      }
      else if (20 <= temperature && temperature < 30) {
        tem.style.color = 'blue'
      }
      else if (10 <= temperature && temperature < 20) {
        tem.style.color = "#00ffef"
      }
      else if (0 <= temperature && temperature < 10) {
        tem.style.color = "#161616"
      }
      else {
        tem.style.color = "black"
      }
    }
    const setBackgroundImage = (imageSrc) => {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        body.style.backgroundImage = `url(${imageSrc})`;
      };
    };

    const loadBackgroundImage = () => {
      switch (props.main.toLowerCase()) {
        case 'clear':
          setBackgroundImage(bgclear);
          break;
        case "clouds":
          setBackgroundImage(bgclouds);
          break;
        case "rain":
          setBackgroundImage(bgrain);
          break;
        case "haze":
          setBackgroundImage(bgMHF);
          break;
        case "mist":
          setBackgroundImage(bgMHF);
          break;
        case "fog":
          setBackgroundImage(bgMHF);
          break;
        case "snow":
          setBackgroundImage(bgsnow);
          break;
        case "thunderstorm":
          setBackgroundImage(bgthunderstorm);
          break;
        case "drizzle":
          setBackgroundImage(bgdrizzle);
          break;
        default:
          setBackgroundImage(bgdefault);
          break;
      }
    };

    loadBackgroundImage();

    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundPosition = "center";
    body.style.backgroundSize = "cover";
  }, [props.main, temperature]);

  return (
    <div>
      {/* <LazyLoadComponent> */}
      <div className="container">
        <div className="temperature">
          {changeImg()}
          <h3>{temperature.toFixed(2)}°C</h3>
        </div>
        {props.location && (
          <h5>{props.location}</h5>
        )}
        <div className="date-time">
          <div className="date">{formattedDate} </div>
          <div className="time" id="time">{currentTime.toLocaleTimeString()}</div>
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
          <div className="line">
          </div>
        </div>

        <div className="weather">
          {`${props.main}`}
        </div>
      </div>
      {/* </LazyLoadComponent> */}
    </div>
  );
}

export default Card;
