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
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";

import Icon from "@mui/material/Icon";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import ButtonGroup from "@mui/material/ButtonGroup";
import { BootstrapTooltip } from "../../styles-components/BootstrapTooltip";

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
  const [anchorElUser, setAnchorElUser] = React.useState(null);
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

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleNavigate = (path) => {
    navigate(path);
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
        <AppBar position="fixed" open={open} sx={{ borderRadius: 3 }}>
          <Toolbar sx={{ m: 0, display:"flex" , justifyContent:"space-between"}}>
          <Box  sx={{ flexGrow: 1, display: { xs: "flex", md: "none" },px:0  }}>
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
            <Typography variant="h6" noWrap component="div">
              Panel de Administracion
            </Typography>
            <div>
              <Grid container>
                {!isLoggedIn ? (
                  <>
                    <Grid>
                      <Link to="/login" sx={{ textDecoration: "none" }}>
                        <Button
                          sx={{
                            backgroundColor: "#1e2024",
                            color: "#b0bec5",
                            borderRadius: "5px",
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px",
                            margin: "0",
                            marginRight: "10px",
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

                    <Grid item sx={{ height: "50%" }}>
                      <Link to="/register">
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
                          Sign Up
                        </Button>
                      </Link>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item>
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
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <>
                <Typography
                  variant="h7"
                  color="white"
                  sx={{ display: "flex", flexDirection: "column", pr: 1 }}
                >
                  {user?.nombre && user.apellido
                    ? user.nombre + " " + user.apellido
                    : "Ingrese su nombre"}

                  <span style={{ fontSize: "13px" }}>
                    {user?.estado
                      ? user.estado.nombre === "En paro"
                        ? "Manager en paro"
                        : user?.equipo
                        ? "Manager de " + user.equipo.nombre
                        : "Ingrese su equipo"
                      : "Sin Asignar"}
                  </span>
                </Typography>

                <ChevronLeftIcon />
              </>
            )}
          </Button>
        </DrawerHeader>

        <Divider />

        <List>
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
              <ListItem disablePadding sx={{ display: "flex",
               "&:hover": {
                backgroundColor: "secondary.light",
                borderColor: "secondary.light",
                boxShadow: "none",
                "& .MuiListItemIcon-root .material-icons": {
                  color: "secondary.contrastText",
                },
            
              },
            }}>
                <NavLink
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
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
                    <AccordionDetails sx={{ p: 0, width: "173px", m: 0 ,    "&:hover": {
                          backgroundColor: "secondary.light",
                          borderColor: "secondary.light",
                          boxShadow: "none",
                          "& .MuiListItemIcon-root .material-icons": {
                            color: "secondary.contrastText",
                          },
                      
                        },}}>
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
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Toolbar />
          <Box
            sx={{
              backgroundColor: "primary.main",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  );
}

/* 


  return (
   
      <CssBaseline />

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Button
            sx={{ width: "100%" }}
            color="secondary"
            onClick={handleDrawerClose}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <>
                <Typography
                  variant="h7"
                  color="white"
                  sx={{ display: "flex", flexDirection: "column", pr: 1 }}
                >
                  {user?.nombre && user.apellido
                    ? user.nombre + " " + user.apellido
                    : "Ingrese su nombre"}

                  <span style={{ fontSize: "13px" }}>
                    {user?.estado
                      ? user.estado.nombre === "En paro"
                        ? "Manager en paro"
                        : user?.equipo
                        ? "Manager de " + user.equipo.nombre
                        : "Ingrese su equipo"
                      : "Sin Asignar"}
                  </span>
                </Typography>

                <ChevronLeftIcon />
              </>
            )}
          </Button>
        </DrawerHeader>

        <Divider />

        <List>
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
                    color: "secondary.contrastText",
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

          {PanelDraw.map((text, index) => (
            <BootstrapTooltip title={text.name} placement="right" key={index}>
              <ListItem disablePadding sx={{ display: "flex",
               "&:hover": {
                backgroundColor: "secondary.light",
                borderColor: "secondary.light",
                boxShadow: "none",
                "& .MuiListItemIcon-root .material-icons": {
                  color: "secondary.contrastText",
                },
            
              },
            }}>
                <NavLink
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
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
                    <AccordionDetails sx={{ p: 0, width: "173px", m: 0 ,    "&:hover": {
                          backgroundColor: "secondary.light",
                          borderColor: "secondary.light",
                          boxShadow: "none",
                          "& .MuiListItemIcon-root .material-icons": {
                            color: "secondary.contrastText",
                          },
                      
                        },}}>
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
        <List>
          {PanelDrawPerfil.map((text, index) => (
            <BootstrapTooltip title={text.name} placement="right" key={index}>
              <ListItem key={index} disablePadding sx={{ display: "block" }}>
                <NavLink
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                  to={text.path}
                  color="inherit"
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <Icon color="secondary">{text.icon}</Icon>
                    </ListItemIcon>
                    <ListItemText
                      primary={text.name}
                      sx={{ opacity: open ? 1 : 0, color: "white" }}
                    />
                  </ListItemButton>
                </NavLink>
              </ListItem>
            </BootstrapTooltip>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, px: 0 }}>
        <DrawerHeader />
        <Box
          sx={{
            width: "100%",
            margin: "0 auto",
            padding: "0px",
            "& .MuiBox-root css-zxdg2z": {
              padding: "0px",
            },
          }}
        >
          <Img src={Banner} alt="logo" />
          <Box>
            <Grid container height={83}>
              <Grid item xs={2}>
                <Item>xs=8</Item>
              </Grid>
              <Grid
                item
                xs={10}
                display="flex"
                justifyContent="end"
                sx={{ pr: "53px" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",

                    "& > *": {
                      m: 1,
                    },
                  }}
                >
                  <ButtonGroup
                    color="secondary"
                    aria-label="medium secondary button group"
                  >
                    {buttons}
                  </ButtonGroup>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box sx={{ mx: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

<Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              backgroundColor: "#1A2027",
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "4px",
                margin: "4px",
              }}
            >
              <div style={{ marginBottom: "15px", marginTop: "15px" }}>
                <Avatar></Avatar>
              </div>
              <div>
                <Typography variant="h6" sx={{ color: "white" }}>
                  {user ? user.email && user.email : "Usuario"}
                </Typography>
              </div>
            </div>
          </Toolbar>

          <Divider />
          <List>
            {data.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <ListItem disablePadding>
                  <ListItemButton
                    className="buttonList"
                    sx={{
                      color: "#f5f5f5",
                    }}
                  >
                    <ListItemIcon>
                      <SwitchLeftIcon />
                    </ListItemIcon>
                    <ListItemText color="white" primary={item.name} />
                  </ListItemButton>
                </ListItem>
              </NavLink>
            ))}
          </List>
          <Divider />
          <List>
            {dataSecond.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    sx={{
                      color: "#f5f5f5",
                    }}
                  >
                    <ListItemIcon>
                      <FiberNewIcon />
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              </NavLink>
            ))}
          </List>
        </Drawer>







*/
