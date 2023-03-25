import React from "react";
import MenuIcon from "../MenuIcon";
import "./Sidebar.css";

function Sidebar(props) {
  const { iconCart, myCart, favorites, deals } = props;

  return (
    <div className="sidebar">
      <div className="button-1">
        <MenuIcon />
      </div>
      <div className="button">
        <div className="cart-icon">
          <div className="overlap-group">
            <img className="icon-cart" src={iconCart} alt="icon-cart" />
            <img className="handle" src="../../../images/sidebar/handle.svg" alt="Handle" />
            <img className="wheel-track" src="../../../images/sidebar/wheel-track.svg" alt="Wheel Track" />
            <div className="rear-wheel"></div>
            <div className="front-wheel"></div>
          </div>
        </div>
        <div className="my-cart aladin-normal-alice-blue-20px">{myCart}</div>
      </div>
      <div className="button">
        <img className="icon-star" src="../../../images/sidebar/top-products.svg" alt="icon-star" />
        <div className="favorites aladin-normal-alice-blue-20px">{favorites}</div>
      </div>
      <div className="button">
        <div className="deal-tag">
          <div className="overlap-group-1">
            <div className="ellipse-7"></div>
          </div>
        </div>
        <div className="deals aladin-normal-alice-blue-20px">{deals}</div>
      </div>
    </div>
  );
}

export default Sidebar;
