import React, { useState, useEffect } from "react";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import * as legoData from "./party.json";
import * as doneData from "./done.json";
import Image from "next/image";

import FadeIn from "react-fade-in";

export default function InitialLoading() {
  // const [loading, setLoading] = useState();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: legoData.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptions2 = {
    loop: false,
    autoplay: true,
    animationData: doneData.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // useEffect(() => {
  //   setLoading(!loading);
  //   setTimeout(() => {
  //     setLoading(!loading);
  //   }, 5000);
  // }, [loading]);
  return (
    <Grid
      container
      direction="column"
      alignitems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item>
        <Grid container direction="column" alignItems="center" justify="center">
          {/* {loading ? ( */}
          <FadeIn>
            <Image
              src="/images/logo.png"
              alt="Picture of the author"
              width="300"
              height="150"
            />
          </FadeIn>

          {/* ) : (
            // <Lottie options={defaultOptions} height={300} width={300} />
            <div className="test">
            <Image
              src="/images/logo.png"
              alt="Picture of the author"
              width={500}
              height={100}
            />
          </div>
          )} */}
          {/* <ReactLoading type={"bars"} color={"#00AEEF"} loading={loading} /> */}
          {/* <ClimbingBoxLoader color={"#00AEEF"} loading={loading} size={50} /> */}
        </Grid>
      </Grid>
    </Grid>
  );
}
