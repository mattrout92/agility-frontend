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
  const [isAdmin, setIsAdmin] = useState(false);
  const [userID, setUserID] = useState(0);
  const [logout, setLogout] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setLoggedIn(true);
        setLogout(false);
        setName(user.displayName);
        Axios.post("http://localhost:8080/login", {
          name: user.displayName,
          email: user.email
        }).then(response => {
          setIsAdmin(response.isAdmin);
          setUserID(response.id);
        });
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
  };

  const classes = useStyles();

  if (logout) {
    return <Redirect to="/signout" />;
  }

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
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
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
    </div>
  );
}

export default NavBar;
