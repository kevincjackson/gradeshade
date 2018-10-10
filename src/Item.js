import React from "react";
import Grade from "./grade";

const Item = ({ name, max, points }) => {
  const grade = new Grade(points, max);

  return (
    <div className="item">
      <span>{name}</span> <span>{points}</span> <span>{max}</span>
      <div>
        <span>{grade.percentage}</span> <span>{grade.letter}</span>{" "}
        <span>{grade.grade}</span>
      </div>
    </div>
  );
};

export default Item;
