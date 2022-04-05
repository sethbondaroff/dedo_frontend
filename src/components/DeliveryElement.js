import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

function DeliveryElement(props) {
  const { item_name, source, destination, delivery_status } = props;
  return (
    <>
      <div class="content" align="center">
        <Card sx={{ maxWidth: 300, maxHeight: 900, m: 2 }}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item_name}
              </Typography>
              {/* variant="body2" color="text.secondary" */}
              <Typography>Source: {source}</Typography>
              <Typography>Destination : {destination}</Typography>
              <Typography>
                Delivery Status:{" "}
                <Typography variant="body" color="text.primary">
                  {" "}
                  {delivery_status}
                </Typography>
              </Typography>
              {/* <Typography>Driver Name : {driver_name}</Typography> */}
            </CardContent>
            <CardActions style={{ justifyContent: "center" }}></CardActions>
          </CardActionArea>
        </Card>
      </div>
    </>
  );
}

export default DeliveryElement;
