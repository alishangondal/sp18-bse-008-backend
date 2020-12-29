import React from "react";
import Joi from "joi-browser";
import * as userSevice from "../services/userService";
import Form from "./common/form";
import auth from "../services/authService";
class Register extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };
  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().label("Password"),
    name: Joi.string().required().label("Name"),
  };
  //submit krao to backend oe bi data bijwana ha na try ki first line
  //phir baki 2 linain han ky register sy direct login ky liye
  //costum toke pkar ky store kra rhy jo login main karty
  doSubmit = async () => {
    try {
      const response = await userSevice.register(this.state.data);
      auth.storeToken(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default Register;
