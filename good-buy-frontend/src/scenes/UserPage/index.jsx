import React from "react";
import MenuIcon from "../../components/main/MenuIcon";
import SignInIcon from "../../components/main/SignInIcon";
import "./UserPage.css";

function UserPage(props) {
  const { title, profilePic, place, label1, label2, sectionTitle } = props;

  return (
    <div className="user-page screen">
      <header className="header">
        <MenuIcon />
        <h1 className="title">{title}</h1>
        <SignInIcon />
      </header>
      <div className="user-content">
        <div className="overlap-group1">
          <div className="options">
            <div className="user-label">
              <img className="profile-pic" src={profilePic} alt="Profile Pic" />
              <div className="place">{place}</div>
            </div>
            <div className="section-menu">
              <div className="button">
                <div className="label montserrat-bold-blue-dianne-20px">{label1}</div>
              </div>
              <div className="button">
                <div className="label montserrat-bold-blue-dianne-20px">{label2}</div>
              </div>
            </div>
          </div>
          <div className="sub-content">
            <div className="section-header">
              <div className="section-title">{sectionTitle}</div>
            </div>
            <div className="section-data"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
