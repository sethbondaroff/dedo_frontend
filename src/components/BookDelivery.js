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

const token =
  localStorage.getItem("user1") &&
  JSON.parse(localStorage.getItem("user1")).data.access;

console.log(token);

const BookDelivery = () => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const data = {
    status: "REQUESTED",
    source_address: "1567 Robie Street, Halifax, Canada",
    destination_address: "5165, Hollis Street, Halifax, Canada",
    source_location: { type: "Point", coordinates: [-63.586518, 44.637895] },
    destination_location: {
      type: "Point",
      coordinates: [-63.586518, 44.637895],
    },
    destination_email: "aadil@gmail.com",
    item_type: type,
  };

  const longRef = useRef("");
  const latRef = useRef("");

  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");
  var [type, setType] = useState("NONE");

  const handleSubmit = () => {
    var long = document.getElementById("long").value;
    var lat = document.getElementById("lat").value;
    var type1 = document.getElementById("dropdown");
    console.log(type);

    if (long !== "" && lat !== "" && type !== "NONE") {
      console.log(long);
      console.log(lat);
      axios
        .post(`${Constants.API_URL}/v1/trip`, data, config)
        .then((result) => {
          console.log(config);
          console.log(result);
          alert("Your trip has been created");
        })
        .catch((err) => {
          console.log(config);
          console.log(err);
        });
    } else {
      alert("Please fill out the required values");
    }
  };

  const handleChange = (e) => {
    setType(e.target.value);
  };
  return (
    <>
      {console.log(type)}
      <Typography color="black" variant="h3">
        Enter a location to send delivery
      </Typography>
      <div className="login-container">
        <Card sx={{ maxWidth: 400, margin: "auto", marginTop: "30px" }}>
          <CardContent>
            <TextField
              id="long"
              label="required"
              helperText="Please enter Source Address"
              required={true}
              ref={longRef}
            />
            <TextField
              id="lat"
              label="required"
              required={true}
              helperText="Please enter Destination Address"
              ref={latRef}
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
