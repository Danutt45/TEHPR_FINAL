import React, { Component } from "react";
import {
  FormControl,
  InputLabel,
  FormHelperText,
  TextField,
  Input,
  Button,
  Select,
  Container,
  MenuItem,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete"
import { withRouter } from "react-router-dom";
import { RETURN_USER } from "../redux/actionCreators";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { TransferWithinAStationSharp } from "@material-ui/icons";

class AddProject extends Component {
  constructor() {
    super();
    console.log();
    this.state = {
      name: "",
      description: "",
      id_categorie: "",
      link_git: "",
      user_select: [],
      categorii: [],
      utilizatori: []
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeGithubLink = this.handleChangeGithubLink.bind(this);
    this.handleChangeUsers = this.handleChangeUsers.bind(this);
    this.handleClick = this.handleUpdate.bind(this);
  }

  handleUpdate = async (e) => {
    e.preventDefault();

    var ids = this.state.user_select.map(u=>u.id_user);

    console.log(ids);
    const props = this.props;
    try {
      // POST request using fetch with async/await
      let _body = JSON.stringify({
        denumire: this.state.name,
        descriere: this.state.description,
        link_git: this.state.link_git,
        users_ids: ids,
        id_categorie: this.state.id_categorie,
      });
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: _body,
      };
      const response = await fetch(
        "http://localhost:8001/api/projects",
        requestOptions
      );

      const data = await response.json();

      let x = [];

      x = JSON.parse(localStorage.getItem("projects"));

      await x.push(data);
      localStorage.setItem("projects", JSON.stringify(x));

      props.history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  RETURN_USER(e) {
    this.props.actions.RETURN_USER(e);
  }

  componentDidMount() {
    console.log("log in mounted");
    this.getCategorii();
    this.getUtilizatori();
  }

  getCategorii() {
    fetch("http://localhost:8001/api/categories")
      .then((response) => response.json())
      .then((listaCategorii) =>
        this.setState({
          categorii: listaCategorii,
        })
      );
  }

  getUtilizatori() {
    fetch("http://localhost:8001/api/users")
      .then((response) => response.json())
      .then((listaUtilizatori) =>
        this.setState({
          utilizatori: listaUtilizatori,
        })
      );
  }

  handleChangeName(event) {
    this.setState({
      name: event.target.value,
    });
  }

  handleChangeCategory(event) {
    this.setState({
      id_categorie: event.target.value,
    });
  }

  handleChangeDescription(event) {
    this.setState({
      description: event.target.value,
    });
  }

  handleChangeGithubLink(event) {
    this.setState({
      link_git: event.target.value,
    });
  }

  handleChangeUsers(e, v) {
    console.log(v)
    this.setState({
      user_select: v,
    });
  }

  render() {
    const props = this.props;

    console.log("test");
    console.log(this.state.id_categorie);
    return (
      <div
        style={{
          backgroundColor: "#FFF6EB",
          height: "120vh",
          minWidth: "100vw",
        }}
      >
        <div style={{ height: "100px" }}></div>
        <Container
          id="logInContainer"
          style={{
            backgroundColor: "#FFE4C4",
            width: "400px",
            height: "50%",
            borderRadius: "25px",
          }}
        >

          <FormControl fullWidth>
            <InputLabel htmlFor="name-input">Project name</InputLabel>
            <Input onChange={this.handleChangeName} id="name-input" />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel htmlFor="catid-input">Category</InputLabel>
            <Select
              dataSource
              variant="standard"
              onChange={this.handleChangeCategory}
              id="catid-input"
            >
              {this.state.categorii.map((c) => (
                <MenuItem value={c.id_categorie}>{c.denumire_categ}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel htmlFor="desc-input">Description</InputLabel>
            <Input onChange={this.handleChangeDescription} id="desc-input" />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel htmlFor="pwd-input">GitHub Link</InputLabel>
            <Input onChange={this.handleChangeGithubLink} id="pwd-input" />
          </FormControl>

          <FormControl fullWidth>
            <Autocomplete
              multiple
              defaultValue={[]}
              id="tags-standard"
              options={this.state.utilizatori}
              getOptionLabel={(utilizator) => utilizator.username}
              onChange={this.handleChangeUsers}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Members"
                  placeholder="Favorites"
                />
              )}
            />
            <FormHelperText id="my-helper-text">
              Exemple: 99,13,22
            </FormHelperText>
          </FormControl>

          <Button
            style={{ backgroundColor: "#931621" }}
            onClick={this.handleUpdate}
            variant="contained"
            color="primary"
          >
            ADD
          </Button>
        </Container>
      </div>
    );
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

export default withRouter(
  connect(mapStateToProps, mapDispachToProps)(AddProject)
);
