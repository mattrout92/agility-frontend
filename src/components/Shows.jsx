import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MaterialTable from "material-table";
import Axios from "axios";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";

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

  const [shows, setShows] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8080/shows").then(response => {
      console.log(response.data);
      setShows(response.data);
    });
  }, []);

  const displayShows = shows.map(item => {
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            {item.date} - {item.location} (Judging starts: {item.judging_from})
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails />
      </ExpansionPanel>
    );
  });

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
          <Grid item xl={12} sm={12} md={12} lg={12} xs={12}>
            {shows.length > 0 && displayShows}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
