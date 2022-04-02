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

  var flag = 0;

  useEffect(() => {
    const loadDeliveries = () => {
      if (token !== null) {
        axios
          .get(`${Constants.API_URL}/v1/trips`, config)
          .then((result) => {
            console.log("h1l");
            setDeliv(result);
            flag = 1;
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        console.log("g1ls");
      }
    };
    loadDeliveries();
  }, []);

  if (deliveries.length <= 0) {
    return <h1>LOADING</h1>;
  }

  console.log(deliveries);

  return deliveries.data.length > 0 ? (
    deliveries.data.map((delivery) => {
      return (
        <>
          <DeliveryElement
            item_name={delivery.item_type}
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
