import React, { useEffect } from "react";
import { useState } from "react";
import temperature from "../Assets/Temperature.png";
import cloud from "../Assets/Cloud.png";
import "../Styling/StandBy.css";
import SubSection from "./SubSection";
const api = {
  key: "729fb5875d9581eef587134c8b5e6463",
  base: "https://api.openweathermap.org/data/2.5/",
};

function StandByRight() {
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
    <div className="standby-cell right">
      {typeof weather.main !== "undefined" ? (
        <div className="white">
          {/* Location  */}
          <h1>{weather.name}</h1>

          {/* Temperature Celsius  */}
          <div className="row">
            <div className="row">
              <img className="weather-icon" src={temperature} />
              <h2>{weather.main.temp}°F</h2>
            </div>
            <div className="row">
              <img className="weather-icon" src={cloud} />
              <h2>{weather.weather[0].main}</h2>
            </div>
          </div>
          <div className="divider" />
          {/* Condition (Sunny ) */}
          <p>Looks Like {weather.weather[0].description}</p>
          <SubSection
            title={"EVENTS & HOLIDAYS"}
            elements={[
              "Christmas Eve",
              "Christmas Day",
              "New Years Eve",
              "New Years Day",
              "Valentines Day",
              "St Patrick's Day",
              "Good Friday",
              "Easter Day",
              "Easter Monday",
              "Mother's Day",
              "Father's Day",
              "Independence Day",
            ]}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default StandByRight;
