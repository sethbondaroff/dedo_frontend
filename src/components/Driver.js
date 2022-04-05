import React, { useState, useEffect } from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import AirplanemodeActive from "@material-ui/icons/AirplanemodeActive";
import VerticalTicketRip from "@mui-treasury/components/rip/verticalTicket";
import { useVerticalRipStyles } from "@mui-treasury/styles/rip/vertical";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import * as Constants from "../config/constants";
import { getUserProfile } from "../helpers/authHelpers";
import { useNavigate } from "react-router-dom";

const mainColor = "#003399";
const lightColor = "#ecf2ff";
const borderRadius = 12;
const useStyles = makeStyles(({ palette, breakpoints }) => ({
  card: {
    overflow: "visible",
    background: "none",
    display: "flex",
    minWidth: 343,
    minHeight: 150,
    filter: "drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.3))",
    "& $moveLeft, $moveRight": {
      transition: "0.3s",
    },
    "&:hover": {
      "& $moveLeft": {
        transform: "translateX(-8px)",
      },
      "& $moveRight": {
        transform: "translateX(8px)",
      },
    },
    [breakpoints.up("sm")]: {
      minWidth: 400,
    },
  },
  left: {
    borderTopLeftRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    flexBasis: "33.33%",
    display: "flex",
    backgroundColor: "#fff",
  },
  media: {
    margin: "auto",
    width: 80,
    height: 80,
    borderRadius: "50%",
  },
  right: {
    borderTopRightRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    flex: 1,
    padding: 12,
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: lightColor,
  },
  label: {
    padding: "0 8px",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 0,
    marginBottom: 4,
  },
  subheader: {
    fontSize: 12,
    margin: 0,
    color: palette.text.secondary,
  },
  path: {
    flex: 1,
    flexBasis: 72,
    padding: "0 4px",
  },
  line: {
    position: "relative",
    margin: "20px 0 16px",
    borderBottom: "1px dashed rgba(0,0,0,0.38)",
  },
  plane: {
    position: "absolute",
    display: "inline-block",
    padding: "0 4px",
    fontSize: 32,
    backgroundColor: lightColor,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) rotate(90deg)",
  },
  flight: {
    fontSize: 14,
    lineHeight: "24px",
    minWidth: 48,
    padding: "0 8px",
    borderRadius: 40,
    backgroundColor: "#bed0f5",
    color: mainColor,
    display: "block",
  },
  moveLeft: {},
  moveRight: {},
}));

function Driver() {
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

  const styles = useStyles();
  const ripStyles = useVerticalRipStyles({
    size: 24,
    rightColor: lightColor,
    tearColor: mainColor,
  });
  const token = localStorage.getItem("access_token");
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
    return <h1 className="align-center">No deliveries</h1>;
  }

  console.log(deliveries);

  return deliveries.data.length > 0 ? (
    deliveries.data.map((delivery) => {
      return (
        <>
          <Typography variant="h1" align="center">
            Trips Assigned to You:
          </Typography>
          <br></br>
          <Card className={styles.card} elevation={0}>
            <div className={cx(styles.left, styles.moveLeft)}>
              <Typography variant="h4">{delivery.item_type}</Typography>
              <CardMedia
                className={styles.media}
                image={
                  //"https://dejpknyizje2n.cloudfront.net/marketplace/products/yin-yang-two-fighting-dragons-sticker-1538772130.3390164.png"
                  "https://cdn-icons-png.flaticon.com/512/160/160085.png"
                }
              />
            </div>

            <VerticalTicketRip
              classes={{
                ...ripStyles,
                left: cx(ripStyles.left, styles.moveLeft),
                right: cx(ripStyles.right, styles.moveRight),
              }}
            />

            <div className={cx(styles.right, styles.moveRight)}>
              <div className={styles.label}>
                <h2 className={styles.heading}>{delivery.source_address}</h2>
                <p className={styles.subheader}>Halifax</p>
              </div>
              <div className={styles.path}>
                <div className={styles.line}>
                  <AirplanemodeActive className={styles.plane} />
                </div>
                <span className={styles.flight}>Delivery</span>
              </div>
              <div className={styles.label}>
                <h2 className={styles.heading}>
                  {delivery.destination_address}
                </h2>
                <p className={styles.subheader}>Halifax</p>
              </div>
            </div>
          </Card>
        </>
      );
    })
  ) : (
    <>
      <h1 className="align-center">No deliveries</h1>;
    </>
  );
}

export default Driver;
