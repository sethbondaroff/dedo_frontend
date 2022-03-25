import { React, useRef, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

const BookDelivery = () => {
  const longRef = useRef("");
  const latRef = useRef("");

  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");

  const handleSubmit = () => {
    var long = document.getElementById("long").value;
    var lat = document.getElementById("lat").value;
    if (long !== "" && lat !== "") {
      console.log(long);
      console.log(lat);
    } else {
      alert("Please fill out the required values");
    }
  };
  return (
    <>
      <Typography color="black" variant="h3">
        Enter a location to send delivery
      </Typography>
      <div className="login-container">
        <Card sx={{ maxWidth: 400, margin: "auto", marginTop: "30px" }}>
          <CardContent>
            <TextField
              id="long"
              label="required"
              helperText="Please enter a value for longitude"
              required={true}
              ref={longRef}
            />
            <TextField
              id="lat"
              label="required"
              required={true}
              helperText="Please enter a value for latitude"
              ref={latRef}
            />
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
