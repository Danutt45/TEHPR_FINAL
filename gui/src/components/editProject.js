import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import { TableContainer, TextField } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

class EditProject extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: false,
      loaded: false,
    };
    this.deleteProject = this.deleteProject.bind(this);
    this.updateProject = this.updateProject.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleGitLinkChange = this.handleGitLinkChange.bind(this);
  }

  async deleteProject(id_p) {
    try {
      const response = await fetch(
        `http://localhost:8001/api/projects/${id_p}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      console.log("test");

      const props = this.props;

      let x = [];

      x = JSON.parse(localStorage.getItem("projects"));

      //console.log(x)

      for (let i = 0; i < x.length; i++) {
        if (x[i].id_proiect == this.props.location.state.id_p) {
          x.splice(i, 1);
        }
      }
      localStorage.setItem("projects", JSON.stringify(x));
      props.history.push("/");
    } catch (err) {
      console.log(err);
    }
  }

  async updateProject(id_p) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        descriere: this.state.description,
        denumire: this.state.name,
        link_git: this.state.git_link,
      }),
    };
    console.log("aici");
    try {
      const response = await fetch(
        `http://localhost:8001/api/projects/${id_p}`,
        requestOptions
      );
      const data = await response.json();
      console.log(data);
      const props = this.props;

      let x = [];

      x = JSON.parse(localStorage.getItem("projects"));
      for (let i = 0; i < x.length; i++) {
        if (x[i].id_proiect == this.props.location.state.id_p) {
          x[i].denumire = this.state.name;
          x[i].descriere = this.state.description;
          x[i].link_git = this.state.git_link;
        }
      }
      localStorage.setItem("projects", JSON.stringify(x));
      props.history.push("/");
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    console.log(`updated... is data loading? ${this.state.loading}`);
    console.log(`updated... is data loaded? ${this.state.loaded}`);

    // if (prevState.loaded !== this.state.loaded && this.state.loaded) {
    //     localStorage.setItem("Images", JSON.stringify(this.state.data.images))
    // }
  }

  componentWillUnmount() {
    //localStorage.setItem("Projects", JSON.stringify(this.state.data))
    console.log("unmounted");
  }

  handleDescriptionChange = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleGitLinkChange = (event) => {
    this.setState({
      git_link: event.target.value,
    });
  };

  render() {
    const props = this.props;
    console.log(this.props.location.state.id_p);
    console.log("editProject props");
    console.log(props);

    return (
      <div style={{ backgroundColor: "#FFE4C4", height: "100vh" }}>
        <form noValidate autoComplete="off">
          <div className="container"
          style={{width: "50%"}}>
          <TableContainer component={Paper} style={{ display: "inline-block" }}>
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "#FFE4C4" }}>
                <TableRow>
                  <TableCell>Id Proiect: </TableCell>
                  <TableCell>
                    #{this.props.location.state.id_p}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Denumire:</TableCell>
                  <TableCell>
                      <TextField
                        id="component-filled"
                        defaultValue={this.props.location.state.denumire}
                        onChange={this.handleNameChange}
                      />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Descriere:</TableCell>
                  <TableCell>
                      <TextField
                        id="component-filled"
                        defaultValue={this.props.location.state.desc}
                        onChange={this.handleDescriptionChange}
                      />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Link GitHub:</TableCell>
                  <TableCell>
                      <TextField
                        id="component-filled"
                        defaultValue={this.props.location.state.link_git}
                        onChange={this.handleGitLinkChange}
                      />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Id Categorie:</TableCell>
                  <TableCell>
                    #{this.props.location.state.id_categorie}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          </div>

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => this.updateProject(this.props.location.state.id_p)}
            startIcon={<SaveIcon />}
            style={{ color: "white", backgroundColor: "#931621" }}
          >
            Save
          </Button>
          
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => this.deleteProject(this.props.location.state.id_p)}
            startIcon={<DeleteIcon />}
            style={{ color: "white", backgroundColor: "#931621" }}
          >
            Delete
          </Button>
        </form>
      </div>
    );
  }
}
export default withRouter(EditProject);
