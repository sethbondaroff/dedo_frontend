import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";
import { getUserProfile } from "../helpers/authHelpers";

function Profile() {
  const [user, setUser] = useState(JSON.parse(getUserProfile()));
  const navigate = useNavigate();

  const capitalizeFirst = (str) => {
    if (str && str.length>0) return str[0].toUpperCase()+str.slice(1).toLowerCase();
    else return str;
  }
  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      console.log(user);
    }
  }, []);
  return (
    <div className="profile-container">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h4">{capitalizeFirst(user?.first_name)}'s Profile</Typography>
          <br />
        </Grid>
        <Grid item textAlign="right" xs={6}>
          <Typography fontWeight="bold" variant="h6">Name:</Typography>
        </Grid>
        <Grid item textAlign="left" xs={6}>
          <Typography variant="h6">
            {capitalizeFirst(user?.first_name)} {capitalizeFirst(user?.last_name)}
          </Typography>
        </Grid>
        <Grid item textAlign="right" xs={6}>
          <Typography fontWeight="bold" variant="h6">Username:</Typography>
        </Grid>
        <Grid item textAlign="left" xs={6}>
          <Typography variant="h6">{user?.username}</Typography>
        </Grid>
        <Grid item textAlign="right" xs={6}>
          <Typography fontWeight="bold" variant="h6">Email:</Typography>
        </Grid>
        <Grid item textAlign="left" xs={6}>
          <Typography variant="h6">{user?.email}</Typography>
        </Grid>
        <Grid item textAlign="right" xs={6}>
          <Typography fontWeight="bold" variant="h6">User type:</Typography>
        </Grid>
        <Grid item textAlign="left" xs={6}>
          <Typography variant="h6">{capitalizeFirst(user?.type)}</Typography>
        </Grid>
        <Grid item textAlign="right" xs={6}>
          <Typography fontWeight="bold" variant="h6">Status:</Typography>
        </Grid>
        <Grid item textAlign="left" xs={6}>
          <Typography variant="h6">{capitalizeFirst(user?.status)}</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Profile;
