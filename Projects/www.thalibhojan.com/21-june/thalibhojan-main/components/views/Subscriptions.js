import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CardBase from "./CardBase";
import { Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Link from "../Link";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector, useDispatch } from "react-redux";
import CardActions from "@material-ui/core/CardActions";
import { Card, Button } from "../controls";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    display: "flex",
    overflow: "hidden",
  },
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(5),
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  images: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexWrap: "wrap",
  },

  imageWrapper: {
    position: "relative",
    display: "block",
    padding: 0,
    borderRadius: 0,
    height: "40vh",
    [theme.breakpoints.down("sm")]: {
      width: "100% !important",
      height: 100,
    },
    "&:hover": {
      zIndex: 1,
    },
    "&:hover $imageBackdrop": {
      opacity: 0.15,
    },
    "&:hover $imageMarked": {
      opacity: 0,
    },
    "&:hover $imageTitle": {
      border: "4px solid currentColor",
    },
  },
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignitems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create("opacity"),
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 14px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
});

function Subscriptions(props) {
  const { classes, thalis, search, onInputChange } = props;
  const auth = useSelector((state) => state.firebase.auth);

  return (
    <section className={classes.root}>
      <Container className={classes.container} spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h2" marked="center">
          Subscriptions
          </Typography>
        </Grid>
        <Box m={2}></Box>

        <Box m={2}></Box>
        <Grid item sm={12}>
          <Grid container justify="center" spacing={2}>
            {thalis.length &&
              thalis.map((data) =>
                isLoaded(auth) && !isEmpty(auth) ? (
                  <Card
                    key={data.id}
                    id={data.id}
                    url={data.url}
                    name={data.name}
                    title={data.title}
                    desc={data.desc}
                    varient="h6"
                  >
                    <CardActions disableSpacing>
                      <Link
                        href="/menu/[title]"
                        as={`/menu/${data.title}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Button>Options</Button>
                      </Link>
                    </CardActions>
                  </Card>
                ) : (
              
                    <Card
                      key={data.id}
                      id={data.id}
                      url={data.url}
                      name={data.name}
                      title={data.title}
                      desc={data.desc}
                      varient="h6"
                    >
                      <CardActions disableSpacing>
                    <Link
                        href="/menu/[title]"
                        as={`/menu/${data.title}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Button>Login to View</Button>
                      </Link>
                      </CardActions>
                      </Card>
                )
              )}
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

// Subscriptions.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(Subscriptions);
