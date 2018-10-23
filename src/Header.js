import React from "react";
import "tachyons";
import Link from "./Link";
import { TiUser } from "react-icons/ti";

const Header = ({ onRouteChange }) => {
  return (
    <div className="flex justify-between">
      <Link text="GS" onRouteChange={onRouteChange} route="home" />
      <div>
        <a
          href="./#"
          onClick={e => {
            e.preventDefault();
            onRouteChange("user");
          }}
          className="f3 ma2 link dim ba br3 ph2 pv1 mb2 dib dark-green o-0 grow"
        >
          <TiUser className="v-btm" />
          User
        </a>
      </div>
    </div>
  );
};

export default Header;
