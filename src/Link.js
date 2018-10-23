import React from "react";

const Link = ({ text, onRouteChange, route }) => {
  return (
    <div>
      <a
        href="./#"
        onClick={e => {
          e.preventDefault();
          onRouteChange(route);
        }}
        className="f3 ma2 link dim ba br3 ph2 pv1 mb2 dib dark-green o-0 grow"
      >
        {text}
      </a>
    </div>
  );
};

export default Link;
