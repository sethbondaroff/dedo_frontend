import React, { useState } from "react";
import "../styles/Signup.css";
import { TextField, Grid, Button, Typography, Link } from "@mui/material";
import * as Constants from "../config/constants";
const axios = require("axios");

const Signup = () => {
  const routeChange = () => {
    if (validateForm()) {
      axios
        .post(`${Constants.API_URL}/v1/signup`, {
          first_name: first_name,
          last_name: last_name,
          email: email,
          username: username,
          password1: password,
          password2: confirm_password,
        })
        .then(function (response) {
          console.log("success");
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");

  function validateForm() {
    let error_msg = "Following fields are required!\n\n";

    if (first_name === "") error_msg += "• First Name\n";
    if (last_name === "") error_msg += "• Last Name\n";
    if (email === "") error_msg += "• Email\n";
    if (username === "") error_msg += "• Username\n";
    if (password === "") error_msg += "• Password\n";
    if (confirm_password === "") error_msg += "• Confirm Password\n";

    if (
      !first_name ||
      !last_name ||
      !email ||
      !username ||
      !password ||
      !confirm_password
    )
      alert(error_msg);
    else {
      let email_validator =
        /^[a-zA-Z0-9\-_]+@[a-zA-Z0-9]+(\.[A-Za-z]{2,3}){1,2}$/gi;

      error_msg = "";

      if (!email.match(email_validator)) error_msg += "• Email is invalid.\n";
      if (password.length < 8)
        error_msg += "• Password must be at least 8 character long.\n";
      if (password !== confirm_password)
        error_msg += "• Password and Confirm Password does not match.\n";
      if (error_msg.length === 0) return true;
      else {
        error_msg = "Following validation(s) failed!\n\n" + error_msg;
        alert(error_msg);
      }
    }
    return false;
  }

  function allowOnlyLetters(event) {
    let input = event.target;
    if (/^[A-Za-z]+$/.test(input.value) || input.value === "") {
      input.id === "first_name"
        ? setFirstName(input.value)
        : setLastName(input.value);
    }
  }

  function allowAlphanumeric(event) {
    let input = event.target;
    if (/^[A-Za-z0-9_]+$/.test(input.value) || input.value === "") {
      setUsername(input.value);
    }
  }

  return (
    <form className="signup-container">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Signup</Typography>
          <br />
          <br />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="first_name"
            variant="outlined"
            label="First Name"
            value={first_name}
            onChange={(e) => allowOnlyLetters(e)}
            required
            fullWidth
          ></TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="last_name"
            variant="outlined"
            label="Last Name"
            value={last_name}
            onChange={(e) => allowOnlyLetters(e)}
            required
            fullWidth
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="email"
            variant="outlined"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="username"
            variant="outlined"
            label="Username"
            value={username}
            onChange={(e) => allowAlphanumeric(e)}
            required
            fullWidth
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="password"
            variant="outlined"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            type={"password"}
            variant="outlined"
            label="Confirm Password"
            value={confirm_password}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            fullWidth
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            size="large"
            variant="outlined"
            color="primary"
            onClick={routeChange}
          >
            REGISTER
          </Button>
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <Link href="/">{"Already have an account? Login"}</Link>
        </Grid>
      </Grid>
    </form>
  );
};

export default Signup;
