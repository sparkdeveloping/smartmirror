import { useEffect, useState } from "react";
import StandBy from "./Components/StandBy";
import { db } from "./Utils/firebase";
import { onValue, ref, update } from "firebase/database";
import {
  ComplimentModule,
  DateAndTimeModule,
  WeatherModule,
} from "./Components/Modules";
import SubSection from "./Components/SubSection";
import Background from "./Assets/Background.jpg";
import Logo from "./Assets/Logo.png";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Big Meeting",
    allDay: true,
    start: new Date(2024, 1, 5),
    end: new Date(2024, 1, 6),
  },
  {
    title: "Vacation",
    start: new Date(2024, 5, 1),
    end: new Date(2024, 6, 1),
  },
  {
    title: "Conference",
    start: new Date(2021, 6, 20),
    end: new Date(2021, 6, 23),
  },
];

function App() {
  const [mirror, setMirror] = useState(undefined);
  const [mirrorData, setMirrorData] = useState(undefined);
  const { height, width } = useWindowDimensions();
  const [allEvents, setAllEvents] = useState(events);
  const [stand, setStand] = useState(true);
  const [fstand, setfStand] = useState(true);

  useEffect(() => {
    console.log("mirror 0", mirror);

    const mirrorRef = ref(db, "mirror");
    update(mirrorRef, {
      screenRatio: width / height,
    });

    console.log("mirror 1");
    onValue(mirrorRef, (snapshot) => {
      const mirrorData = snapshot.val().modules;
      setMirror(mirrorData);
      setMirrorData(snapshot.val());
      console.log("mirror 3", mirrorData, "-", mirror, mirror === undefined);
      console.log("mirror 3", snapshot.val().isStandBy);

      if (snapshot.val().isStandBy === false) {
        // alert("hey there");
        setfStand(false);
        setTimeout(() => {
          update(mirrorRef, {
            isStandBy: true,
          });
        }, 5000);
      } else {
        setfStand(true);
      }
    });
  }, []);

  return (
    <>
      {mirror !== undefined ? (
        <div>
          <div className="compliment">YOU LOOK NICE TODAY!</div>
          <div style={{ opacity: fstand ? "100%" : "0%" }}>
            <>
              <DateAndTimeModule data={mirror.time} />
              <WeatherModule data={mirror.weather} />
              {Object.keys(mirror.list).map((item) => (
                <SubSection
                  title={mirror.list[item].subheading}
                  elements={mirror.list[item].items.split(",")}
                  data={mirror.list[item]}
                />
              ))}
            </>
          </div>

          <div
            style={{
              opacity: fstand ? "0%" : "100%",
              transition: "0.7s",
            }}
          >
            <img className="background" src={Background}></img>
            <div className="bg">
              <div className="glass-bg gl">
                <Calendar
                  className="white"
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 500, margin: "50px" }}
                />
              </div>
              <div className="glass-bg gr" />

              <DateAndTimeModule data={{ top: "20%", left: "45%" }} />
              <ComplimentModule />
              <div className="divider dp shadow" />
              <WeatherModule
                data={{ top: "80%", left: "42.5%", onlyElements: true }}
              />
            </div>
          </div>

          <img
            className="logo2 shadow"
            style={{
              width: fstand ? "30rem" : "16rem",
              height: fstand ? "30rem" : "16rem",
              filter: fstand ? "blur(3px)" : "blur(0rem)",
              transform: `translate(
                ${fstand ? "-15rem" : "-8rem"},
                ${fstand ? "-15rem" : "-8rem"}
              )`,
              transition: "1s",
            }}
            src={Logo}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );

  return (
    <div>
      {/* <StandBy /> */}
      {mirror !== undefined ? (
        <>
          <DateAndTimeModule data={mirror.time} />
          <WeatherModule data={mirror.weather} />
          {Object.keys(mirror.list).map((item) => (
            <SubSection
              title={mirror.list[item].subheading}
              elements={mirror.list[item].items.split(",")}
              data={mirror.list[item]}
            />
          ))}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
export default App;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

// const defaultJSON = {
// {"time":{"top":"22%","left":"14%"},"weather":{"top":"22%","left":"74%"},"list":{"techs":{"subheading":"TECHS/MENTORS ON DUTY","items": "Ed,Ryan,Cassidy,Riley,Tinashe,Denzel,Cooper,Dev,Druv","top":"22%","left":"14%"},"news":{"subheading":"LATEST NEWS & EVENTS","items":"Full Reset Completed,New Robots in this week,New 3D Printing Machines","top": "42%","left": "74%"},"holidays":{"subheading":"PUBLIC HOLIDAYS","items":"Christmas Eve, Christmas Day,New Year's Eve, New Year's Day,Valentines,Good Friday,Easter Day,Easter Monday,Mother's Day,Father's DayIndependence Day","top": "62%","left":"74%"}}}
// };
