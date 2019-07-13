import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import firebase from "firebase";
import digby from "../digby.jpg";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  },
  root: {
    marginTop: 50,
    padding: theme.spacing(3, 2),
    width: 800
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    minHeight: 50
  },
  imagePaper: {
    padding: theme.spacing(3, 2),
    width: 350,
    textAlign: "center"
  },
  button: {
    margin: theme.spacing(1)
  }
}));

function Dashboard() {
  var classes = useStyles();

  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setLoggedIn(true);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  } else {
    if (loggedIn) {
      return (
        <div className={classes.root}>
          <Paper className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <h1>Welcome to the Agility homepage</h1>
              </Grid>
              <Grid item xs={3} />
              <Grid item xs={3}>
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.button}
                >
                  Add a dog
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.button}
                >
                  View Shows
                </Button>
              </Grid>
              <Grid item xs={3} />
              <Grid item xs={3} />
              <Grid item xs={4}>
                <Paper className={classes.imagePaper}>
                  <img src={digby} width="300" />
                </Paper>
              </Grid>
              <Grid item xs={4} />
            </Grid>
          </Paper>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}
export default Dashboard;
