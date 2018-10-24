import React from "react";
import "tachyons";
import Percentage from "./Percentage";
import Legal from "./Legal";
import Link from "./Link";
import Menu from "./Menu";

const Content = ({ route, onRouteChange }) => {
  const getContent = () => {
    if (route === "home") {
      return "Graph";
    } else if (route === "percentage") {
      return <Percentage />;
    } else if (route === "graph") {
      return "Graph";
    } else if (route === "legal") {
      return <Legal />;
    } else if (route === "menu") {
      return <Menu onRouteChange={onRouteChange} />;
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
        <h2 className="f3 pb0">{route.toUpperCase()}</h2>
      </div>
      <div>{getContent()}</div>
    </div>
  );
};

export default Content;
