import React from "react";
import "./Header.css";
import PersonIcon from "@material-ui/icons/Person";
import ForumIcon from "@material-ui/icons/Forum";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link, useHistory } from "react-router-dom";

export default function Header({ backButton }) {
  const history = useHistory()

  return (
    <nav className="header">
      {backButton ? (
          <IconButton onClick={() => history.replace(backButton)}>
            <ArrowBackIosIcon fontSize="large" className="header__icon" />
          </IconButton>
      ) : (
        <IconButton>
          <PersonIcon fontSize="large" className="header__icon" />
        </IconButton>
      )}
      <Link to="/">
        <img
          className="header__logo"
          src="https://www.logo.wine/a/logo/Tinder_(app)/Tinder_(app)-Flame-Logo.wine.svg"
          alt="logo"
        ></img>
      </Link>
      <Link to="/chat">
        <IconButton>
          <ForumIcon fontSize="large" className="header__icon" />
        </IconButton>
      </Link>
    </nav>
  );
}
