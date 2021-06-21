import React, { useState } from "react";
import { IconButton, MenuItem, Menu, Popover } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import useStyles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    zIndex: 2,
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
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
  const { user } = props;
  const [openMenu, setOpenMenu] = useState(false);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //   return (
  //     const [anchorEl, setAnchorEl] = React.useState(null);

  //     const handleClick = (event) => {
  //       setAnchorEl(event.currentTarget);
  //     };

  //     const handleClose = () => {
  //       setAnchorEl(null);
  //     };

  return (
    <Popover>
      <IconButton
        aria-label={user}
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleClick}
        color="primary"
      >
        <AccountCircle className={classes.accountIcon} />
      </IconButton>
      {/* <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          Open Menu
        </Button> */}
      <StyledMenu
        variant= "menu"
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Sent mail" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <DraftsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <InboxIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </StyledMenuItem>
      </StyledMenu>
      </Popover>


    {/* //     aria-label={user}
    //     aria-controls="menu-appbar"
    //     aria-haspopup="true"
    //     onClick={handleClick}
    //     color="primary"
    //   >
    //     <AccountCircle className={classes.accountIcon} />
    //   </IconButton>
    //   <Menu */}
    {/* //     id="account-menu"
    //     anchorEl={anchorEl}
    //     keepMounted
    //     open={Boolean(anchorEl)}
    //     onClose={handleClose}
    //   >
    //     <MenuItem onClick={handleClose}>Profile</MenuItem>
    //   </Menu>
    // </> */}
  );
}

export default Account;
