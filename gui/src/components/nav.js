import React, { Component } from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import logo from "../icons/logo.png";
import { RETURN_USER } from "../redux/actionCreators";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import usr from "../icons/usr.png";
import logout from "../icons/logout.png";

class Nav extends Component {
  render() {
    const props = this.props;

    if (!this.props.user.user) {
      return (
        <React.Fragment>
          <AppBar
            style={{position: "relative",
            backgroundColor: "#161412",
            width: "100%",
            borderBottomLeftRadius: "50px",
            borderBottomRightRadius: "50px",}}
          >
            <Toolbar>
              <Button
                style={{ color: "white" }}
                onClick={() => {
                  props.history.push("/");
                }}
              >
                <img src={logo} alt="logo" height="70px" width="70"></img>
              </Button>

              <Typography
                id="slogan"
                fontSize="15rem"
                variant="h6"
                color="textPrimary"
              >
                Let's fix your app together!
              </Typography>

              <div style={{ flex: 1 }}></div>

              {!this.props.username && (
                <div className="appBarButtons">
                  <Button
                    variant="contained"
                    style={{color: "black",
                    backgroundColor: "d3d3d2",
                    borderRadius: "14px",
                    fontWeight: "bold",
                    fontFamily: "VAG Rounded"}}
                    onClick={() => {
                      props.history.push("/Login");
                    }}
                  >
                    SIGN IN
                  </Button>

                  <div className="divider"></div>

                  <Button
                    variant="contained"
                    style={{color: "black",
                    backgroundColor: "d3d3d2",
                    borderRadius: "14px",
                    fontWeight: "bold",
                    fontFamily: "VAG Rounded",}}
                    onClick={() => {
                      props.history.push("/Register");
                    }}
                  >
                    SIGN UP
                  </Button>
                </div>
              )}
            </Toolbar>
          </AppBar>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <AppBar
            style={{position: "relative",
            backgroundColor: "#161412",
            width: "100%",
            borderBottomLeftRadius: "50px",
            borderBottomRightRadius: "50px",
            }}
          >
            <Toolbar>
              <Button
                style={{ color: "white",
                borderWidth: "20px",
                borderColor: "black",
                overflow: "hidden"
              }}
                onClick={() => {
                  props.history.push("/");
                }}
              >
                <img src={logo} alt="logo" height="70px" width="70"></img>
              </Button>

              <Typography
                id="slogan"
                fontSize="15rem"
                variant="h6"
                color="textPrimary"
              >
                Let's fix your app together!
              </Typography>

              <div style={{ flex: 1 }}></div>

              {
                <div className="appBarButtons">
                  <div className="divider"></div>

                  <Button
                    variant="contained"
                    style={{ color: "white", backgroundColor: "#931621" }}
                    onClick={() => {
                      props.history.push("/Profile");
                    }}
                  >
                    {this.props.username}
                    <img src={usr} alt="usr" height="40px" width="40"></img>
                  </Button>
                  <div className="divider"></div>
                  <Button
                    variant="contained"
                    style={{ color: "white", backgroundColor: "#931621" }}
                    onClick={() => {
                      props.history.push("/");
                      window.location.reload();
                    }}
                  >
                    <img
                      src={logout}
                      alt="logout"
                      height="40px"
                      width="40"
                    ></img>
                  </Button>
                </div>
              }
            </Toolbar>
          </AppBar>
        </React.Fragment>
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

export default withRouter(connect(mapStateToProps, mapDispachToProps)(Nav));
