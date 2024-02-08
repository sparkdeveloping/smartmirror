import React, { useEffect, useState } from "react";
import temperature from "../Assets/Temperature.png";
import cloud from "../Assets/Cloud.png";
import "react-big-calendar/lib/css/react-big-calendar.css";

const DateAndTime = ({ data }) => {
  const [time, setTime] = useState(new Date());

  const hours = time.getHours();
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  useEffect(() => {
    console.log("time data", data);
  }, []);

  const intervalId = setInterval(() => {
    setTime(new Date());
  }, 1000); // Update every second

  return (
    <>
      {data.top !== null ? (
        <div
          className="date-time white shadow"
          style={{
            position: "absolute",
            top: data.top,
            left: data.left,
          }}
        >
          <div className="time-main">
            <div className="time">
              {hours}:{minutes}
            </div>
            <div className="seconds">{seconds}</div>
          </div>
          <div className="text date">{formattedDate}</div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export const DateAndTimeModule = DateAndTime;

const api = {
  key: "729fb5875d9581eef587134c8b5e6463",
  base: "https://api.openweathermap.org/data/2.5/",
};

function Weather({ data }) {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=Wichita&units=imperial&APPID=729fb5875d9581eef587134c8b5e6463"
    )
      .then((res) => res.json())
      .then((result) => {
        console.log("weather is ", result);
        setWeather(result);
      });
  }, []);

  return (
    <div className="weather">
      {typeof weather.main !== "undefined" ? (
        <div
          className="weather white shadow"
          style={{
            position: "absolute",
            top: data.top,
            left: data.left,
          }}
        >
          {data.onlyElements ? (
            <></>
          ) : (
            <div className="city"> {weather.name}</div>
          )}
          {/* Temperature Celsius  */}
          <div className="row">
            <div className="row">
              <img className="weather-icon" src={temperature} />
              <div className="we-text">{weather.main.temp}°F</div>
            </div>
            <div className="row">
              <img className="weather-icon" src={cloud} />
              <div className="we-text">{weather.weather[0].main}</div>
            </div>
          </div>
          {data.onlyElements ? <></> : <div className="divider" />}
          {/* Condition (Sunny ) */}
          {data.onlyElements ? (
            <></>
          ) : (
            <div class="w-description">
              Looks Like {weather.weather[0].description}
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export const WeatherModule = Weather;
const textArray = [
  "You seem to be in a great mood today!",
  "I love your enthusiasm for [insert topic].",
  "You're incredibly talented/smart/funny/helpful.",
  "Your [personality trait] really shines through.",
  "You always manage to make me laugh.",
  "I admire your [skill/quality].",
  "You inspire me to [positive action].",
  "Thank you for being your incredible self.",
  "Your smile can light up a room.",
  "I love your infectious laugh.",
  "You have the kindest heart I know.",
  "You're always so thoughtful and considerate.",
  "You're brilliant and your ideas are always innovative.",
  "You have such a unique and refreshing perspective.",
  "Your determination and resilience are truly inspiring.",
  "You're a fantastic listener and make everyone feel heard.",
  "You have a knack for making even the mundane seem fun.",
  "You're so good at what you do, it's truly impressive.",
  "You're incredibly brave and courageous, facing challenges head-on.",
  "Your creativity knows no bounds, it amazes me.",
];

function FadingTextComponent() {
  const [currentText, setCurrentText] = useState(textArray[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % textArray.length);
      setCurrentText(textArray[index]);
    }, 70000); // Change every 7 seconds

    return () => clearInterval(intervalId); // Clear interval on cleanup
  }, []);

  return (
    <div
      className={`fading-text white shadow ${
        currentText === textArray[index] ? "show" : ""
      }`}
    >
      {currentText}
    </div>
  );
}

export const ComplimentModule = FadingTextComponent;
