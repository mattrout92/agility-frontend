import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import firebase from "firebase";

function Signout() {
  useEffect(() => {
    firebase.auth().signOut();
  }, []);
  return <Redirect to="/" />;
}

export default Signout;
