import React from "react";
import "./Header.scss";
import PersonIcon from "@material-ui/icons/Person";
import ForumIcon from "@material-ui/icons/Forum";
import { IconButton, Avatar } from "@material-ui/core/";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link, useHistory } from "react-router-dom";
import getInitials from "../helpers/getInitials";

export default function Header({ backButton, user }) {
  const history = useHistory();

  return (
    <nav className="header">
      {backButton ? (
        <IconButton disableRipple={true} onClick={() => history.goBack()}>
          <ArrowBackIosIcon fontSize="large" className="header__icon" />
        </IconButton>
      ) : (
        <>
          {user ? (
            <Link to={`/user/${user.uid}`}>
              <IconButton disableRipple={true}>
                <Avatar
                  src={user.photoURL}
                  className="header__icon"
                  style={{
                    padding: "0",
                    margin: "0",
                    height: "35px",
                    width: "35px",
                  }}
                >
                  {getInitials(user.displayName)}
                </Avatar>
              </IconButton>
            </Link>
          ) : (
            <Link to={`/`}>
              <IconButton disableRipple={true}>
                <PersonIcon fontSize="large" className="header__icon" />
              </IconButton>
            </Link>
          )}
        </>
      )}
      <Link to="/">
        <img
          className="header__logo"
          src="https://i.ibb.co/9211QYK/Mask-Group-3.png"
          alt="logo"
        ></img>
      </Link>
      <Link to="/chat">
        <IconButton disableRipple={true}>
          <ForumIcon fontSize="large" className="header__icon" />
        </IconButton>
      </Link>
    </nav>
  );
}
