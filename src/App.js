import React from "react";
import "./App.css";
import Firebase from "./components/FB";
import firebase from "firebase";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Signout from "./components/Signout";
import NavBar from "./components/AppBar";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };

    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <NavBar />
          <header className="App-header">
            <Route exact path="/" component={Firebase} />
            <Route path="/signout" component={Signout} />
            <Route path="/dashboard" component={Dashboard} />
          </header>
        </Router>
      </div>
    );
  }
}

export default App;
