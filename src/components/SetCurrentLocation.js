import { Box, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import solution from "../images/solution.png";
import * as Constants from "../config/constants";
import Map from "./Map";
import { getUserProfile } from "../helpers/authHelpers";
import { useNavigate } from "react-router-dom";

var geolocation = require("geolocation");

function SetCurrentLocation() {
  
  const [user, setUser] = useState(JSON.parse(getUserProfile()));
  const navigate = useNavigate();
  useEffect(() => {
    if (!user || user?.type !== "DRIVER") {
      navigate("/");
    } else {
      console.log("user");
      console.log(user["type"]);
    }
  }, []);


  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");
  const [source, setSource] = useState([])

  const token = localStorage.getItem("access_token");
  console.log(token);

  var location = "";
  var flag = 0;

  const handleSubmit = () => {
    //const curr = [];
    const curr_arr = [];
    //curr.push(localStorage.getItem("curr"));
    //console.log(curr);
    console.log(source)
    if(source.length !== 0){
      curr_arr.push(parseFloat(source[0]))
      curr_arr.push(parseFloat(source[1]))
      console.log("Latitude is :", curr_arr[0]);
      console.log("Longitude is :", curr_arr[1]);
      const data = {
        current_location: {
          type: "Point",
          Coordinates: curr_arr,
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

      alert(
        "Your location has been updated successfully: " +
          curr_arr[0] +
          "," +
          curr_arr[1]
      );
    }
  };

  return (
    // <Grid
    //   container
    //   spacing={0}
    //   direction="column"
    //   alignItems="center"
    //   justifyContent="center"
    // >
    <>
      <Typography
        color="black"
        variant="overline"
        display="block"
        align="center"
        mt={4}
      >
        Set Your Current Location!
      </Typography>
      {/* //<Image src={solution} height="500" width="400"></Image> */}
      <Map
        setSourceCoords={setSource}
        sourceOnly={true}
        userLatLong={[44.648618, -63.5859487]}
        defaultZoom={13}
        defaultCity='Halifax'
        defaultProv='Nova Scotia'
        defaultCountry='Canada'
      />
      <Button
        sx={{ m: 10 }}
        size="large"
        color="primary"
        variant="contained"
        onClick={handleSubmit}
      >
        Set My Current Location!
      </Button>
    </>
    // </Grid>
  );
}

export default SetCurrentLocation;
