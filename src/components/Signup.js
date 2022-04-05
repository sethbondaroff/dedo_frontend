import React, { useState } from "react";
import "../styles/Signup.css";
import {
  TextField,
  Grid,
  Button,
  Typography,
  Link,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { API } from "../apis/api";
import { API_URL } from "../config/constants";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const routeChange = async () => {
    if (validateForm()) {
      try {
        let response = await API.post(`${API_URL}/v1/signup`, {
          first_name: first_name,
          last_name: last_name,
          email: email,
          username: username,
          password1: password,
          password2: confirm_password,
          type: type,
        });
        console.log("Success");
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [type, setType] = useState("CUSTOMER");

  function validateForm() {
    if (
      !first_name ||
      !last_name ||
      !email ||
      !username ||
      !password ||
      !confirm_password
    )
      alert("All fields are required!");
    else {
      let email_validator =
        /^[a-zA-Z0-9\-_\.]+@[a-zA-Z0-9]+(\.[A-Za-z]{2,3}){1,2}$/gi;

      if (email.match(email_validator)) {
        if (password.length > 7) {
          if (password === confirm_password) {
            return true;
          } else {
            alert("Password and Confirm Password does not match.");
          }
        } else {
          alert("Password must have atleast 8 characters");
        }
      } else {
        alert("Invalid email!");
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
    <>
      <form className="align-center signup">
        <Grid container spacing={2} sx={{mt:1}}>
          <Grid item xs={12}>
            <Typography variant="h4" sx={{mb:-1}}>Signup</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="first_name"
              variant="standard"
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
              variant="standard"
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
              variant="standard"
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
            <TextField
              type={"password"}
              variant="standard"
              label="Confirm Password"
              value={confirm_password}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              fullWidth
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <FormControlLabel
                value="CUSTOMER"
                control={<Radio />}
                label="Customer"
              />
              <FormControlLabel
                value="DRIVER"
                control={<Radio />}
                label="Driver"
              />
            </RadioGroup>
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
    </>
  );
};

export default Signup;
