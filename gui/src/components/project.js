import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import { Typography } from "@material-ui/core";
import logo from "../icons/addProj.png";
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

class Project extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: false,
      loaded: false,
    };
    this.DeleteBug = this.DeleteBug.bind(this);
    this.refreshPage = this.refreshPage.bind(this);
  }

  async fetchProjects() {
    this.setState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    try {
      const response = await fetch(
        `http://localhost:8001/api/projects/${this.props.location.state.id_p}?inclBugs=true`
      );
      const data = await response.json();
      const bugs = new Array();
      const currentProject = data[0];
      for (let i = 0; i < data[0].Bugs.length; i++) {
        bugs[i] = data[0].Bugs[i];
      }

      this.setState((prevState) => ({
        ...prevState,
        loading: false,
        loaded: true,
        data: data,
        bugs: bugs,
        currentProject: currentProject,
      }));
    } catch (err) {
      console.log(err);
    }
  }

  async DeleteBug(id_bug) {
    try {
      const response = await fetch(`http://localhost:8001/api/bugs/${id_bug}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log("test");
    } catch (err) {
      console.log(err);
    }
  }

  refreshPage() {
    window.location.reload(false);
  }

  componentDidMount() {
    /*const savadImages = JSON.parse(localStorage.getItem("Images"))
        if (Object.keys(savadImages).length !== 0) {
            this.setState(prevState => ({
                ...prevState,
                loading: false,
                loaded:true,
                data: savadImages

            }))
        }
        else {
            this.fetchImages();
            console.log("mounted")

        }*/

    this.fetchProjects();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(`updated... is data loading? ${this.state.loading}`);
    console.log(`updated... is data loaded? ${this.state.loaded}`);
  }

  componentWillUnmount() {
    //localStorage.setItem("Projects", JSON.stringify(this.state.data))
    console.log("unmounted");
  }

  render() {
    const props = this.props;

    return (
      <div style={{ backgroundColor: "#d3d3d2", height: "90vh" }}>
        {this.state.loaded && (
          <div
            className="container"
            style={{
              marginTop: "5%",
            }}
          >
            <div
              className="inLine"
              style={{
                display: "inline-block",
                width: "50%",
              }}
            >
              <img
                src={logo}
                alt="logo"
                style={{ display: "inline-block" }}
              ></img>
            </div>
            <div
              className="inLine"
              style={{
                display: "inline-block",
                width: "50%",
              }}
            >
              <TableContainer
                component={Paper}
                style={{
                  display: "inline-block",
                  borderTopRightRadius: "22px",

                  borderTopLeftRadius: "22px",
                }}
              >
                <Table aria-label="simple table">
                  <TableHead style={{ backgroundColor: "#161412" }}>
                    <TableRow>
                      <TableCell
                        style={{
                          fontWeight: "bold",
                          fontFamily: "VAG Rounded",
                          color: "white",
                        }}
                      >
                        Id Proiect:{" "}
                      </TableCell>
                      <TableCell
                        style={{
                          fontWeight: "bold",
                          fontFamily: "VAG Rounded",
                          color: "white",
                        }}
                      >
                        #{this.state.currentProject.id_proiect}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Denumire:</TableCell>
                      <TableCell>
                        {this.state.currentProject.denumire}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Descriere:</TableCell>
                      <TableCell>
                        {this.state.currentProject.descriere}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Link GitHub:</TableCell>
                      <TableCell>
                        <a h={`${this.state.currentProject.link_git}`}>
                          {this.state.currentProject.link_git}
                        </a>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>ID Categorie:</TableCell>
                      <TableCell>
                        {this.state.currentProject.id_categorie}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Nr. bug-uri:</TableCell>
                      <TableCell>{this.state.bugs.length}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<EditIcon />}
                style={{
                  borderRadius: "20px",
                  backgroundColor: "white",
                  fontWeight: "bold",
                  fontFamily: "VAG Rounded",
                  outline: "black solid 2px",
                }}
              >
                <Link
                  style={{
                    display: "inline-block",
                    textDecoration: "none",
                    color: "black",
                  }}
                  to={{
                    pathname: `/EditProject/${this.state.currentProject.id_proiect}`,
                    state: {
                      id_p: `${this.state.currentProject.id_proiect}`,
                      desc: `${this.state.currentProject.descriere}`,
                      link_git: `${this.state.currentProject.link_git}`,
                      denumire: `${this.state.currentProject.denumire}`,
                      id_categorie: `${this.state.currentProject.id_categorie}`,
                    },
                  }}
                >
                  Edit
                </Link>
              </Button>
            </div>
          </div>
        )}
        <Typography
          id="welcomeMsg"
          style={{ fontFamily: "", paddingBottom: "2.5%", paddingTop: "1.5%" }}
          variant="h5"
          color="textPrimary"
        >
          Lista bug-urilor
        </Typography>
        <div className="container">
          <div className="center">
            <TableContainer
              component={Paper}
              style={{
                borderTopRightRadius: "22px",

                borderTopLeftRadius: "22px",
              }}
            >
              <Table aria-label="simple table">
                <TableHead
                  style={{ backgroundColor: "#161412", height: "100%" }}
                >
                  <TableRow>
                    <TableCell
                      align="right"
                      style={{
                        fontWeight: "bold",
                        fontFamily: "VAG Rounded",
                        color: "white",
                      }}
                    >
                      Id
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        fontFamily: "VAG Rounded",
                        color: "white",
                      }}
                    >
                      Descriere:
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        fontWeight: "bold",
                        fontFamily: "VAG Rounded",
                        color: "white",
                      }}
                    >
                      Prioritate
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        fontWeight: "bold",
                        fontFamily: "VAG Rounded",
                        color: "white",
                      }}
                    >
                      Severitate
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        fontWeight: "bold",
                        fontFamily: "VAG Rounded",
                        color: "white",
                      }}
                    >
                      Id Categorie
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        fontWeight: "bold",
                        fontFamily: "VAG Rounded",
                        color: "white",
                      }}
                    >
                      Id User
                    </TableCell>
                    <TableCell align="right">
                      {" "}
                      <Link to={{ pathname: `/formBug/` }}>
                        <CloudUploadIcon />
                      </Link>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody id="tableBody1">
                  {this.state.loaded &&
                    this.state.bugs.map((row) => (
                      <TableRow key={row.id_bug}>
                        <TableCell align="right">{row.id_bug}</TableCell>
                        <TableCell component="th" scope="row">
                          <Link
                            style={{ textDecoration: "none", color: "#931621" }}
                            to={{
                              pathname: `/Bug/${row.id_bug}`,
                              state: {
                                id_b: `${row.id_bug}`,
                              },
                            }}
                          >
                            {row.descriere}
                          </Link>
                        </TableCell>
                        <TableCell align="right">{row.prioritate}</TableCell>
                        <TableCell align="right">{row.severitate}</TableCell>
                        <TableCell align="right">{row.id_categorie}</TableCell>
                        <TableCell align="right">{row.id_user}</TableCell>
                        <TableCell align="right">
                          <Link
                            to={{
                              pathname: `/formBug/${row.id_bug}`,
                              state: {
                                id_b: `${row.id_bug}`,
                                id_u: `${row.id_user}`,
                                id_c: `${row.id_categorie}`,
                                des: `${row.descriere}`,
                                sev: `${row.severitate}`,
                                pri: `${row.prioritate}`,
                              },
                            }}
                          >
                            <EditIcon />
                          </Link>
                        </TableCell>
                        <TableCell align="right">
                          <DeleteIcon
                            onClick={() => this.DeleteBug(row.id_bug)}
                          />
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
export default withRouter(Project);
