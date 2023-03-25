import React from "react";
import "./SignInIcon.css";

function SignInIcon() {
  return (
    <div className="sign-in-icon">
      <div className="icon">
        <div className="overlap-group">
          <div className="ellipse-1"></div>
          <div className="ellipse-2"></div>
          <img className="polygon-1" src={require("../../../images/polygon-1.svg")} alt="Polygon 1" />
        </div>
      </div>
      <div className="sign-in">Sign In</div>
    </div>
  );
}

export default SignInIcon;
