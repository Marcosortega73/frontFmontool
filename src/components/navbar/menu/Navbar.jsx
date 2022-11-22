import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Img } from "../../../styles-components/Layout";

import logo from "../../../assets/images/entherprise/logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const drawerWidth = "50%";
const drawerHeight = "100vh";

const pages = [
  { title: "Home", href: "/" },
  { title: "Torneos y Competencias", href: "/torneos/ligas" },
  { title: "El Comunitario", href: "/el-comunitario" },
  { title: "Apuestas", href: "/apuestas" },
  { title: "Conviertete en Manager", href: "/conviertete-en-manager" },
  { title: "Conviertete en Colaborador", href: "/conviertete-en-colaborador" },
];

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { isLoggedIn, user } = useSelector((state) => state.auth);

  console.log("user nabbar", user);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ backgroundColor: "customTheme.primary700", textAlign: "center",height: "100%" }}
    >
      <Box
        component="div"
        sx={{
          flexGrow: 1,
          display: { xs: "flex", sm: "none" },
          justifyContent: "center",
        }}
      >
        <Img height="73" width="73" alt="Competiciones-Online" src={logo} />
      </Box>
      <Box sx={{
          flexGrow: 1,
          display: { xs: "flex", sm: "none" },
          flexDirection: "column",
          justifyContent: "space-between",
        }}>
      <Divider />
      <List >
        {pages.map((item, idx) => (
          <Link key={idx} to={item.href}>
            <ListItem key={idx} disablePadding>
              <ListItemButton sx={{ textAlign: "center", color: "white" }}>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List
      sx={{display:"flex",flexDirection:"column",justifyContent:"flex-end"}} 
      >
        <Link to="/login">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center", color: "white" }}>
              <ListItemText primary="Iniciar Sesión" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/register">
          <ListItem disablePadding>
            <ListItemButton
              color="secondary"
              sx={{ textAlign: "center", color: "white" }}
            >
              <ListItemText primary="Registrarce" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      </Box>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" sx={{ height: 73 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Img height="73" width="73" alt="Competiciones-Online" src={logo} />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, idx) => (
              <Link key={idx} to={page.href}>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  {page.title}
                </Button>
              </Link>
            ))}
          </Box>
          {
            user?.rol === "MANAGER" ||user?.rol ===  "ADMIN" ? (
            <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            <Link to={user?.rol === "MANAGER"?"/profile":user?.rol === "ADMIN"&&'/panelAdministracion/dashboard'}>
              <Button
                variant="contained"
                sx={{
                  my: 2,
                  backgroundColor: "#343338",
                  mr: 2,
                  color: "white",
                  display: "block",
                  letterSpacing: 1,
                  "&:hover": {
                    color: "#1e2024 !important",
                    backgroundColor: "#e5e5e5",
                  },
                }}
              >
                {
                  user?.rol === "MANAGER" ? "Mi Perfil" : user?.rol === "ADMIN" && "Panel Administración"}
              </Button>
            </Link>
            <Link to="/logout">
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  my: 2,
                  display: "block",
                  fontWeight: "bold",
                  letterSpacing: 1,
                }}
              >
                Log Out
              </Button>
            </Link>
          </Box>):(
            <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            <Link to="/login">
              <Button
                variant="contained"
                sx={{
                  my: 2,
                  backgroundColor: "#343338",
                  mr: 2,
                  color: "white",
                  display: "block",
                  letterSpacing: 1,
                  "&:hover": {
                    color: "#1e2024 !important",
                    backgroundColor: "#e5e5e5",
                  },
                }}
              >
                Iniciar Sesión
              </Button>
            </Link>
            <Link to="/register">
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  my: 2,
                  display: "block",
                  fontWeight: "bold",
                  letterSpacing: 1,
                }}
              >
                Registrarse
              </Button>
            </Link>
          </Box>)
          }
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ backgroundColor: "customTheme.primary700" }}>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "customTheme.primary700",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

Navbar.propTypes = {
  window: PropTypes.func,
};

export default Navbar;
