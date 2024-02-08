import React from "react";
import "../Styling/StandBy.css";
import StandByLeft from "./StandByLeft";
import StandByCenter from "./StandByCenter";
import StandByRight from "./StandByRight";

function StandBy() {
  return (
    <div className="standby-main">
      <StandByLeft />
      <StandByCenter />
      <StandByRight />
    </div>
  );
}

export default StandBy;
