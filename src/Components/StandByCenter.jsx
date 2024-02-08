import React from "react";
import logo from "../Assets/Logo.png";
function StandByCenter() {
  return (
    <div className="standby-cell center">
      <div>
        <img className="logo" src={logo} />
      </div>

      <div className="white">YOU LOOK NICE</div>
      <div className="white">FUN FACT</div>
      <div className="white">Australia is wider than the moon</div>
    </div>
  );
}

export default StandByCenter;
