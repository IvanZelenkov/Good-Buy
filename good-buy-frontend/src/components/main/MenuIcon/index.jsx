import React from "react";
import "./MenuIcon.css";
import "../Sidebar"
import Sidebar from "../Sidebar";

function handleClick() {
    return <Sidebar iconCart="../../../images/sidebar/basket@2x.png" myCart="My Cart" favorites="Favorites" deals="Deals" />;
}
function MenuIcon(props) {
  return (
    <button className="menu-icon" onClick={handleClick}>
      <div className="rectangle"></div>
      <div className="rectangle"></div>
      <div className="rectangle"></div>
    </button>
  );
}

export default MenuIcon;
