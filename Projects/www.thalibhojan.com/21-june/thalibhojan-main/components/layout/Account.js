import React, { useState } from "react";
import { IconButton, MenuItem, Menu, Popover } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import useStyles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import { getWithExpiry, getInitials } from "../../utils/helpers";
import { Avatar, Box, Paper } from "@material-ui/core/";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import Link from "../Link";
import { AiOutlineLogout } from "react-icons/ai";
import Popup from "../../components/modal/Popup";
import Profile from "./Profile";
// import { route } from "next/dist/next-server/server/router";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    // zIndex: 2,
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformorigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.secondary.dark,
      },
    },
  },
}))(MenuItem);

function Account(props) {
  const { auth, profile, router, user } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const [openPopup, setOpenPopup] = useState(false);
  const [title, setTitle] = useState("Account");

  const openInPopup = () => {
    setOpenPopup(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignout = () => {
    dispatch(signOut());
    router.push("/");
  };

  console.log(auth);
  return (
    <>
      {auth && auth.uid ? (
        <IconButton
          aria-label={auth && auth.displayName ? auth.displayName : "Guest"}
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleClick}
          color="primary"
        >
          <Box display="flex" style={{ justifyContent: "center" }}>
            <Box p={1}>
              <Avatar className={classes.avtar}>
                {getInitials(auth && auth.displayName ? auth.displayName : "Guest")}
              </Avatar>

              <div style={{ display: "flex", justifyContent: "row" }}>
                {" "}
                <Typography variant="subtitle2"> Welcome, </Typography>{" "}
                <Typography color="textPrimary" variant="h4">
                  &nbsp; {auth && auth.displayName ? auth.displayName : "Guest"}
                </Typography>
              </div>
              <Typography color="textPrimary">
                {profile && profile.email ? profile.email : ""}{" "}
              </Typography>
            </Box>
          </Box>
        </IconButton>
      ) : null}
      {auth && auth.uid.length ? (
        <StyledMenu
          disableScrollLock={true}
          variant="menu"
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <StyledMenuItem>
            <ListItemIcon>
              <AccountBoxIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="Account"
              onClick={() => {
                openInPopup();
                setTitle(title);
              }}
            />
          </StyledMenuItem>
          <Link href="/orders">
            <StyledMenuItem>
              <ListItemIcon>
                <ListAltIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Orders</ListItemText>
            </StyledMenuItem>
          </Link>

          <StyledMenuItem
            onClick={() => {
              handleSignout();
            }}
          >
            <ListItemIcon>
              {/* <Button
                onClick={() => {
                  handleSignout();
                }}
              > */}
              <AiOutlineLogout fontSize="small" />
              {/* </Button> */}
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </StyledMenuItem>
        </StyledMenu>
      ) : null}
      <Popup title={title} openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <Profile setOpenPopup={setOpenPopup} />
      </Popup>
    </>
  );
}

export default Account;
