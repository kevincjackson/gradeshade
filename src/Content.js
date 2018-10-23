import React from "react";
import "tachyons";
import Legal from "./Legal";
import Link from "./Link";

const Content = ({ route, onRouteChange }) => {
  const getContent = () => {
    if (route === "home") {
      return "Graph";
    } else if (route === "graph") {
      return "Graph";
    } else if (route === "legal") {
      return <Legal />;
    } else if (route === "menu") {
      return "Menu";
    } else if (route === "user") {
      return "user";
    } else {
      return "Error - Unknown Route";
    }
  };

  return (
    <div>
      <div className="cf" />
      <div className="flex justify-center items-center">
        <Link text="&#9776;" onRouteChange={onRouteChange} route="menu" />
        <h2 className="f2">{route.toUpperCase()}</h2>
      </div>
      <div>{getContent()}</div>
    </div>
  );
};

export default Content;
