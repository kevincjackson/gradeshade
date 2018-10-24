import React from "react";

const Menu = ({ onRouteChange }) => {
  return (
    <div>
      <a
        href="./#"
        onClick={e => {
          e.preventDefault();
          onRouteChange("percentage");
        }}
      >
        What grade did I get on this assignment?
      </a>
    </div>
  );
};

export default Menu;
