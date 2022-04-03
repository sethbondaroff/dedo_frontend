import { React, useRef, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  FormControl,
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

const token = localStorage.getItem("access_token");

console.log(token);

const arr = [];

const BookDelivery = () => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

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
    src_arr.push(parseFloat(source[0].split(",")[0]));
    src_arr.push(parseFloat(source[0].split(",")[1]));

    dest_arr.push(parseFloat(dest[0].split(",")[0]));
    dest_arr.push(parseFloat(dest[0].split(",")[1]));

    var data = {
      status: "REQUESTED",
      source_address: src_address,
      destination_address: dest_address,
      source_location: { type: "Point", coordinates: src_arr },
      destination_location: {
        type: "Point",
        coordinates: dest_arr,
      },
      destination_email: "aadil@gmail.com",
      destination_user: parseInt(custid),
      item_type: type + "",
    };
    console.log(data.item_type);

    if (source !== null && dest !== null && type !== "NONE" && custid !== "") {
      axios
        .post(`${Constants.API_URL}/v1/trip`, data, config)
        .then((result) => {
          console.log(config);
          console.log(result);
          alert("Your trip has been created");
          localStorage.removeItem("source");
          localStorage.removeItem("dest");
        })
        .catch((err) => {
          console.log(config);
          console.log(err);
        });
    } else {
      alert("Please fill out the required values");
    }
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
      <div className="login-container">
        <Card sx={{ maxWidth: 400, margin: "auto", marginTop: "30px" }}>
          <CardContent>
            {localStorage.getItem("source") === null ? (
              <Button
                sx={{ m: 2 }}
                variant="contained"
                color="primary"
                size="small"
                onClick={handleMap}
              >
                Search for source location.
              </Button>
            ) : (
              <>
                <Typography variant="h5">Source Address Selected!</Typography>
                <Typography>
                  {localStorage.getItem("source").substring(31)}
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
              <Button
                sx={{ m: 2 }}
                variant="contained"
                color="primary"
                size="small"
                onClick={handleMap}
              >
                Search for destination location.
              </Button>
            ) : (
              <>
                <Typography variant="h5">
                  Destination Address Selected!
                </Typography>
                <Typography>
                  {localStorage.getItem("dest").substring(35)}
                </Typography>
              </>
            )}

            <TextField
              id="custid"
              label="required"
              required={true}
              helperText="Please enter the Secret ID of your destination user"
            />

            <Box sx={{ p: 2 }}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
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
                    value={"DOOCUMENT"}
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
        </Card>
      </div>
    </>
  );
};

export default BookDelivery;
