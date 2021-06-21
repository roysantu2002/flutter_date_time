import React, { useState, useEffect } from "react";
import Link from "../../Link";
// import PropTypes from "prop-types";
import { AppBar, Button, Typography } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import { Tab } from "@material-ui/core";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles } from "@material-ui/core/styles";
// import { Typography } from "@material-ui/core/";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
// import Badge from "@material-ui/core/Badge";
// import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
// import Popup from "../modal/Popup";
import { useSelector, useDispatch } from "react-redux";
// import { loadState } from "../../utils/helpers";
// import { setWithExpiry, getWithExpiry } from "../../utils/helpers";
// import OrderList from "../order/OrderList";
// import { signOut } from "../../store/actions/authActions";
import PropTypes from "prop-types";
import useStyles from "./appBarStyle";
// import theme from "../constants/theme";

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const UserHeader = (props) => {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    props.setValue(newValue);
  };

  const routes = [
    {
      name: "home",
      tag: "home",
      link: "/",
      activeIndex: 0,
    },
    {
      name: "delivery",
      tag: "delivery",
      link: "/placeorder",
      activeIndex: 1,
    },

    {
      name: "takeaway",
      tag: "takeaway",
      link: "/placeorder",
      activeIndex: 2,
    },
    {
      name: "contact us",
      tag: "contact",
      link: "/contact",
      activeIndex: 3,
    },
  ];

  //   useEffect(() => {
  //     [...routes].forEach((route) => {
  //       switch (window.location.pathname) {
  //         case `${route.link}`:
  //           // console.log(route.name);
  //           if (props.value !== route.activeIndex) {
  //             props.setValue(route.activeIndex);
  //             console.log(props.value);
  //           }
  //           break;
  //         default:
  //           break;
  //       }
  //     });
  //   }, [props.value, props.activeIndex, routes, props]);

  const tabs = (
    <>
      <Tabs
        className={classes.tabContainer}
        indicatorColor="secondary"
        value={props.value}
        onChange={handleChange}
      >
        {routes.map((route, activeIndex) => (
          <Tab
            className={classes.tab}
            key={`${route}${activeIndex}`}
            component={Link}
            href={route.link}
            label={route.name}
            aria-owns={route.ariaowns}
            aria-haspopup={route.ariahaspopup}
            {...a11yProps(route.activeIndex)}
          />
        ))}
      </Tabs>
    </>
  );

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar
          style={{ margin: 0 }}
          position="sticky"
          className={classes.appbar}
        >
          <Toolbar disableGutters={false} margin="-10">
            {tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </React.Fragment>
  );
};

export default UserHeader;
