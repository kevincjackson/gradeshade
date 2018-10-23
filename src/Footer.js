import React from "react";
import "tachyons";

const Footer = ({ onRouteChange }) => {
  return (
    <div>
      <a
        className="f6 link dim ba br3 ph3 pv2 mb2 dib dark-green o-0 grow"
        href="./#"
        onClick={e => {
          e.preventDefault();
          onRouteChange("legal");
        }}
      >
        &#9829;
      </a>
    </div>
  );
};

export default Footer;
