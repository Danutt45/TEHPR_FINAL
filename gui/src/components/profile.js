import React, { Component } from "react";
import { Typography } from "@material-ui/core";
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
import iconProfile from "../icons/iconProfile.png";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      users: [],
      loading: false,
      loaded: false,
      username: localStorage.getItem("username"),
      id: localStorage.getItem("id"),
      mail: localStorage.getItem("email"),
    };
  }

  render() {
    const props = this.props;
    //console.log(props)
    if (this.props.user.user) {
      return (
        <div
          style={{
            backgroundColor: "#FFF6EB",
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
            Pagina de profil a utilizatorului
          </Typography>

          <div className="container" style={{ height: "120vh" }}>
            <div
              className="inLine"
              style={{
                display: "inline-block",
                marginLeft: "10%",
                width: "50%",
              }}
            >
              <img id="imgIcon" src={iconProfile}></img>
            </div>
            <div
              className="inLine"
              style={{
                display: "inline-block",
                marginLeft: "5%",
                width: "30%",
              }}
            >
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead style={{ backgroundColor: "#FFE4C4" }}>
                    <TableRow>
                      <TableCell>Profil</TableCell>
                      <TableCell>UID: #{this.state.id}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Username:</TableCell>
                      <TableCell>{this.state.username}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Email:</TableCell>
                      <TableCell>{this.state.mail}</TableCell>
                    </TableRow>
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

export default connect(mapStateToProps, mapDispachToProps)(Profile);
