import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MaterialTable from "material-table";
import Axios from "axios";

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
    color: theme.palette.text.secondary,
    minHeight: 50
  },
  imagePaper: {
    padding: theme.spacing(3, 2),
    width: 350,
    textAlign: "center"
  }
}));

export default function Shows(props) {
  var classes = useStyles();

  useEffect(() => {
      console.log(props.loggedIn)
    Axios.get("http://localhost:8080/shows").then(response => {
      console.log(response.data);
    });
  }, []);

  if (!props.loggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Paper className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xl={12} sm={12} md={12} lg={12} xs={12}>
            <h1>Enter a Show</h1>
          </Grid>
          <Grid item xl={12} sm={12} md={12} lg={12} xs={12} />
        </Grid>
      </Paper>
    </div>
  );
}
