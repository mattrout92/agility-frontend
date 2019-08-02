import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import firebase from "firebase";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Redirect } from "react-router-dom";
import Axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

function NavBar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [logout, setLogout] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dogs, setDogs] = useState(false);
  const [shows, setShows] = useState(false);
  const [dashboard, setDashboard] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setLoggedIn(true);
        setLogout(false);
        setDashboard(false);
        setDogs(false);
        setName(user.displayName);
        Axios.post("http://localhost:8080/login", {
          name: user.displayName,
          email: user.email
        }).then(response => {});
      } else {
        setLogout(true);
      }
    });
  }, []);

  const handleClick = function(event) {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = function(event) {
    setAnchorEl(null);

    if (event === "logout") {
      setLogout(true);
    }

    if (event === "dogs") {
      setDogs(true);
    }

    if (event === "dashboard") {
      setDashboard(true);
    }

    if (event === "shows") {
      setShows(true);
    }
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {loggedIn ? (
              <div>
                <MenuItem onClick={() => handleClose("dashboard")}>
                  Dashboard
                </MenuItem>
                <MenuItem onClick={() => handleClose("dogs")}>
                  Your Dogs
                </MenuItem>
                <MenuItem onClick={() => handleClose("shows")}>
                  Enter a Show
                </MenuItem>
                <MenuItem onClick={() => handleClose("logout")}>
                  Logout
                </MenuItem>
              </div>
            ) : (
              <MenuItem onClick={handleClose}>Login</MenuItem>
            )}
          </Menu>
          {name}
        </Toolbar>
      </AppBar>
      {dogs && <Redirect to="/dogs" />}
      {dashboard && <Redirect to="/dashboard" />}
      {logout && <Redirect to="/signout" />}
      {shows && <Redirect to="/shows" />}
    </div>
  );
}

export default NavBar;
