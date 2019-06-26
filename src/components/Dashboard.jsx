import React from "react";
import firebase from "firebase";
import { Redirect } from "react-router-dom";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      loggedIn: false,
      loading: true
    };

    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ name: user.displayName, loggedIn: true });
      }
      this.setState({ loading: false });
    });
  }

  render() {
    var loggedIn = this.state.loggedIn;

    if (this.state.loading) {
      return <h2>Loading...</h2>;
    } else {
      if (loggedIn) {
        return (
          <div>
            <h1>Signed In</h1>
            <h2>Welcome {this.state.name}</h2>
          </div>
        );
      } else {
        return <Redirect to="/" />;
      }
    }
  }
}

export default Dashboard;
