import { React, useRef, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import * as Constants from "../config/constants";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import Map from "./Map";

const token = localStorage.getItem("access_token");

console.log(token);

const arr = [];
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

const BookDelivery = () => {
  const source = [];
  const dest = [];
  const src_arr = [];
  const dest_arr = [];
  var src_address = "";
  var dest_address = "";
  var custid = "";
  // const setLocation = () => {
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     setLong(position.coords.longitude);
  //     setLat(position.coords.latitude);
  //     console.log("Latitude is :", lat);
  //     console.log("Longitude is :", long);
  //   });
  // };

  var [type, setType] = useState("NONE");
  const navigator = useNavigate();
  const [res, setRes] = useState([]);

  const handleSubmit = () => {
    //var long = document.getElementById("long").value;
    source.push(localStorage.getItem("source"));
    // source.push(localStorage.getItem("source")[1]);
    dest.push(localStorage.getItem("dest"));
    var type1 = document.getElementById("dropdown");
    console.log(type);
    custid = document.getElementById("custid").value;
    console.log(custid);

    //console.log(source[0].split(",")[0]);

    src_address = source[0].split(",")[2];
    dest_address = dest[0].split(",")[2];

    console.log(src_address);
    src_arr.push(parseFloat(source[0].split(",")[1]));
    src_arr.push(parseFloat(source[0].split(",")[0]));

    dest_arr.push(parseFloat(dest[0].split(",")[1]));
    dest_arr.push(parseFloat(dest[0].split(",")[0]));

    var data = {
      status: "REQUESTED",
      source_address: src_address,
      destination_address: dest_address,
      source_location: { type: "Point", coordinates: src_arr },
      destination_location: {
        type: "Point",
        coordinates: dest_arr,
      },
      destination_email: custid,
      item_type: type + "",
    };
    console.log(data.item_type);

    if (source !== null && dest !== null && type !== "NONE" && custid !== "") {
      axios
        .post(`${Constants.API_URL}/v1/trip`, data, config)
        .then((result) => {
          console.log(config);
          console.log(result);
          setRes(result);
          assignDriver(result.data.id);

          alert(
            "Your trip has been created and is in a requested state. If a driver is close by, he will be assigned to you."
          );
          localStorage.removeItem("source");
          localStorage.removeItem("dest");
        })
        .catch((err) => {
          console.log(config);
          console.log(err);
        });

      //axios.post(`${Constants.API_URL}/v1/trip`, data, config);
    } else {
      alert("Please fill out the required values");
    }
  };

  const assignDriver = (id) => {
    axios
      .post(`${Constants.API_URL}/v1/trip/${id}`, "", config)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
        alert("No driver available");
      });
  };

  const handleMap = () => {
    navigator("/map-test");
  };

  const handleChange = (e) => {
    setType(e.target.value);
  };
  return (
    <>
      {console.log(type)}
      <Typography
        color="black"
        variant="overline"
        display="block"
        align="center"
        mt={4}
      >
        Ready to send your parcel securely? Enter the details to get a secure
        delivery experience.
      </Typography>
      <Grid
        container
        // spacing={0}
        // direction="row"
        // alignItems="center"
        // justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid
          item
          md={6}
          // spacing={0}
          // alignItems="center"
          // justifyContent="center"
          // style={{ minHeight: "80vh" }}
        >
          {/* <div className="login-container"> */}
          <Card sx={{ maxWidth: 400, ml: 4, mt: 2, marginTop: "30px" }}>
            <Grid container alignItems="center" justifyContent="center">
              <CardContent>
                {localStorage.getItem("source") === null ? (
                  <Typography variant="h5" m={2}>
                    Select From Address
                  </Typography>
                ) : (
                  <>
                    <Typography variant="h5" m={2}>
                      Source Address Selected!
                    </Typography>
                    <Typography m={2}>
                      {localStorage.getItem("source").split(",")[2]}
                    </Typography>
                  </>
                )}
                {/* <TextField
              id="lat"
              label="required"
              required={true}
              helperText="Please enter Destination Address"
            /> */}

                {localStorage.getItem("dest") === null ? (
                  <Typography variant="h5" m={2}>
                    Select To Address
                  </Typography>
                ) : (
                  <>
                    <Typography variant="h5" m={2}>
                      Destination Address Selected!
                    </Typography>
                    <Typography m={2}>
                      {localStorage.getItem("dest").split(",")[2]}
                    </Typography>
                  </>
                )}

                <TextField
                  id="custid"
                  label="required"
                  required={true}
                  m={2}
                  helperText="Please enter the Email of your destination user"
                />

                <Box sx={{ p: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      Type of document
                    </InputLabel>
                    <NativeSelect
                      id="dropdown"
                      defaultValue={"NONE"}
                      inputProps={{
                        name: "type",
                        id: "uncontrolled-native",
                      }}
                      onChange={handleChange}
                    >
                      <option
                        value={"NONE"}
                        onClick={() => {
                          setType("NONE");
                        }}
                      >
                        NONE
                      </option>
                      <option
                        value={"DOCUMENT"}
                        onClick={() => {
                          setType("DOCUMENT");
                          console.log(type);
                        }}
                      >
                        DOCUMENT
                      </option>
                      <option
                        value={"DRUG"}
                        onClick={() => {
                          setType("DRUG");
                        }}
                      >
                        DRUG
                      </option>
                      <option
                        value={"OTHERS"}
                        onClick={() => {
                          setType("OTHERS");
                        }}
                      >
                        OTHERS
                      </option>
                    </NativeSelect>
                  </FormControl>
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={handleSubmit}
                >
                  Find a delivery driver
                </Button>
              </CardContent>
            </Grid>
          </Card>
          {/* </div> */}
        </Grid>
        <Grid item md={5}>
          <Map></Map>
        </Grid>
      </Grid>
    </>
  );
};

export default BookDelivery;
