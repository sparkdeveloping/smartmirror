import React from "react";

function SubSection({ title, elements, data }) {
  return (
    <div
      className="subsection white"
      style={{
        position: "absolute",
        top: data.top,
        left: data.left,
        width: "15%",
      }}
    >
      <div className="subheading white">{title}</div>
      <div className="divider" />
      {elements.map((element) => (
        <div className="text white">{element}</div>
      ))}
    </div>
  );
}

export default SubSection;
