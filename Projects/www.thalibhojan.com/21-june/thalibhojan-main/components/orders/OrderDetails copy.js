import React, { useState } from "react";
import { Grid, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import {
  ORDER_PLACED,
  ORDER_ACCEPTED,
  ORDER_CANCELLED,
  ORDER_OUT_FOR_DELIVERY,
} from "../../constants/constant";
import { PieChart } from "react-minimal-pie-chart";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  spaceTypo: {
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
  },
}));

const OrderDetails = (props) => {
  const classes = useStyles();
  const { orders } = props;

  const placedCount = () => {
    let placedCount = 0;
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].status.toString().toLowerCase() === ORDER_PLACED)
        placedCount++;
    }
    return placedCount;
  };

  const acceptedCount = () => {
    let acceptedCount = 0;
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].status.toString().toLowerCase() === ORDER_ACCEPTED)
        acceptedCount++;
    }
    return acceptedCount;
  };
  const cancelledCount = () => {
    let cancelledCount = 0;
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].status.toString().toLowerCase() === ORDER_CANCELLED)
        cancelledCount++;
    }
    return cancelledCount;
  };

  const otForDeliveryCount = () => {
    let otForDeliveryCount = 0;
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].status.toString().toLowerCase() === ORDER_OUT_FOR_DELIVERY)
        otForDeliveryCount++;
    }
    return otForDeliveryCount;
  };

  return (
    <Grid item xs={12}>
      <Grid
        container
        spacing={2}
        style={{
          padding: 10,
          marginTop: 10,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
          margin: "auto",
        }}
      >
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <div className={classes.spaceTypo}>
              <Typography component="div" variant="body1">
                <Box
                  bgcolor="primary.main"
                  p={2}
                  alignItems="stretch"
                  border={2}
                >
                  <Typography variant="h3" color="secondary.main">
                    Today's Order{" "}
                  </Typography>
                </Box>
                <Box
                  bgcolor="primary.main"
                  p={2}
                  alignItems="stretch"
                  border={2}
                >
                  <Typography variant="h2" color="secondary.main">
                    {orders.length}{" "}
                  </Typography>
                </Box>
              </Typography>

              <Box p={1} alignItems="stretch"></Box>

              <Typography component="div" variant="body1">
                <Box
                  bgcolor="primary.main"
                  p={2}
                  alignItems="stretch"
                  border={2}
                >
                  <Typography variant="h3" color="secondary.main">
                    {ORDER_PLACED.toUpperCase()}{" "}
                  </Typography>
                </Box>
                <Box
                  bgcolor="primary.main"
                  p={2}
                  alignItems="stretch"
                  border={2}
                >
                  <Typography variant="h2" color="secondary.main">
                    {placedCount()}
                  </Typography>
                </Box>
              </Typography>
            </div>
          </Paper>
        </Grid>

        {/* Accepted and Cancelled */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <div className={classes.spaceTypo}>
              <Typography component="div" variant="body1">
                <Box
                  bgcolor="success.main"
                  p={2}
                  alignItems="stretch"
                  border={2}
                >
                  <Typography variant="h3" color="secondary.main">
                    {ORDER_ACCEPTED.toUpperCase()}{" "}
                  </Typography>
                </Box>
                <Box
                  bgcolor="primary.main"
                  p={2}
                  alignItems="stretch"
                  border={2}
                >
                  <Typography variant="h2" color="secondary.main">
                    {acceptedCount()}
                  </Typography>
                </Box>
              </Typography>

              <Box p={1} alignItems="stretch"></Box>

              <Typography component="div" variant="body1">
                <Box
                  bgcolor="error.main"
                  p={2}
                  alignItems="stretch"
                  border={2}
                >
                  <Typography variant="h3" color="secondary.main">
                    {ORDER_CANCELLED}
                  </Typography>
                </Box>
                <Box
                  bgcolor="primary.main"
                  p={2}
                  alignItems="stretch"
                  border={2}
                >
                  <Typography variant="h2" color="secondary.main">
                    {cancelledCount()}
                  </Typography>
                </Box>
              </Typography>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <div className={classes.spaceTypo}>
            <Typography component="div" variant="body1">
              <Box bgcolor="primary.main" p={1} m={1} alignItems="stretch">
                {" "}
                {ORDER_PLACED.toUpperCase()}{" "}
              </Box>
              <Box bgcolor="primary.main" p={1} m={1} alignItems="stretch">
                {placedCount()}
              </Box>
            </Typography>

            {/* <Box bgcolor="primary.main" p={1} m={1} alignItems="stretch">
              <Typography variant="h3">
                {ORDER_PLACED.toUpperCase()}{" "}
              </Typography>
              <Typography variant="h3">{placedCount()} </Typography>
            </Box> */}
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className={classes.spaceTypo}>
            <Typography component="div" variant="h3">
              <Box bgcolor="error.main" p={1} m={1} alignItems="stretch">
                {ORDER_CANCELLED.toUpperCase()}{" "}
              </Box>
              <Box bgcolor="error.main" p={1} m={1} alignItems="stretch">
                {cancelledCount()}
              </Box>
            </Typography>
          </div>

          {/* <div className={classes.spaceTypo}>
            <Box bgcolor="error.main" p={1} m={1} alignItems="stretch">
              <Typography variant="h3">
                {ORDER_CANCELLED.toUpperCase()}{" "}
              </Typography>
              <Typography variant="h3">{cancelledCount()} </Typography>
            </Box>
          </div> */}
        </Grid>
        <Grid item xs={6}>
          <div className={classes.spaceTypo}>
            <Typography component="div" variant="h3">
              <Box bgcolor="success.main" p={1} m={1} alignItems="stretch">
                {ORDER_ACCEPTED.toUpperCase()}{" "}
              </Box>
              <Box bgcolor="success.main" p={1} m={1} alignItems="stretch">
                {acceptedCount()}
              </Box>
            </Typography>
          </div>
          {/* 
          <div className={classes.spaceTypo}>
            <Box bgcolor="success.main" p={1} m={1}>
              <Typography variant="h3">
                {ORDER_ACCEPTED.toUpperCase()}{" "}
              </Typography>
              <Typography variant="h3">{acceptedCount()} </Typography>
            </Box>
          </div> */}
        </Grid>
        <Grid item xs={6}>
          <div className={classes.spaceTypo}>
            <Typography component="div" variant="h3">
              <Box bgcolor="primary.light" p={1} m={1} alignItems="stretch">
                {ORDER_OUT_FOR_DELIVERY.toUpperCase()}{" "}
              </Box>
              <Box bgcolor="primary.light" p={1} m={1} alignItems="stretch">
                {otForDeliveryCount()}
              </Box>
            </Typography>
          </div>

          {/* <div className={classes.spaceTypo}>
            <Box bgcolor="primary.light" p={1} m={1}>
              <Typography variant="h3">
                {ORDER_OUT_FOR_DELIVERY.toUpperCase()}{" "}
              </Typography>

              <Typography variant="h3">{otForDeliveryCount()} </Typography>
            </Box>
          </div> */}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OrderDetails;
