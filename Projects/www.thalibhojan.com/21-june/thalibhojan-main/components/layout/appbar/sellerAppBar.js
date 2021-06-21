import React, { useState, useEffect } from "react";
import Link from "../../Link";
import { AppBar } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import { Tab } from "@material-ui/core";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import useStyles from "./appBarStyle";

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

const SellerHeader = (props) => {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    props.setValue(newValue);
  };

  const sellerRoutes = [
    {
      name: "Home",
      link: "/",
      activeIndex: 0,
    },
    {
      name: "Dashboard",
      link: "/sellerdashboard",
      activeIndex: 1,
    },
    {
      name: "Orders",
      link: "/orders",
      activeIndex: 2,
    },
    {
      name: "contact us",
      link: "/contact",
      activeIndex: 3,
    },
  ];

  const tabs = (
    <>
      <Tabs
        className={classes.tabContainer}
        indicatorColor="secondary"
        value={props.value}
        onChange={handleChange}
      >
        {sellerRoutes.map((route, activeIndex) => (
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

export default SellerHeader;
