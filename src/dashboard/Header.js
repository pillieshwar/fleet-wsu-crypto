import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Icon from "@material-ui/core/Icon";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Web3 from "web3";
import Login from "./Login";
import { ethers } from "ethers";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    fontFamily: '"Segoe UI Symbol"',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  inputRoot: {
    color: "inherit",
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function Header() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [addrButton, setAddrButton] = React.useState(0);
  const [updatedaddr, setUpdatedaddr] = React.useState("");
  const [networkName, setNetworkName] = React.useState("");
  const [tokenhodl, setTokenhodl] = React.useState(0);
  const [tokenname, setTokenname] = React.useState("");

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const connectMetamask = async () => {
    // if (window.ethereum) {
    //   await window.ethereum.enable();
    //   const provider = new ethers.providers.Web3Provider(window.ethereum);
    //   const signer = provider.getSigner();
    //   console.log(provider.listAccounts);
    //   const balance = await provider.getBalance(
    //     "0xc3fb14F8D257c531861E9dC49416FdB9c0b47442"
    //   );
    //   console.log(ethers.utils.formatEther(balance));
    // }
    if (window.ethereum) {
      await window.ethereum.enable();
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      // Prompt user for account connections
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const addr = await signer.getAddress();

      console.log(addrButton, await (await provider.getNetwork()).name);
      //Get balance of address
      const balance = await provider.getBalance(addr);
      console.log(
        "Account:",
        addr,
        " Balance : ",
        ethers.utils.formatEther(balance)
      );
      // const web3 = new Web3(window.ethereum);
      // var tokenContract = new web3.eth.Contract(ERCToken).at(
      //   "0x4c6ec08cf3fc987c6c4beb03184d335a2dfc4042"
      // );
      // var decimal = tokenContract.decimals();
      // var bal = tokenContract.balanceOf(addr);
      // var adjustedBalance = bal / Math.pow(10, decimal);
      // console.log(adjustedBalance);

      // You can also use an ENS name for the contract address
      const daiAddress = "0x35cce2f5cd6f9b6398a0f0fb355320538ff7c16a";

      // The ERC-20 Contract ABI, which is a common contract interface
      // for tokens (this is the Human-Readable ABI format)
      const daiAbi = [
        // Some details about the token
        "function name() view returns (string)",
        "function symbol() view returns (string)",

        // Get the account balance
        "function balanceOf(address) view returns (uint)",

        // Send some of your tokens to someone else
        "function transfer(address to, uint amount)",

        // An event triggered whenever anyone transfers to someone else
        "event Transfer(address indexed from, address indexed to, uint amount)",
      ];

      // The Contract object
      const daiContract = new ethers.Contract(daiAddress, daiAbi, provider);

      await daiContract.name();
      // 'Dai Stablecoin'

      // Get the ERC-20 token symbol (for tickers and UIs)
      let tokenSymbol = "";
      if ((await daiContract.symbol()) != null) {
        tokenSymbol = await daiContract.symbol();
      }
      // 'DAI'

      // Get the balance of an address
      const balanceDai = await daiContract.balanceOf(addr);
      // {
      //   BigNumber: "1182338008374328791075";
      // }

      // Format the DAI for displaying to the user

      // '1182.338008374328791075'

      console.log(ethers.utils.formatUnits(balanceDai, 18));
      let currentBalance = 0;
      if (ethers.utils.formatUnits(balanceDai, 18) != null) {
        currentBalance = ethers.utils.formatUnits(balanceDai, 18);
      }
      // var tokenName = tokenContract.name()
      // var tokenSymbol = tokenContract.symbol()
      if (addr != null) {
        setAddrButton(1);
        setNetworkName(await (await provider.getNetwork()).name);
        const updatedaddress = addr.substr(0, 4).concat("...");
        setUpdatedaddr(updatedaddress.concat(addr.substr(38, 4)));
        const currtokens = currentBalance.concat(" $");
        setTokenhodl(currtokens.concat(tokenSymbol));
        setTokenname("$".concat(tokenSymbol));
      }
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>

      {(() => {
        if (addrButton === 0) {
          return (
            <MenuItem>
              <Chip
                // icon={<FaceIcon />}
                align="center"
                label="Connect"
                color="secondary"
                // variant="outlined"
                onClick={connectMetamask}
              />
            </MenuItem>
          );
        } else {
          return (
            <Menu
              anchorEl={mobileMoreAnchorEl}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              id={mobileMenuId}
              keepMounted
              align="center"
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={isMobileMenuOpen}
              onClose={handleMobileMenuClose}
            >
              <MenuItem>
                <Chip
                  // icon={<FaceIcon />}
                  align="center"
                  label={networkName}
                />
              </MenuItem>
              <MenuItem>
                <Chip
                  // icon={<FaceIcon />}
                  align="center"
                  label={tokenhodl}
                  color="primary"
                  variant="outlined"
                />
              </MenuItem>
              <MenuItem>
                <Chip
                  // icon={<FaceIcon />}
                  align="center"
                  label={updatedaddr}
                  color="secondary"
                  variant="outlined"
                />
              </MenuItem>
            </Menu>
          );
        }
      })()}
      {/* </MenuItem> */}
    </Menu>
  );

  return (
    // <div className={classes.grow}>
    //   {/* <Login /> */}
    //   <AppBar position="static">
    //     <Toolbar>
    //       <Typography className={classes.title} variant="h6" noWrap>
    //         W$U
    //       </Typography>

    //       <div className={classes.grow} />
    //       <div className={classes.sectionDesktop}>
    //         <IconButton aria-label="show 4 new mails" color="inherit">
    //           <Badge badgeContent={4} color="secondary">
    //             <MailIcon />
    //           </Badge>
    //         </IconButton>
    //         <IconButton aria-label="show 17 new notifications" color="inherit">
    //           <Badge badgeContent={17} color="secondary">
    //             <NotificationsIcon />
    //           </Badge>
    //         </IconButton>
    //         <IconButton
    //           edge="end"
    //           aria-label="account of current user"
    //           aria-controls={menuId}
    //           aria-haspopup="true"
    //           onClick={handleProfileMenuOpen}
    //           color="inherit"
    //         >
    //           <AccountCircle />
    //         </IconButton>
    //         <Chip
    //           icon={<FaceIcon />}
    //           label="NFT Support"
    //           color="secondary"
    //           variant="outlined"
    //         />
    //         <button className="login-button" onClick={connectMetamask}>
    //           Metamask
    //         </button>
    //       </div>
    //       <div className={classes.sectionMobile}>
    //         <IconButton
    //           aria-label="show more"
    //           aria-controls={mobileMenuId}
    //           aria-haspopup="true"
    //           onClick={handleMobileMenuOpen}
    //           color="inherit"
    //         >
    //           <MoreIcon />
    //         </IconButton>
    //       </div>
    //     </Toolbar>
    //   </AppBar>
    //   {renderMobileMenu}
    //   {renderMenu}
    //   <button className="login-button" onClick={connectMetamask}>
    //     Metamask
    //   </button>
    // </div>
    <div className={classes.grow}>
      <Paper class="headerColor" elevation={3}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            {/* W$U CRYPTO */}
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {/* <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <IconButton aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton> */}
            {(() => {
              if (addrButton === 0) {
                return (
                  <Chip
                    // icon={<FaceIcon />}
                    align="center"
                    label="Connect"
                    color="secondary"
                    // variant="outlined"
                    onClick={connectMetamask}
                  />
                );
              } else {
                return (
                  <div>
                    <Chip
                      // icon={<FaceIcon />}
                      align="center"
                      label={networkName}
                    />{" "}
                    &nbsp;
                    {/* <ButtonGroup
                      color="secondary"
                      aria-label="outlined secondary button group"
                    >
                      <Button>
                        <Chip
                          // icon={<FaceIcon />}
                          align="center"
                          label={tokenhodl}
                          color="primary"
                          variant="outlined"
                        />
                      </Button>
                      <Button></Button>
                    </ButtonGroup> */}
                    <Chip
                      // icon={<FaceIcon />}
                      align="center"
                      label={tokenhodl}
                      color="secondary"
                      variant="outlined"
                    />
                    &nbsp;&nbsp;
                    <Chip
                      // icon={<FaceIcon />}
                      align="center"
                      label={updatedaddr}
                      color="primary"
                      // variant="outlined"
                    />
                  </div>
                );
              }
            })()}
            {/* <button className="login-button" onClick={connectMetamask}>
          Metamask
        </button> */}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
          {renderMobileMenu}
          {renderMenu}
          {/* <button className="login-button" onClick={connectMetamask}>
        Metamask
      </button> */}
        </Toolbar>
      </Paper>
    </div>
  );
}
