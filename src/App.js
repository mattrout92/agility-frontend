import React, { useState, useEffect } from "react";
import Firebase from "./components/FB";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Signout from "./components/Signout";
import NavBar from "./components/AppBar";
import Dogs from "./components/Dogs";
import Shows from "./components/Shows";
import Grid from "@material-ui/core/Grid";
import "./App.css";
import Axios from "axios";
import firebase from "firebase";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userID, setUserID] = useState(0);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        Axios.post("http://localhost:8080/login", {
          name: user.displayName,
          email: user.email
        }).then(response => {
          setLoggedIn(true);
          setUserID(response.data.id);
        });
      }
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Grid container spacing={0} alignItems="center" justify="center">
          <Switch>
            <Route exact path="/" component={Firebase} />
            <Route path="/signout" component={Signout} />
            <Route
              path="/dashboard"
              component={() => <Dashboard loggedIn={loggedIn} />}
            />
            <Route
              path="/dogs"
              component={() => <Dogs loggedIn={loggedIn} userID={userID} />}
            />
            <Route
              path="/shows"
              component={() => <Shows loggedIn={loggedIn} />}
            />
          </Switch>
        </Grid>
      </Router>
    </div>
  );
}
