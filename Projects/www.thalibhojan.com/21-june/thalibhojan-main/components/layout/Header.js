import React, { useState } from "react";
import Link from "../Link";
// import PropTypes from "prop-types";
import { AppBar, Button } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import useStyles from "./appbar/appBarStyle";
import UserHeader from "./appbar/userAppBar";
import SellerHeader from "./appbar/sellerAppBar";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


const Header = (props) => {
  const auth = useSelector((state) => state.firebase.auth);
  const firebase = useSelector((state) => state.firebase);
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const { setValue, value } = props;

  const appBarShow = auth.uid ? (
    firebase.profile.role === "ROLE_SELLER" ? (
      <SellerHeader setValue={setValue} value={value} />
    ) : (
      <UserHeader setValue={setValue} value={value} />
    )
  ) : (
    <AppBar position="sticky" className={classes.appbar}>
      <Toolbar>
      <div className={classes.tabContainer}>
        <div className={classes.spaceTypo}>
        <Link href="/">
            <Button className={classes.spaceTypo} variant="outlined">Home</Button>
          </Link>
          <Link href="/signin">
            <Button className={classes.spaceTypo} variant="outlined">Login</Button>
          </Link>
          <Link href="/signup">
            <Button className={classes.spaceTypo} variant="outlined">
              Register
            </Button>
          </Link>
        </div>
      </div>
      </Toolbar>
    </AppBar>
  );

  return matches ? null : appBarShow;
};

export default Header;
