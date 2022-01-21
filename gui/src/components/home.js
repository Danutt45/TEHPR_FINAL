import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { RETURN_USER } from "../redux/actionCreators";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import plus from "../icons/plus.png";
import plusWhite from "../icons/plusWhite.png";
import { CircularProgress } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      projects: [],
      loading: false,
      loaded: false,
    };
  }

  async fetchData(user_id) {
    this.setState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    try {
      const response = await fetch("http://localhost:8001/api/projects");
      const data = await response.json();

      const projects = new Array();
      data.forEach((element) => {
        let clone = JSON.parse(JSON.stringify(element));
        projects.push(clone);
      });

      this.setState((prevState) => ({
        ...prevState,
        loading: false,
        loaded: true,
        data: data,
        projects: projects,
      }));
    } catch (err) {
      console.log(err);
    }
  }
  async DeleteProject(id_project) {
    try {
      const response = await fetch(
        `http://localhost:8001/api/projects/${id_project}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();

      let x = [];
      const props = this.props;
      x = JSON.parse(localStorage.getItem("projects"));

      for (let i = 0; i < x.length; i++) {
        if (x[i].id_proiect == id_project) {
          console.log("s a gasit elementul care trebuie sters");
          x.splice(i, 1);
          console.log("array ul dupa splice");
          console.log(x);
        }
      }
      localStorage.setItem("projects", JSON.stringify(x));
      this.props.history.push("/");
      this.render();
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    const Projects = JSON.parse(localStorage.getItem("projects"));
    if (Object.keys(Projects).length !== 0) {
      this.setState((prevState) => ({
        ...prevState,
        loading: false,
        loaded: true,
        data: Projects,
        projects: Projects,
      }));
    } else {
      this.fetchData();
      console.log("mounted");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(`updated... is data loading? ${this.state.loading}`);
    console.log(`updated... is data loaded? ${this.state.loaded}`);
  }

  componentWillUnmount() {
    localStorage.setItem("projects", JSON.stringify(this.state.data));
    console.log("unmounted");
  }

  render() {
    const props = this.props;
    console.log(props);
    console.log(this.state.projects);
    //this.addRows();
    //console.log(this.state.data);

    let l = this.state.projects.length - 1
    l = l? l : 1
    let k = 10 ** Math.floor(Math.log10(l))
    let d = Math.floor(l / k)
    let p = d * k

    if (this.props.user.user) {
      return (
        <div
          style={{
            height: "100%",
            width: "100%",
            maxWidth: "100%",
          }}
        >
          <Typography
            id="welcomeMsg"
            style={{ fontFamily: "", paddingBottom: "5%", paddingTop: "1.5%" }}
            variant="h5"
            color="textPrimary"
          >
            Over {p} projects have joined us already! What are you waiting for?
          </Typography>
          <div className="container" style={{ height: "120vh" }}>
            <div className="left">
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead style={{ backgroundColor: "#FFE4C4" }}>
                    <TableRow>
                      <TableCell align="left">Id</TableCell>
                      <TableCell>Denumire</TableCell>
                      <TableCell>Categorie</TableCell>
                      <TableCell align="right">
                        <Link
                          style={{ textDecoration: "none", color: "#931621" }}
                          to={{
                            pathname: `addProject`,
                            state: {
                              id_categorie: this.state.projects[0],
                            },
                          }}
                        >
                          <Button
                            variant="contained"
                            style={{
                              color: "white",
                              backgroundColor: "#931621",
                            }}
                          >
                            <img
                              src={plusWhite}
                              alt="add-proj"
                              height="23px"
                              width="23px"
                            ></img>
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.loading && (
                      <CircularProgress></CircularProgress>
                    )}
                    {this.state.loaded &&
                      this.state.projects.map((row) => (
                        <TableRow key={row.id_proiect}>
                          <TableCell align="left">{row.id_proiect}</TableCell>
                          <TableCell component="th" scope="row">
                            <Link
                              style={{
                                textDecoration: "none",
                                color: "#931621",
                              }}
                              to={{
                                pathname: `project/${row.id_proiect}`,
                                state: {
                                  id_p: `${row.id_proiect}`,
                                },
                              }}
                            >
                              {row.denumire}
                            </Link>
                          </TableCell>
                          <TableCell align="left">{row.id_categorie}</TableCell>
                          <TableCell align="right">
                            <Link
                              style={{
                                textDecoration: "none",
                                color: "#931621",
                              }}
                              to={{
                                pathname: `/EditProject/${row.id_proiect}`,
                                state: {
                                  id_p: `${row.id_proiect}`,
                                  desc: `${row.descriere}`,
                                  link_git: `${row.link_git}`,
                                  denumire: `${row.denumire}`,
                                  id_categorie: `${row.id_categorie}`,
                                },
                              }}
                            >
                              <EditIcon />
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          style={{
            height: "100%",
            width: "100%",
            minWidth: "100vw",
          }}
        >
          <Typography
            id="welcomeMsg"
            style={{ fontFamily: "", paddingBottom: "5%", paddingTop: "1.5%" }}
            variant="h5"
            color="textPrimary"
          >
            Over {p} projects have joined us already! What are you waiting for?
          </Typography>

          <div className="container" style={{ height: "120vh" }}>
            {/*
                      <div>
                            {this.state.data.categories.map(categorie => {
                                return (<h1 key={categorie.id_categorie}></h1>)
                            })}
                        </div>
    
                        */}
            <div className="left">
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead style={{ backgroundColor: "#FFE4C4" }}>
                    <TableRow>
                      <TableCell align="right">Id</TableCell>
                      <TableCell>Denumire</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.loading && (
                      <CircularProgress></CircularProgress>
                    )}
                    {this.state.loaded &&
                      this.state.projects.map((row) => (
                        <TableRow key={row.id_proiect}>
                          <TableCell align="right">{row.id_proiect}</TableCell>
                          <TableCell component="th" scope="row">
                            <Link
                              style={{
                                textDecoration: "none",
                                color: "#931621",
                              }}
                              to={{
                                pathname: `project/${row.id_proiect}`,
                                state: {
                                  id_p: `${row.id_proiect}`,
                                },
                              }}
                            >
                              {row.denumire}
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      );
    }
  }
}
function mapStateToProps(state) {
  return {
    user: state,
  };
}

function mapDispachToProps(dispach) {
  return {
    actions: bindActionCreators({ RETURN_USER }, dispach),
  };
}

export default withRouter(connect(mapStateToProps, mapDispachToProps)(Home));
