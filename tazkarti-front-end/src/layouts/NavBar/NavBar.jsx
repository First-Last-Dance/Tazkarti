/* eslint-disable no-unused-vars */
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Logo from "../../assets/images/logo.png";

import theme from "../../theme/theme";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/Authentication";

const pages = ["Matches"];
const settingsLoggedIn = ["Profile", "Account", "Dashboard", "Logout"];
const settingsLoggedout = ["Sign Up", "Log In"];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const auth = useAuth();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      {" "}
      <AppBar
        position="fixed"
        sx={{
          width: "100vw",
          position: "fixed",
          margin: "0",
          left: 0,
          top: 0,
          background: theme.palette.blue.main,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              sx={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/");
              }}
            >
              <img src={Logo} width={100} />
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none", color: "white" },
                }}
                color="white"
              >
                {pages.map((page) => (
                  <MenuItem
                    color="white"
                    key={page}
                    onClick={() => {
                      navigate("/" + page.replace(" ", "").toLowerCase());
                    }}
                    sx={{ color: "white" }}
                  >
                    {page}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
            {/* <Typography
         variant="h5"
         noWrap
         component="a"
         href="#app-bar-with-responsive-menu"
         sx={{
           mr: 2,
           display: { xs: "flex", md: "none" },
           flexGrow: 1,
           fontFamily: "monospace",
           fontWeight: 700,
           letterSpacing: ".3rem",
           color: "inherit",
           textDecoration: "none",
         }}
       >
         LOGO
       </Typography> */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => {
                    navigate("/" + page.replace(" ", "").toLowerCase());
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, width: 50, height: 50, color: "white" }}
                >
                  <AccountCircleIcon
                    sx={{ p: 0, width: 40, height: 40, color: "white" }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {auth.isLoggedIn() &&
                  settingsLoggedIn.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography
                        textAlign="center"
                        onClick={() => {
                          if (setting == "Logout") {
                            auth.logout();
                            navigate("/login");
                          } else {
                            navigate(
                              "/" + setting.replace(" ", "").toLowerCase()
                            );
                          }
                        }}
                      >
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                {!auth.isLoggedIn() &&
                  settingsLoggedout.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography
                        textAlign="center"
                        onClick={() => {
                          navigate(
                            "/" + setting.replace(" ", "").toLowerCase()
                          );
                        }}
                      >
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={{ height: "60px" }}></Box>
    </>
  );
}
export default NavBar;
