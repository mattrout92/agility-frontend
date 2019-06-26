import React from "react";
import { Redirect } from "react-router-dom";
import firebase from "firebase";

class Signout extends React.Component {
  render() {
    firebase.auth().signOut();
    return (
        <Redirect to="/" />
    );
  }
}

export default Signout;
