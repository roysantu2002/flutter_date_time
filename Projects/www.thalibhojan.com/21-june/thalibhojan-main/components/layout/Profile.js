import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import { Paper, Box, Divider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
// import { signIn } from "../src/store/actions/authActions";
import { connect } from "react-redux";
import Router from "next/router";
import { isLoaded, isEmpty } from "react-redux-firebase/";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import SearchBar from "../common/SearchBar";
import MuiSnackbar from "../snackbar/MuiSnackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "../../styles/signin";
import { doProfileUpdate } from "../../store/actions/userActions";

import { useRouter } from "next/router";

import { useDispatch } from "react-redux";

import {
  showSuccessSnackbar,
  clearSnackbar,
} from "../../store/actions/snackbarActions";

function Profile(props) {
  const { classes, setOpenPopup } = props;
  const [profileData, setProfileData] = useState(false);
  const profile = useSelector((state) => state.firebase.profile);
  const auth = useSelector((state) => state.firebase.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const getFreshModelObject = () => ({
    fname: profile.fname || "",
    lname: profile.lname || "",
    email: profile.email || "",
    mobile: profile.mobile || "",
  });

  const { values, handleInputChange, errors, setErrors, resetForm } = useForm(
    getFreshModelObject,
    true
  );

  useEffect(() => {
    if (auth && auth.email !== "" && profile.mobile !== "") {
      setProfileData(true);
    }
    values.email = profile.email ? profile.email : "";
    values.mobile = profile.mobile ? profile.mobile : "";
    values.fname = profile.fname || "";
    values.lname = profile.lname || "";
  }, []);

  const uniqueDigit = (str) => {
    var a = 0;
    for (var i = 0; i < 10; i++) {
      new RegExp(i, "g").test(str) && a++;
    }
    return a;
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    console.log(fieldValues);

    if ("fname" in fieldValues)
      temp.fname = fieldValues.fname.length > 2 ? "" : "Name is requied.";

    if ("lname" in fieldValues)
      temp.lname = fieldValues.lname.length > 2 ? "" : "Name is requied.";

    if ("email" in fieldValues)
      temp.email = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
        fieldValues.email
      )
        ? ""
        : "Email is not valid.";

    if ("mobile" in fieldValues) {
      let valid = /^[3-9]\d\d*$/.test(fieldValues.mobile);

      temp.mobile =
        fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required.";

      temp.mobile =
        !valid || uniqueDigit(fieldValues.mobile) < 4
          ? "Invalid Phone number"
          : "";
    }

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  /* Handle Sign Up form submit */
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      try {
        setLoading(true);
        dispatch(doProfileUpdate(auth.uid, values));
        setLoading(false);
        dispatch(showSuccessSnackbar("Profile Updated"));
        setTimeout(() => {
          dispatch(clearSnackbar());
        }, 3000);
        setOpenPopup(false);
      } catch (error) {
        console.log(error);
        dispatch(showSuccessSnackbar("Please try again later"));
        setOpenPopup(false);
        setTimeout(() => {
          dispatch(clearSnackbar());
        }, 3000);
        setLoading(false);
      }
    }
  };

  return (
    // <Container component="main" style={{ justifyContent: "center" }}>
    //   <CssBaseline />
    //   <Grid container spacing={2} justify="center">
    //     <CssBaseline />
    <>
      <Typography> Update Profile</Typography>

      {loading ? (
        <CircularProgress color="secondary" size={50} />
      ) : (
        <>
          <SearchBar />
          <form className={classes.form} noValidate>
            <TextField
              required
              id="fname"
              label="First Name"
              name="fname"
              error={errors.fname && errors.fname.length !== 0}
              helperText={errors.fname}
              value={values.fname}
              inputProps={{
                maxLength: 40,
              }}
              autoFocus
              onChange={handleInputChange}
            />
            <TextField
              required
              id="lname"
              label="Last Name"
              name="lname"
              error={errors.lname && errors.lname.length !== 0}
              helperText={errors.lname}
              value={values.lname}
              inputProps={{
                maxLength: 40,
              }}
              autoFocus
              onChange={handleInputChange}
            />

            <TextField
              required
              id="email"
              label="Email Address"
              name="email"
              error={errors.email && errors.email.length !== 0}
              helperText={errors.email}
              value={values.email}
              inputProps={{
                maxLength: 40,
              }}
              autoFocus
              onChange={handleInputChange}
            />

            <TextField
              required
              id="mobile"
              label="Update Mobile"
              name="mobile"
              error={errors.mobile && errors.mobile.length !== 0}
              helperText={errors.mobile}
              value={values.mobile || ""}
              inputProps={{
                maxLength: 40,
              }}
              autoFocus
              onChange={handleInputChange}
            />

            {!profileData ? (
              <Box letterSpacing={2}>
                <Button
                  type="submit"
                  size="large"
                  className={classes.custombutton}
                  variant="contained"
                  // disabled={buttonState}
                  onClick={handleSubmit}
                >
                  UPDATE
                </Button>
              </Box>
            ) : (
              <Box letterSpacing={2}>
                <Button
                  type="submit"
                  size="large"
                  className={classes.custombutton}
                  variant="contained"
                  onClick={handleSubmit}
                >
                  EDIT PROFILE
                </Button>
              </Box>
            )}
          </form>
        </>
      )}
      {/* </Grid> */}
      <MuiSnackbar />
    </>
    // </Container>
  );
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Profile);
