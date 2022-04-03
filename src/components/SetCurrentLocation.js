import { Box, Button, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import solution from "../images/solution.png";
import * as Constants from "../config/constants";
var geolocation = require("geolocation");

function SetCurrentLocation() {
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");
  const arr = [];

  const token = localStorage.getItem("access_token");
  console.log(token);

  const setLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLong(position.coords.longitude);

      setLat(position.coords.latitude);

      console.log("Latitude is :", lat);
      console.log("Longitude is :", long);
    });

    arr.push(parseFloat(long));
    arr.push(parseFloat(lat));
    const data = {
      current_location: {
        type: "Point",
        Coordinates: arr,
      },
    };
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    console.log(data);
    console.log(config);

    axios
      .post(`${Constants.API_URL}/v1/current-location`, data, config)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });

    alert("Your location has been updated successfully");
  };

  return (
    <Box
      display="flex"
      flex-direction="vertical"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Image src={solution} height="500" width="400"></Image>
      <Button
        sx={{ m: 10 }}
        size="large"
        color="primary"
        variant="contained"
        onClick={setLocation}
      >
        Set My Current Location!
      </Button>
    </Box>
  );
}

export default SetCurrentLocation;
