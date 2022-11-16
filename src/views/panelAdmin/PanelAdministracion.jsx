import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";
import { Link, NavLink, Outlet } from "react-router-dom";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";
import "./panelAdministracion.css";
import { getRegiones } from "../../redux/regionesSlice";
import MuiAppBar from "@mui/material/AppBar";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Grid,
  Menu,
  MenuItem,
  Paper,
  Tooltip,
} from "@mui/material";
import Panel from "./utils/panel.json";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Navigate } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import WebIcon from "@mui/icons-material/Web";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";

import Icon from "@mui/material/Icon";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import ButtonGroup from "@mui/material/ButtonGroup";
import { BootstrapTooltip } from "../../styles-components/BootstrapTooltip";

import Logo from "../../assets/images/entherprise/logo.png";

const drawerWidth = 240;
let activeStyle = {
  textDecoration: "underline",
};
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  backgroundColor: "#1e2024",
  overflowX: "hidden",
  borderRadius: "8px",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: "#1e2024",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  bacgroundColor: "red",
  color: "white",
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1A2027",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  width: "123px",
  height: "123px",
  borderRadius: 33,
  position: "relative",
  top: "-60px",
  left: "53px",
  border: "1px solid #fff",
  boxShadow: "0px 0px 10px #000",

  color: theme.palette.text.secondary,
}));

const buttons = [
  <IconButton size="large" key="one">
    <FacebookIcon />
  </IconButton>,
  <IconButton size="large" key="two">
    <InstagramIcon />
  </IconButton>,
  <IconButton size="large" key="three">
    <TwitterIcon />
  </IconButton>,
];

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  backgroundColor: "#1A2027",
  borderRadius: 5,
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
const pages = ["Home", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
export default function PanelAdministracion({ data, dataSecond }) {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let activeStyle = {
    color: "#263238",
    textDecoration: "underline",
    "& .MuiListItemButtonRoot": {
      backgroundColor: "#302e29",
    },
  };

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  React.useEffect(() => {
    dispatch(getRegiones());
  }, [dispatch]);

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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          backgroundColor: "#292c31",
          "& .MuiBox-root css-101my1y": {
            "& .MuiBox-root css-zdk3ta": {
              padding: "0px !important",
            },
          },
        }}
      >
        <CssBaseline />
        <AppBar position="fixed" open={open} sx={{ pl: 0 }}>
          <Toolbar
            sx={{
              m: 0,
              display: "flex",
              justifyContent: "space-between",
              px: "0px !important",
              height: "85px",
            }}
          >
            <Box
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, px: 0 }}
            >
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
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page, index) => (
                  <MenuItem key={index} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {/*Todo: menu principal, verificar si es necesario */}
            {!open ? (
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Avatar
                  sx={{ width: 73, height: 73 }}
                  alt="Remy Sharp"
                  src={Logo}
                />
                <Typography variant="h6" noWrap component="div" sx={{ ml: 1 }}>
                  Panel de Administracion
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ ml: 1.5 }}
                >
                  Panel de Administracion
                </Typography>
              </Box>
            )}
            <div>
              <Grid container>
                <Grid item>
                  <Link to="/inicio">
                    <Tooltip title="Ir al sitio web">
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
                        <WebIcon />
                      </Button>
                    </Tooltip>
                  </Link>
                </Grid>
                <Grid>
                  <Tooltip title="Cerrar sesión">
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
                  </Tooltip>
                </Grid>
              </Grid>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <Button
              sx={{ width: "100%" }}
              color="secondary"
              onClick={handleDrawerClose}
            >
              {open && (
                <>
                  <Box sx={{ display: "flex" }}>
                    <Avatar
                      sx={{ width: 73, height: 73 }}
                      alt="Remy Sharp"
                      src={Logo}
                    />
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <ChevronLeftIcon />
                  </Box>
                </>
              )}
            </Button>
          </DrawerHeader>

          <Divider />

          <List sx={{mt:1}}>
            <ListItem
              sx={{
                display: "flex",
                justifyContent: "end",
                p: 0,
                m: 0,
                "&:hover": "red",
              }}
            >
              <Button
                onClick={handleDrawerOpen}
                sx={{
                  "&:hover": {
                    backgroundColor: "secondary.light",
                    borderColor: "secondary.light",
                    boxShadow: "none",
                    "& .MuiSvgIcon-root": {
                      color: "secondary.main",
                    },
                  },
                }}
              >
                <ChevronRightIcon
                  color="secondary"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{
                    ...(open && { display: "none" }),
                    m: 0,
                    p: 0,
                  }}
                >
                  <MenuIcon />
                </ChevronRightIcon>
              </Button>
            </ListItem>

            {Panel.map((text, index) => (
              <BootstrapTooltip title={text.name} placement="right" key={index}>
                <ListItem
                  disablePadding
                  sx={{
                    display: "flex",
                    "&:hover": {
                      backgroundColor: "secondary.light",
                      borderColor: "secondary.light",
                      boxShadow: "none",
                      "& .MuiListItemIcon-root .material-icons": {
                        color: "secondary.contrastText",
                      },
                    },
                  }}
                >
                  <NavLink
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                    to={text.path}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 1.5 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        <Icon color="secondary">{text.icon}</Icon>
                      </ListItemIcon>
                    </ListItemButton>
                  </NavLink>
                  {text.menu ? (
                    <Accordion
                      sx={{
                        p: 0,
                        width: "100%",
                        m: 0,
                        borderRadius: 0,
                        border: "none",
                        display: open ? "flex" : "none",
                        flexDirection: "column",
                        backgroundColor: "#1e2024",
                        boxShadow: "none",
                      }}
                      disableGutters
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon color="secondary" />}
                        sx={{
                          p: 0,
                          width: "173px",
                          m: 0,
                          backgroundColor: "#1e2024",
                          boxShadow: "none",
                        }}
                      >
                        <ListItemText
                          primary={text.name}
                          sx={{ opacity: open ? 1 : 0, color: "white" }}
                        >
                          {text.name}
                        </ListItemText>
                      </AccordionSummary>
                      <AccordionDetails
                        sx={{
                          p: 0,
                          width: "173px",
                          m: 0,
                          "&:hover": {
                            backgroundColor: "secondary.light",
                            borderColor: "secondary.light",
                            boxShadow: "none",
                            "& .MuiListItemIcon-root .material-icons": {
                              color: "secondary.contrastText",
                            },
                          },
                        }}
                      >
                        {text.menu.map((menu, idx) => (
                          <NavLink
                            style={({ isActive }) =>
                              isActive ? activeStyle : undefined
                            }
                            key={idx + 1}
                            to={menu.path}
                            color="inherit"
                          >
                            <ListItemButton
                              sx={{
                                minHeight: 48,
                                justifyContent: open ? "initial" : "center",
                                px: 1,
                              }}
                            >
                              <ListItemIcon
                                sx={{
                                  minWidth: 0,
                                  mr: open ? 3 : "auto",
                                  justifyContent: "center",
                                }}
                              >
                                <Icon color="secondary">{menu.icon}</Icon>
                              </ListItemIcon>
                              <ListItemText
                                primary={menu.name}
                                sx={{ opacity: open ? 1 : 0, color: "white" }}
                              />
                            </ListItemButton>
                          </NavLink>
                        ))}
                      </AccordionDetails>
                    </Accordion>
                  ) : (
                    <>
                      <NavLink
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                        to={text.path}
                      >
                        <ListItemText
                          primary={text.name}
                          sx={{ opacity: open ? 1 : 0, color: "white" }}
                        />
                      </NavLink>
                    </>
                  )}
                </ListItem>
              </BootstrapTooltip>
            ))}
          </List>
          <Divider />
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "background.default",
            m: 3,
            backgroundColor: "#292c31",
          }}
        >
          <Toolbar />
          <Box
            sx={{
              backgroundColor: "#292c31",
              height: "90vh",
            }}
          >
            <Outlet context={{ anchorElNav }} />
          </Box>
        </Box>
      </Box>
    </>
  );
}
