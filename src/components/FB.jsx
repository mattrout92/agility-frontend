// Import FirebaseAuth and firebase.
import React from "react";
import { FirebaseAuth } from "react-firebaseui";
import firebase from "firebase";
import { Redirect } from "react-router-dom";

// Configure Firebase.
const config = {
  apiKey: "AIzaSyBAXu8S-RHG5rYvP_bAZ_00ZpqpisN9HvI",
  authDomain: "agility-664d8.firebaseapp.com",
  databaseURL: "https://agility-664d8.firebaseio.com",
  projectId: "agility-664d8",
  storageBucket: "agility-664d8.appspot.com",
  messagingSenderId: "42342086113",
  appId: "1:42342086113:web:40e63b0de694f908"
};
firebase.initializeApp(config);

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/dashboard",
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.FacebookAuthProvider.PROVIDER_ID, firebase.auth.EmailAuthProvider.PROVIDER_ID]
};

class Firebase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      loading: true
    };

    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      }
      this.setState({ loading: false });
    });
  }

  render() {
    var loggedIn = this.state.loggedIn;

    if (this.state.loading) {
      return <h2>Loading...</h2>;
    }
    if (loggedIn) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div>
        <h1>Phoenix Agility</h1>
        <p>Please sign-in:</p>
        <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    );
  }
}

export default Firebase;
