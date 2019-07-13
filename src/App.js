import React from "react";
import Firebase from "./components/FB";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Signout from "./components/Signout";
import NavBar from "./components/AppBar";
import Dogs from "./components/Dogs";
import Grid from "@material-ui/core/Grid";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      isAdmin: false,
      userID: 0
    };
  }

  render() {
    return (
      <div className="App">
        <Router>
          <NavBar />
          <Grid container spacing={0} alignItems="center" justify="center">
            <Switch>
              <Route exact path="/" component={Firebase} />
              <Route path="/signout" component={Signout} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/dogs" component={Dogs} />
            </Switch>
          </Grid>
        </Router>
      </div>
    );
  }
}

export default App;
