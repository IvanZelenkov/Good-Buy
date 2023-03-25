import "../App.css";
import React from "react";
import MenuIcon from "../components/main/MenuIcon"
import SignInIcon from "../components/main/SignInIcon";

function Home() {
    return (
        <div className="home-page screen">
            <MenuIcon />
            <div className="content">
              <div className="title">
                <h1 className="goodbuy valign-text-middle">GOODBUY</h1>
              </div>
              <div className="search-bar">
                <img className="icon-search" src={require("../images/search-icon.svg")} alt="icon-search" />
                <input className="default-text" name="defaulttext" placeholder="Search" type="text" />
              </div>
            </div>
            <SignInIcon />
        </div>
    );
}
export default  Home