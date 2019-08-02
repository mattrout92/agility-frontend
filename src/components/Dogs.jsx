import React, { useState, useEffect } from "react";
import firebase from "firebase";
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

function Dogs(props) {
  const [loading, setLoading] = useState(true);

  const [state, setState] = useState({
    columns: [
      { title: "Dog's Name", field: "name" },
      {
        title: "Dog's Height",
        field: "height",
        lookup: {
          Small: "Small",
          Medium: "Medium",
          Standard: "Standard",
          Large: "Large"
        }
      },
      {
        title: "Dog's Grade",
        field: "grade",
        type: "numeric",
        lookup: { 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: 7 }
      },
      { title: "Usual Handler", field: "handler" }
    ],
    data: []
  });

  var classes = useStyles();

  useEffect(() => {
    if (loading) {
      Axios.get("http://localhost:8080/dogs?user_id=" + props.userID).then(
        response => {
          let data = response.data;
          if (data != null) {
            setState({ ...state, data });
          }
        }
      );
    }
    setLoading(false);
  }, [state]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (props.loggedIn) {
    return (
      <div>
        <Paper className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xl={12} sm={12} md={12} lg={12} xs={12}>
              <h1>Your Dogs</h1>
            </Grid>
            <Grid item xl={12} sm={12} md={12} lg={12} xs={12}>
              <MaterialTable
                title="Dog's Details"
                columns={state.columns}
                data={state.data}
                options={{
                  search: false
                }}
                localization={{
                  body: {
                    emptyDataSourceMessage: "Click (+) Symbol to Add a Dog",
                    editRow: {
                      deleteText: "Are you sure you want to delete this dog?"
                    }
                  }
                }}
                editable={{
                  onRowAdd: newData =>
                    new Promise(resolve => {
                      setTimeout(() => {
                        resolve();
                        const data = [...state.data];
                        newData.user_id = props.userID;
                        Axios.post("http://localhost:8080/dogs", newData).then(
                          response => {
                            newData.id = response.data.id;
                            data.push(newData);
                            setState({ ...state, data });
                            newData.user_id = props.userID;
                          }
                        );
                      }, 600);
                    }),
                  onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                      setTimeout(() => {
                        resolve();
                        const data = [...state.data];
                        Axios.put("http://localhost:8080/dogs", newData).then(
                          response => {
                            data[data.indexOf(oldData)] = newData;
                            setState({ ...state, data });
                          }
                        );
                      }, 600);
                    }),
                  onRowDelete: oldData =>
                    new Promise(resolve => {
                      setTimeout(() => {
                        resolve();
                        const data = [...state.data];
                        Axios.delete(
                          "http://localhost:8080/dogs?id=" + oldData.id
                        ).then(response => {});

                        data.splice(data.indexOf(oldData), 1);
                        setState({ ...state, data });
                      }, 600);
                    })
                }}
              />
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
}

export default Dogs;
