import React, { useState } from "react";
import axios from "axios";
import * as Constants from "../config/constants";
import { useNavigate } from "react-router-dom";

function Refresh() {
  const navigator = useNavigate();

  const res = "";

  if (localStorage.getItem("user1").length <= 0) {
    alert("Please Login first");
    navigator("/");
  }

  const ref_token = JSON.parse(localStorage.getItem("user1")).data.refresh;

  var data = {
    refresh: ref_token,
  };

  async function getToken(dat) {
    const res1 = await axios.post(`${Constants.API_URL}/v1/token/refresh`, dat);
    return res1;
  }
  if (ref_token.length > 0) {
    // .then((result) => {
    //   console.log(result);
    //   if (result.status == 200) {
    //     res = result.data.access;
    //   }
    //   var curr = localStorage.getItem("user1");
    //   curr["access"] = res;
    //   localStorage.setItem("user1", curr);

    //   // <h1>Your token has been refreshed</h1>;
    // })
    // .then((err) => console.error(err));
    console.log(res);

    return <h1>Your token has been refreshed</h1>;
  } else {
    return <h1>Please login first</h1>;
  }
}

export default Refresh;
