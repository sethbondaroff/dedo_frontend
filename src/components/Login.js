import React, { useEffect, useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { TextField, Grid, Button, Typography, Link } from "@mui/material";
import { API } from "../apis/api";
import {
  getUserProfile,
  setUserLoggedIn,
  setUserProfile,
} from "../helpers/authHelpers";
import { API_URL } from "../config/constants";
const axios = require("axios");

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(getUserProfile()));

  useEffect(() => {
    if (user) {
      user?.type == "CUSTOMER" ? navigate("/bookdel") : navigate("/driver");
    }
  }, []);
  const routeChange = async () => {
    try {
      let response = await API.post(`${API_URL}/v1/login`, {
        username: username,
        password: password,
      })
        .then(function (response) {
          localStorage.setItem("user1", JSON.stringify(response));
          console.log("success");
          console.log(response);
          setUserLoggedIn(response.data.access, response.data.refresh);
        })
        .catch(function (error) {
          console.log(error);
        });

      response = await API.get(`${API_URL}/v1/user`);

      console.log(response.data);
      setUserProfile(JSON.stringify(response.data));
      setUser(getUserProfile());
      user?.type == "CUSTOMER" ? navigate("/bookdel") : navigate("/driver");
    } catch (err) {
      console.log(err);
    }
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function allowAlphanumeric(event) {
    let input = event.target;
    if (/^[A-Za-z0-9_\.]+$/.test(input.value) || input.value === "") {
      setUsername(input.value);
    }
  }

  return (
    <>
      <form className="login-container">
        <Grid container spacing={2}>
          <Grid item xs={12}>
          <Typography variant="h4">Login</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="username"
              variant="standard"
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
              variant="standard"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              LOGIN
            </Button>
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <Link href="/signup">{"Don't have an account? Sign Up"}</Link>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Login;
