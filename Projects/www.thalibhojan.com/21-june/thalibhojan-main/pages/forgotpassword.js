import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { InputAdornment, Typography, IconButton } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import {
  showSuccessSnackbar,
  clearSnackbar,
} from "../store/actions/snackbarActions";
import Router from "next/router";
import MuiSnackbar from "../components/snackbar/MuiSnackbar";

import Box from "@material-ui/core/Box";
import { useForm } from "../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../store/actions/authActions";
import useStyles from "../styles/loginPage";
import theme from "../constants/theme";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Logo from "../components/logo/Logo";

// const initialFValues = () => ({
//   email: ""
// });

// const useStyles = makeStyles((theme) => ({
//   root: {
//     marginTop: theme.spacing(8),
//     marginBottom: theme.spacing(8),
//   },
//   paper: {
//     ...theme.mixins.gutters(),
//     marginTop: theme.spacing(8),
//     borderRadius: 10,
//     padding: 50,
//     display: "flex",
//     flexDirection: "column",
//     alignitems: "center",
//     marginBottom: theme.spacing(10),
//     height: "50vh",
//   },
//   avatar: {
//     margin: theme.spacing(2),
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.primary.dark,
//   },
//   custombutton: {
//     background: theme.palette.primary.main,
//     borderRadius: 3,
//     border: 0,
//     color: "white",

//     width: "100%",
//     padding: "1 30px",
//     "&:hover": {
//       backgroundColor: theme.palette.primary.dark,
//     },
//   },
//   form: {
//     "& > *": {
//       width: "100%", // Fix IE 11 issue.
//       height: "300",
//       paddingTop: theme.spacing(1),
//       paddingBottom: theme.spacing(3),
//     },
//   },
//   logo: {
//     maxWidth: "10em",
//     marginLeft: "2px",
//     [theme.breakpoints.down("md")]: {
//       maxWidth: "9em",
//       marginLeft: "-.5em",
//     },
//     [theme.breakpoints.down("xs")]: {
//       maxWidth: "8em",
//     },
//     margin: ".5em",
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

const getFreshModelObject = () => ({
  email: "",
});

function ForgotPassword() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [buttonState, setbuttonState] = useState(true);
  const [showPassword, setShowPassword] = useState(true);

  const { values, handleInputChange, errors, setErrors, resetForm } = useForm(
    getFreshModelObject,
    true
  );

  const handleClickShowPassword = () => {
    setShowPassword((prevState) => ({
      showPasswordValue: !prevState.showPasswordValue,
    }));
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    console.log(fieldValues);
    if ("email" in fieldValues)
      temp.email = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
        fieldValues.email
      )
        ? ""
        : "Email is not valid.";

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");

    // if (temp.email === "") {
    //   setbuttonState(false);
    // } else {
    //   setbuttonState(true);
    // }
  };

  console.log(values);

  /* Handle Sign Up form submit */
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(validate());
    if (validate()) {
      dispatch(resetPassword(values.email));
      resetValidate();
    }
  };

  const resetError = useSelector((state) => state.auth.resetError);

  const resetValidate = () => {
    console.log(`reset password error ${resetError}`);

    if (resetError && resetError.length) {
      dispatch(showSuccessSnackbar(resetError));
      resetForm();
      setTimeout(() => {
        dispatch(clearSnackbar());
      }, 3000);
    } else {
      dispatch(showSuccessSnackbar("Please check your email!"));
      resetForm();
      setTimeout(() => {
        dispatch(clearSnackbar());
      }, 3000);
      Router.push("/");
    }
  };

  return (
    <Container
      component="main"
      maxWidth="md"
      style={{ justifyContent: "center" }}
    >
      <CssBaseline />
      <Grid container spacing={2} justify="center" className={classes.root}>
        <Grid
          item
          xs={12}
          md={6}
          style={{
            borderRadius: 2,
            margin: 4,
            backgroundColor: theme.palette.primary.main,
          }}
        >
          <Paper className={classes.paper} elevation={2}>
            <Logo />

            <div
              className={classes.div}
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "25px",
              }}
            >
              <Typography variant="h2" gutterBottom align="center">
                Reset password?
              </Typography>
            </div>
            {/* <ToastContainer position="top-center" autoClose={2000} /> */}
            <form className={classes.form} noValidate>
              <TextField
                required
                id="email"
                label="Email Address"
                name="email"
                error={errors.email && errors.email.length !== 0}
                helperText={errors.email}
                value={values.email || ""}
                autoFocus
                onChange={handleInputChange}
                InputProps={{
                  maxLength: 40,
                }}
              />
              <Box letterSpacing={2}>
                <Button
                  type="submit"
                  size="large"
                  className={classes.custombutton}
                  variant="contained"
                  // disabled={buttonState}
                  onClick={handleSubmit}
                >
                  Send reset link
                </Button>
              </Box>
            </form>
          </Paper>
          <MuiSnackbar transition="fade" />
        </Grid>
      </Grid>
    </Container>
  );
}

export default withStyles(useStyles, { withTheme: true })(ForgotPassword);
