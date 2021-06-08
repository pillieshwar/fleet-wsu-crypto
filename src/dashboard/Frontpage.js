import React from "react";
import "./../App.css";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import DoneIcon from "@material-ui/icons/Done";
import Paper from "@material-ui/core/Paper";
import Web3 from "web3";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  paper: {
    padding: theme.spacing(12),
    textAlign: "center",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  paperstyle: {
    height: "150%",
  },
}));

export default function Frontpage() {
  const classes = useStyles();

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const connectMetamask = async () => {
    if (window.ethereum) {
      await window.ethereum.enable();
      const web3new = new Web3(window.ethereum);
      const accounts = await web3new.eth.getAccounts();
      console.log(accounts);
    }
  };

  return (
    <div className={classes.root}>
      <Container fixed>
        <Grid container justify-xs-center spacing={3}>
          {/* <Grid item xs={12}>
                <Paper className={classes.paper}>xs=12</Paper>
              </Grid> */}
          <Grid item xs={12} sm={12}>
            <h1 class="rainbow-text">W$U CRYPTO COMMUNITY</h1>
            <h3>
              $COIN is a community driven, fair launch Token & Washington
              <br></br>
              State University specific token.
            </h3>
            {/* </Grid>
          <Grid item xs={12} sm={12}> */}
            <div
              //   style={{ textAlign: "center", width: "80%" }}
              className={classes.root}
            >
              {/* <Chip label="Basic" variant="outlined" />
              <Chip label="Disabled" disabled variant="outlined" /> */}
              <Chip
                avatar={<Avatar>C</Avatar>}
                label="Community-Driven"
                onClick={handleClick}
                variant="outlined"
              />
              <Chip
                icon={<FaceIcon />}
                label="NFT Support"
                color="secondary"
                variant="outlined"
              />
              <Chip
                avatar={
                  <Avatar alt="FNatacha" src="/static/images/avatar/1.jpg" />
                }
                label="Fixed Supply"
                variant="outlined"
              />
              <Chip
                icon={<FaceIcon />}
                label="Non Deflationary"
                onClick={handleClick}
                color="primary"
                variant="outlined"
              />
              {/* <Chip
                label="Utility Token"
                onClick={handleClick}
                deleteIcon={<DoneIcon />}
                variant="outlined"
              /> */}

              <Chip
                avatar={<Avatar>M</Avatar>}
                label="Utility Token"
                clickable
                color="primary"
                deleteIcon={<DoneIcon />}
                variant="outlined"
              />

              <Chip
                icon={<FaceIcon />}
                label="Tokenomics"
                clickable
                deleteIcon={<DoneIcon />}
                variant="outlined"
              />
              <Chip
                label="WSU specific token"
                color="primary"
                variant="outlined"
              />
              <Chip
                icon={<FaceIcon />}
                label="NFT hodl rewards"
                color="secondary"
                variant="outlined"
              />
              <Chip
                avatar={<Avatar>M</Avatar>}
                label="Memes"
                clickable
                color="primary"
                deleteIcon={<DoneIcon />}
                variant="outlined"
              />
            </div>
          </Grid>
          <Grid item justify-xs-center xs={4} sm={3}>
            <h2 justify-xs-center class="money">
              $1
            </h2>
            <h4>Current Price</h4>
          </Grid>
          <Grid justify-xs-center item xs={4} sm={3}>
            <h2 justify-xs-center class="money">
              540+
            </h2>
            <h4>Hodlers</h4>
          </Grid>
          <Grid item xs={4} sm={3}>
            {/* <Paper elevation={3}> */}
            <h2 class="crimson">100,000</h2>
            <h4>Total Supply</h4>
            {/* </Paper> */}
          </Grid>
          <Grid item xs={4} sm={3}>
            {/* <Paper elevation={3}> */}
            <h2 class="crimson"> Soon...</h2>
            <h4>NFTs</h4>
            {/* </Paper> */}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
