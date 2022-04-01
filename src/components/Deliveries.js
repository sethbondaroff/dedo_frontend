import React, { useState, useEffect } from "react";
import DeliveryElement from "./DeliveryElement";
import axios from "axios";
import * as Constants from "../config/constants";
import { Typography } from "@mui/material";

const token = JSON.parse(localStorage.getItem("user1")).data.access;

console.log(token);

function Deliveries() {
  const [deliveries, setDeliv] = useState([]);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    loadDeliveries();
  }, []);

  const loadDeliveries = () => {
    if (token !== null) {
      axios
        .get(`${Constants.API_URL}/v1/trips`, config)
        .then((result) => {
          setDeliv(result);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  console.log(deliveries.data.length);

  return deliveries.data.length > 0 ? (
    deliveries.data.map((delivery) => {
      return (
        <>
          <DeliveryElement
            item_name="Aadhar Card"
            source={delivery.source_user + " " + delivery.source_address}
            destination={
              delivery.destination_user + " " + delivery.destination_address
            }
            delivery_status={delivery.status}
          />
        </>
      );
    })
  ) : (
    <>
      <Typography variant="h1">No deliveries</Typography>
    </>
  );

  //   <DeliveryElement
  //     item_name="Permit"
  //     source="1333 S Park St"
  //     destination="robie st"
  //     delivery_status="In transit"
  //   />
  // </div>
}

export default Deliveries;
