import React, { useEffect, useState } from "react";
import SubSection from "./SubSection";

function StandByLeft() {
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

  const intervalId = setInterval(() => {
    setTime(new Date());
  }, 1000); // Update every second

  //   return () => clearInterval(intervalId); // Clear interval on unmount

  return (
    <div className="white standby-cell left">
      <div className="t" style={{ position: "absolute", top: "50%" }}>
        <SubSection
          title="LATEST NEWS"
          elements={["Successfully Reset", "New Robots", "New Printers Too!"]}
        />
      </div>
      <SubSection
        title="TECHS/MENTORS ON DUTY TODAY"
        elements={["Cassidy", "Ryan", "Tinashe", "Cooper"]}
      />
    </div>
  );
}

export default StandByLeft;
