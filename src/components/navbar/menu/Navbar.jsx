import React, { useState } from "react";

import { Link } from "react-router-dom";
import "./Navbar.css";
import Dropdown from "./Dropdown";
import logo from "../../../assets/images/entherprise/logo.png";
import {
  Avatar,
  Button,
  ButtonBase,
  Grid,
  MenuItem,
  MenuList,
} from "@mui/material";
import { Img } from "../../../styles-components/Layout";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/authSlice";
import WebIcon from "@mui/icons-material/Web";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "./styles-components/SearchBar";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation } from "react-router-dom";

function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const location = useLocation();



  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const { isLoggedIn, permission } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };


  const handleLogout = (e) => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        navigate("/inicio");
      })
      .catch(() => {
        console.log("Error");
      });
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };



  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <ButtonBase className="logo-mobile" sx={{ width: 128, height: 128 }}>
            <Img alt="Competiciones-Online" src={logo} />
          </ButtonBase>
        </Link>
        <Grid   sx={{height:"100%"}}>
          <Grid  sx={{ pb: 2 }}>
            <Grid item xs={9}>
              <Search className="search-mobile">
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Buscar…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Grid>

            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                flexDirection: "row",
                paddingRight: "1rem",
              }}
            >
              {!isLoggedIn ? (
                <>
                  <Grid item sx={{ pr: 2 }} className="navbar-container">
                    <Link to="/login" sx={{ textDecoration: "none" }}>
                      <Button
                      className="navbar-container"
                        sx={{
                          backgroundColor: "#1e2024",
                          color: "#b0bec5",
                          borderRadius: "5px",
                          fontSize: "14px",
                          fontWeight: "bold",
                          margin: "0",
                          border: "2px solid #b0bec5",

                          "&:hover": {
                            backgroundColor: "#cca500",
                            color: "#1e2024",
                            boxShadow:
                              "-2px -2px 14px 1px rgba(245, 245, 245, 0.75)",
                          },
                        }}
                      >
                        Login
                      </Button>
                    </Link>
                  </Grid>

                  <Grid  item sx={{ height: "50%" }}>
                    <Link to="/register">
                      <Button
                        sx={{
                          backgroundColor: "#b0bec5",
                          color: "#1e2024",
                          borderRadius: "5px",
                          fontSize: "14px",
                          fontWeight: "bold",

                          margin: "0",

                          border: "2px solid #1e2024",

                          "&:hover": {
                            backgroundColor: "#cca500",
                            color: "#1e2024",
                            boxShadow:
                              "-2px -2px 14px 1px rgba(245, 245, 245, 0.75)",
                            border: "2px solid #b0bec5",
                          },
                        }}
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </Grid>
                </>
              ) : (
                <>
                  {permission === "ADMIN" && (
                    <Grid>
                      <Link to="/panelAdministracion">
                        <Button
                          sx={{
                            backgroundColor: "#b0bec5",
                            color: "#1e2024",
                            borderRadius: "5px",
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px",
                            margin: "0",
                            marginRight: "10px",
                            border: "2px solid #1e2024",
                            "&:hover": {
                              backgroundColor: "#cca500",
                              color: "#1e2024",
                              boxShadow:
                                "-2px -2px 14px 1px rgba(245, 245, 245, 0.75)",
                              border: "2px solid #b0bec5",
                            },
                          }}
                        >
                          <ModeEditOutlineIcon />
                        </Button>
                      </Link>
                    </Grid>
                  )}

                  <Grid item>
                    <Link to="/profile">
                      <Button
                        sx={{
                          backgroundColor: "#b0bec5",
                          color: "#1e2024",
                          borderRadius: "5px",
                          fontSize: "14px",
                          fontWeight: "bold",
                          padding: "10px",
                          margin: "0",
                          marginRight: "10px",
                          border: "2px solid #1e2024",
                          "&:hover": {
                            backgroundColor: "#cca500",
                            color: "#1e2024",
                            boxShadow:
                              "-2px -2px 14px 1px rgba(245, 245, 245, 0.75)",
                            border: "2px solid #b0bec5",
                          },
                        }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: "#1e2024",
                            color: "white",
                            width: 24,
                            height: 24,
                          }}
                        >
                          P
                        </Avatar>
                      </Button>
                    </Link>
                  </Grid>
                  <Grid>
                    <Button
                      onClick={handleLogout}
                      sx={{
                        backgroundColor: "#b0bec5",
                        color: "#1e2024",
                        borderRadius: "5px",
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px",
                        margin: "0",
                        marginRight: "10px",
                        border: "2px solid #1e2024",
                        "&:hover": {
                          backgroundColor: "#cca500",
                          color: "#1e2024",
                          boxShadow:
                            "-2px -2px 14px 1px rgba(245, 245, 245, 0.75)",
                          border: "2px solid #b0bec5",
                        },
                      }}
                    >
                      <ExitToAppIcon />
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>

          <Grid
            container
            sx={{
              mt: 0,
              height: "100%",
            }}
            className="navbar-container"
            
          >
            <div className="menu-icon" onClick={handleClick}>
              {click ? <CloseIcon /> : <MenuIcon  color="#E5E5E5"/>}
            </div>
            <MenuList className={click ? "nav-menu active" : "nav-menu"}>
              <MenuItem className="nav-item">
                <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                  Home
                </Link>
              </MenuItem>
              <MenuItem
                className="nav-item"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              >
                <Link
                  to="/torneos"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Torneos y Competencias{" "}
                  {dropdown ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </Link>
                {dropdown && <Dropdown />}
              </MenuItem>
              <MenuItem className="nav-item">
                <Link
                  to="/el-comunitario"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  El Comunitario
                </Link>
              </MenuItem>
              <MenuItem className="nav-item">
                <Link
                  to="/apuestas"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Apuestas
                </Link>
              </MenuItem>
              <MenuItem className="nav-item">
                <Link
                  to="/conviertete-en-manager"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Conviertete en Manager
                </Link>
              </MenuItem>
              <MenuItem className="nav-item">
                <Link
                  to="/ligas-del-mundo"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Ligas del Mundo
                </Link>
              </MenuItem>
            </MenuList>
          </Grid>
        </Grid>
      </nav>
    </>
  );
}

export default Navbar;
