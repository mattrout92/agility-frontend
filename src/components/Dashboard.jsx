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
    [theme.breakpoints.up("xs")]: {
      width: 300
    },
    [theme.breakpoints.down("sm")]: {
      width: 500
    },
    [theme.breakpoints.up("md")]: {
      width: 800
    },
    [theme.breakpoints.up("lg")]: {
      width: 1200
    },
    [theme.breakpoints.up("xl")]: {
      width: 1600
    }
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    minHeight: 50
  },
  imagePaper: {
    padding: theme.spacing(3, 2),
    width: 350,
    textAlign: "center"
  }
}));

function Dashboard(props) {
  var classes = useStyles();

  const [loggedIn, setLoggedIn] = useState(false);
  const [dogClicked, setDogClicked] = useState(false);
  const [showsClicked, setShowsClicked] = useState(false);

  const dogClick = function() {
    setDogClicked(true);
  };

  if (dogClicked) {
    return <Redirect to="/dogs" />;
  }

  const showClick = function() {
    setShowsClicked(true);
  };

  if (showsClicked) {
    return <Redirect to="/shows" />;
  }

  if (props.loggedIn) {
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Paper className={classes.root}>
            <Grid item xs={12}>
              <h1>Welcome to the Agility homepage</h1>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xl={3} sm={3} md={3} lg={3} xs={3} />
              <Grid item xl={3} sm={3} md={3} lg={3} xs={3}>
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.button}
                  onClick={dogClick}
                >
                  Add a dog
                </Button>
              </Grid>
              <Grid item xl={3} sm={3} md={3} lg={3} xs={3}>
                <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.button}
                  onClick={showClick}
                >
                  View Shows
                </Button>
              </Grid>
              <Grid item xl={3} sm={3} md={3} lg={3} xs={3} />
            </Grid>
            <Grid container spacing={3}>
              <Grid item xl={4} sm={1} md={3} lg={4} xs={1} />
              <Grid item xl={4} sm={4} md={4} lg={4} xs={4}>
                <Paper className={classes.imagePaper}>
                  <img src={digby} width="300" alt="digby" />
                </Paper>
              </Grid>
              <Grid item xl={4} sm={4} md={3} lg={4} xs={4} />
            </Grid>
          </Paper>
        </Grid>
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
}
export default Dashboard;
