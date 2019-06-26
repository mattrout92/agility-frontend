import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import firebase from "firebase";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Redirect } from "react-router-dom";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };

    this.componentWillMount = this.componentWillMount.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          loggedIn: true,
          logout: false,
          anchorEl: null
        });
      }
    });
  }

  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose(event) {
    this.setState({ anchorEl: null });

    if (event === "logout") {
      this.setState({ logout: true });
    }
  }

  render() {
    const classes = makeStyles(theme => ({
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

    if (this.state.logout) {
      return ( <Redirect to="/signout" />)
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
              onClick={this.handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}
            >
              {this.state.loggedIn ? (
                <div>
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                  <MenuItem onClick={() => this.handleClose("logout")}>
                    Logout
                  </MenuItem>
                </div>
              ) : (
                <MenuItem onClick={this.handleClose}>Login</MenuItem>
              )}
            </Menu>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default NavBar;
