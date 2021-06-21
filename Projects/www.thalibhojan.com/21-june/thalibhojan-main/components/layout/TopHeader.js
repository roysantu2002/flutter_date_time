import React, { useState, useEffect } from "react";
// import Link from "../Link";

import Link from "@material-ui/core/Link";
import PropTypes from "prop-types";
import { Avatar, AppBar, StepContent, Drawer } from "@material-ui/core/";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import PhoneIcon from "@material-ui/icons/Phone";
import HomeIcon from "@material-ui/icons/Home";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";
import LockIcon from "@material-ui/icons/Lock";
import { signOut } from "../../store/actions/authActions";
// import { signOut } from "../../src/store/actions/authActions";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
// import Fab from "@material-ui/core/Fab";
// import AddIcon from "@material-ui/icons/Add";
import { Badge, Divider, Hidden } from "@material-ui/core";
// import Popup from "../modal/Popup";
// import OrderList from "../order/OrderList";
import { getWithExpiry, getInitials } from "../../utils/helpers";
import Account from "./Account";
// import { MenuItem } from "@material-ui/core";
import { roundTo2DecimalPoint } from "../../utils/helpers";
import { AiOutlineLogout } from "react-icons/ai";

import { useRouter } from "next/router";
import Logo from "../logo/Logo";

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

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`scrollable-force-tabpanel-${index}`}
//       aria-labelledby={`scrollable-force-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box p={3}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toobarMargin: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.down("md")]: {
      marginBottom: "1em",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25em",
    },
  },
  logo: {
    maxWidth: "12em",
    marginLeft: "2px",
    [theme.breakpoints.down("md")]: {
      maxWidth: "8em",
      marginLeft: "-.5em",
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: "7em",
    },
    margin: ".5em",
  },
  logoContainer: {
    padding: 2,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },

  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
  },
  menu: {
    borderRadius: "0px",
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },
  circle: {
    borderRadius: "25px",
  },
  drawerIconContainer: {
    color: theme.palette.primary.dark,

    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawerIcon: {
    margin: 3,

    height: "20px",
    width: "20px",
  },
  drawer: {
    backgroundColor: "White",
    width: drawerWidth,

    [theme.breakpoints.down("sm")]: {
      width: drawerWidth,
      height: "auto",
      flexShrink: 10,
    },
    [theme.breakpoints.down("md")]: {
      width: drawerWidth,
      height: 500,
      flexShrink: 0,
    },
  },
  drawerItem: {
    ...theme.typography.subtitle2,
    opacity: 0.7,
  },
  drawerItemSelected: {
    "& .MuiListItemText-root": {
      opacity: 1,
    },
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appbar: {
    [theme.breakpoints.down("md")]: {
      width: "xs",
    },
    backgroundColor: theme.palette.common.white,
    zIndex: theme.zIndex.modal - 1,
  },
  avtar: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.dark,
  },
  customButton: {
    // margin: theme.spacing(2),
    // borderRadius: 50,
    // width: 110,
    textTransform: "uppercase!important;",
    fontSize: ".8rem",

    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

export default function TopHeader(props) {
  const auth = useSelector((state) => state.firebase.auth);
  const profile = useSelector((state) => state.firebase.profile);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  let storeItems = useSelector((state) => state.storeItems);
  // const [total, setTotal] = useState(0);
  let total = useSelector((state) => state.storeItems.total);
  const router = useRouter();

  // useEffect(() => {
  //   let gTotal = storeItems.addedItems.reduce((tempTotal, item) => {
  //     return tempTotal + item.quantity * item.price;
  //   }, 0);
  //   setTotal(roundTo2DecimalPoint(gTotal));

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [JSON.stringify(storeItems.addedItems)]);

  // console.log(total);
  // const localAddedItems = addedItems & addedItems.length ?  getWithExpiry("addedItems") : []

  // const dispatch = useDispatch();

  // const active = href ? !!matchPath({
  //   path: href,
  //   end: false
  // }, location.pathname) : false;

  const classes = useStyles();
  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [openDrawer, setOpenDrawer] = useState(false);
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  // const [openPopup, setOpenPopup] = useState(false);
  const [title, setTitle] = useState("Checkout");

  console.log(auth);

  const handleSignout = () => {
    dispatch(signOut());
    router.push("/");
  };

  const user = {
    email: profile.email,
    name: profile.fname,
    uid: auth.uid,
  };

  const basicUser = {
    email: "",
    name: "GUEST!",
    uid: "",
  };

  // const openInPopup = () => {
  //   setOpenPopup(true);
  // };

  const userRoutes = [
    {
      name: "Home",
      link: "/",
      icon: <HomeIcon />,
      activeIndex: 0,
    },
    {
      name: "Menu",
      link: "/placeorder",
      icon: <HomeIcon />,
      activeIndex: 1,
    },
    {
      name: "Order",
      link: "/placeorder",
      icon: <PhoneIcon />,
      activeIndex: 2,
    },

    {
      name: "Covid Special",
      icon: <PhoneIcon />,
      link: "/covidspecial",
      activeIndex: 3,
    },
    {
      name: "Orders",
      link: "/orders",
      icon: <PhoneIcon />,
      activeIndex: 4,
    },
    {
      name: "Contact Us",
      link: "/contactus",
      icon: <PhoneIcon />,
      activeIndex: 5,
    },
  ];

  const sellerRoutes = [
    {
      name: "Home",
      link: "/",
      icon: <HomeIcon />,
      activeIndex: 0,
    },
    {
      name: "Dashboard",
      link: "/sellerdashboard",
      icon: <HomeIcon />,
      activeIndex: 1,
    },

    {
      name: "Orders",
      link: "/orders",
      icon: <PhoneIcon />,
      activeIndex: 2,
    },
    {
      name: "Contact Us",
      link: "/contactus",
      icon: <PhoneIcon />,
      activeIndex: 6,
    },
  ];

  const basicRoutes = [
    {
      name: "Home",
      link: "/",
      icon: <HomeIcon />,
      activeIndex: 0,
    },
    {
      name: "Register",
      link: "/signup",
      icon: <PhoneIcon />,
      activeIndex: 2,
    },
    {
      name: "Contact Us",
      link: "/contact",
      icon: <PhoneIcon />,
      activeIndex: 6,
    },
  ];

  const userContent = (
    <>
      <Box m={1} p={1}>
        <Account auth={auth} profile={profile} router={router} />

        <Divider />
        <Box display="flex" bgcolor="White">
          <List>
            {userRoutes.map((item) => (
              <div key={item.activeIndex}>
                <ListItem>
                  <Button
                    onClick={() => {
                      setOpenDrawer(false);
                    }}
                    // selected={item.activeIndex}
                    // classes={{ selected: classes.drawerItemSelected }}
                    // component={Link}
                    // style={{
                    //   color: "text.secondary",
                    //   fontWeight: "medium",
                    //   justifyContent: "flex-start",
                    //   letterSpacing: 1,
                    //   py: 1.25,
                    //   textTransform: "none",
                    //   width: "100%",
                    //   ...(item.activeIndex && {
                    //     color: "primary.main",
                    //   }),
                    //   "& svg": {
                    //     mr: 1,
                    //   },
                    // }}
                    href={item.link}
                  >
                    <span className={classes.drawerItem}>{item.name}</span>
                  </Button>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </Box>

        <Typography align="center" variant="body2"></Typography>
        <Box display="flex" style={{ justifyContent: "center" }} m={1} p={1}>
          <Button
            onClick={() => {
              handleSignout();
            }}
            variant="contained"
            style={{
              backgroundColor: theme.palette.secondary.main,
              color: "white",

              borderRadius: 0,
            }}
            className={classes.button}
            startIcon={<AiOutlineLogout />}
          >
            LOGOUT
          </Button>
        </Box>
      </Box>
    </>
  );

  const userDrawer = (
    <>
      {" "}
      <ElevationScroll>
        <AppBar
          style={{ margin: 0 }}
          position="sticky"
          className={classes.appbar}
        >
          <Toolbar disableGutters={false}>
            <Drawer
              // className={classes.drawer}
              // openSecondary={true}
              open={openDrawer}
              onClose={() => setOpenDrawer(false)}
              // onOpen={() => setOpenDrawer(true)}
            >
              {userContent}
            </Drawer>

            <IconButton
              className={classes.drawerIconContainer}
              color="secondary"
              onClick={() => setOpenDrawer(!openDrawer)}
              disableRipple
            >
              <MenuIcon className={classes.drawerIcon} />
            </IconButton>
            <Logo />

            <Box mx="auto"></Box>
            <Box mx="auto"></Box>
            {storeItems.addedItems && storeItems.addedItems.length ? (
              <div style={{ margin: 0 }}>
                <Badge
                  color="primary"
                  badgeContent={
                    storeItems.addedItems && storeItems.addedItems.length
                  }
                >
                  <ShoppingCartIcon color="primary" />
                </Badge>
                <Typography>{"\u20B9 " + total}</Typography>
              </div>
            ) : null}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </>
  );

  {
    /* // <ListItem key={item.activeIndex}>
              //   <Button */
  }
  //     onClick={() => {
  //       setOpenDrawer(false);
  //     }}
  //     component={Link}
  //     // style={{
  //     //   color: "text.secondary",
  //     //   fontWeight: "medium",
  //     //   justifyContent: "flex-start",
  //     //   letterSpacing: 1,
  //     //   py: 1.25,
  //     //   textTransform: "none",
  //     //   width: "100%",
  //     //   ...(item.activeIndex && {
  //     //     color: "primary.main",
  //     //   }),
  //     //   "& svg": {
  //     //     mr: 1,
  //     //   },
  //     // }}
  //     href={item.link}
  //   >
  //     <span className={classes.drawerItem}>{item.name}</span>
  //   </Button>

  const sellerContent = (
    <>
      <Box m={1} p={1}>
        <Account auth={auth} profile={profile} router={router} />

        <Divider />
        <Box display="flex" bgcolor="White">
          <List component="nav">
            {sellerRoutes.map((item) => (
              <ListItem
                key={item.name}
                component={Link}
                href={item.link}
                onClick={() => {
                  setOpenDrawer(false);
                }}
              >
                <Typography variant="h6">{item.name}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>

        <Typography align="center" variant="body2"></Typography>
        <Box display="flex" style={{ justifyContent: "center" }} m={1} p={1}>
          <Button
            color="primary"
            component="a"
            onClick={() => {
              handleSignout();
            }}
            variant="contained"
          >
            LOGOUT
          </Button>
        </Box>
      </Box>
    </>
  );

  const sellerDrawer = (
    <>
      {" "}
      <ElevationScroll>
        <AppBar
          style={{ margin: 0 }}
          position="sticky"
          className={classes.appbar}
        >
          <Toolbar disableGutters={false}>
            <Drawer
              // className={classes.drawer}
              // openSecondary={true}
              open={openDrawer}
              onClose={() => setOpenDrawer(false)}
              // onOpen={() => setOpenDrawer(true)}
            >
              {sellerContent}
            </Drawer>

            <IconButton
              className={classes.drawerIconContainer}
              color="secondary"
              onClick={() => setOpenDrawer(!openDrawer)}
              disableRipple
            >
              <MenuIcon className={classes.drawerIcon} />
            </IconButton>
            <Logo/>

            <Box mx="auto"></Box>
            <Box mx="auto"></Box>
            {storeItems.addedItems && storeItems.addedItems.length ? (
              <div style={{ margin: 0 }}>
                <Badge
                  color="primary"
                  badgeContent={
                    storeItems.addedItems && storeItems.addedItems.length
                  }
                >
                  <ShoppingCartIcon color="primary" />
                </Badge>
                <Typography>{"\u20B9 " + total}</Typography>
              </div>
            ) : null}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </>
  );

  const basicContent = (
    <>
      <Box m={1} p={1}>
        <IconButton
          aria-label={profile && profile.fname ? profile.fname : "Guest"}
          aria-controls="menu-appbar"
          aria-haspopup="true"
          disabled
          color="primary"
        >
          <Box display="flex" style={{ justifyContent: "center" }}>
            <Box p={1}>
              <Avatar className={classes.avtar}>
                {getInitials(profile && profile.fname ? profile.fname : "G")}
              </Avatar>

              <div style={{ display: "flex", justifyContent: "row" }}>
                {" "}
                <Typography variant="subtitle2"> Welcome, </Typography>{" "}
                <Typography color="textPrimary" variant="h4">
                  &nbsp; {profile && profile.fname ? profile.fname : "Guest"}
                </Typography>
              </div>
              <Typography color="textPrimary">
                {profile && profile.email ? profile.email : ""}{" "}
              </Typography>
            </Box>
          </Box>
        </IconButton>

        <Divider />
        <List component="nav">
          <ListItem
            component={Link}
            href="/"
            onClick={() => {
              setOpenDrawer(false);
            }}
          >
            <Typography variant="h6">SIGN IN</Typography>
          </ListItem>
        </List>

        <Divider />
        <Box display="flex" bgcolor="White">
          <List>
            {basicRoutes.map((item) => (
              <ListItem
                button
                component={Link}
                color="primary"
                key={item.activeIndex}
                onClick={() => {
                  setOpenDrawer(false);
                }}
                href={item.link}
              >
                <Typography variant="h6">{item.name}</Typography>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
        <List>
          <ListItem
            key="0"
            onClick={() => {
              setOpenDrawer(false);
            }}
          >
            <Link href="/feedback">
              <Typography variant="h6">FEEDBACK</Typography>
            </Link>
          </ListItem>
        </List>
      </Box>
    </>
  );

  const basicrDrawer = (
    <>
      {" "}
      <ElevationScroll>
        <AppBar
          style={{ margin: 0 }}
          position="sticky"
          className={classes.appbar}
        >
          <Toolbar disableGutters={false}>
            <Drawer
              // className={classes.drawer}
              // openSecondary={true}
              open={openDrawer}
              onClose={() => setOpenDrawer(false)}
              // onOpen={() => setOpenDrawer(true)}
            >
              {basicContent}
            </Drawer>
            {/* 
            <Button onClick={() => setOpenDrawer(!openDrawer)}> */}
            <IconButton
              className={classes.drawerIconContainer}
              color="secondary"
              disableRipple
              onClick={() => setOpenDrawer(!openDrawer)}
            >
              <MenuIcon className={classes.drawerIcon} />
            </IconButton>
           <Logo/>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </>
  );

  const normalScreen = (
    <React.Fragment>
      <ElevationScroll>
        <AppBar
          style={{ margin: 0 }}
          position="static"
          className={classes.appbar}
        >
          <Toolbar disableGutters={false}>
          <Logo/>
            <Box mx="auto" alignitems="right"></Box>
            <Box mx="auto" alignitems="right"></Box>

            {auth.uid ? (
              <Box>
                <Account auth={auth} profile={profile} router={router} />
              </Box>
            ) : null}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </React.Fragment>
  );

  const appBarShow = auth.uid
    ? profile.role === "ROLE_SELLER"
      ? sellerDrawer
      : userDrawer
    : basicrDrawer;

  return <React.Fragment>{matches ? appBarShow : normalScreen}</React.Fragment>;
}
