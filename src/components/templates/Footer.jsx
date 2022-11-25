import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { Button, Icon, List, Paper, styled } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";

import DiscordIcon from "../../assets/images/iconos/discord.png";
import FacebookIcon from "../../assets/images/iconos/facebook.png";
import TwitterIcon from "../../assets/images/iconos/twitter.png";
import YouTubeIcon from "../../assets/images/iconos/youtube.png";
import TwitchIcon from "../../assets/images/iconos/twitch.png";
import InstagramIcon from "../../assets/images/iconos/instagram.png";

import Logo from "../../assets/images/entherprise/logo.png";
import ModalFooterAtribuciones from "./ModalFooterAtribuciones";
import { Stack } from "@mui/system";
import PoliticasPrivacidad from "../politicas/PoliticasPrivacidad";
import TerminosCondiciones from "../politicas/TerminosCondiciones";
const pages = [
  { title: "Home", href: "/" },
  { title: "Torneos y Competencias", href: "/torneos/ligas" },
  { title: "El Comunitario", href: "/el-comunitario" },
  { title: "Apuestas", href: "/apuestas" },
  { title: "Conviertete en Manager", href: "/conviertete-en-manager" },
  { title: "Conviertete en Colaborador", href: "/conviertete-en-colaborador" },
];
const iconFooter = (icon) => {
  switch (icon) {
    case "Instagram":
      return (
        <img width="24px" height="24px" src={InstagramIcon} alt="Instagram" />
      );

    case "YouTube":
      return <img width="24px" height="24px" src={YouTubeIcon} alt="Youtube" />;
    case "Twitter":
      return <img width="24px" height="24px" src={TwitterIcon} alt="Twitter" />;
    case "Facebook":
      return (
        <img width="24px" height="24px" src={FacebookIcon} alt="Facebook" />
      );
    case "Discord":
      return <img width="24px" height="24px" src={DiscordIcon} alt="Discord" />;
    case "Twitch":
      return <img width="24px" height="24px" src={TwitchIcon} alt="Twitch" />;
    default:
      return <img width="24px" height="24px" src={DraftsIcon} alt="Discord" />;
  }
};
const redes = [
  {
    title: "Facebook",
    href: "https://www.facebook.com/groups/937814986626220",
    icon: iconFooter("Facebook"),
  },
  {
    title: "Instagram",
    href: "https://www.instagram.com/competicionesonline/",
    icon: iconFooter("Instagram"),
  },
  {
    title: "Twitter",
    href: "https://twitter.com/CompeticionesFM",
    icon: iconFooter("Twitter"),
  },
  {
    title: "Youtube",
    href: "https://www.youtube.com/@competicionesonlinefm1043",
    icon: iconFooter("YouTube"),
  },
  {
    title: "Discord",
    href: "https://discord.gg/Vpb4mqdn",
    icon: iconFooter("Discord"),
  },
  {
    title: "Twitch",
    href: "https://www.twitch.tv/competicionesonlinefm",
    icon: iconFooter("Twitch"),
  },
];

function Copyright() {
  return (
    <Typography variant="body2" color="customTheme.secondary400">
      {"Copyright © "}
      <Link
        color="customTheme.acento200"
        href="https://mui.com/"
        sx={{
          textDecoration: "none",
        }}
      >
        | Todos los derechos reservados
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#222729",
  ...theme.typography.body2,
  /*   padding: theme.spacing(1), */
  textAlign: "center",
  color: "#E5E5E5",
  boxShadow: "none",
}));

export default function Footer() {
  const [open, setOpen] = React.useState(false);
  const [openCondiciones, setOpenCondiciones] = React.useState(false);
  const [openPrivacidad, setOpenPrivacidad] = React.useState(false);
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "customTheme.primary700" }}>
      <Grid container zeroMinWidth={true} sx={{ p: 3 }}>
        <Grid xs={12} md={5} lg={4}>
          <Item
            sx={{
              backgroundColor: "customTheme.primary700",
            }}
          >
            <img width={173} height={173} src={Logo} alt="logo" />

            <Typography variant="body2" color="customTheme.acento200">
              Comunidad de habla hispana de Football Manager. Creadores de la
              SuperLiga de las Américas.
            </Typography>
          </Item>
        </Grid>
        <Grid container xs={12} md={7} lg={8} spacing={2}>
          <Grid xs={6} lg={4}>
            <Item>
              <Box
                id="category-a"
                sx={{
                  fontSize: "15px",
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
              >
                Menu
              </Box>
              <Box sx={{ listStyle: "none" }}>
                <List sx={{ display: "flex", justifyContent: "center" }}>
                  <Box>
                    {pages.map((page, idx) => (
                      <ListItem key={idx} disablePadding>
                        <Link
                          to={page.href}
                          color="inherit"
                          underline="hover"
                          sx={{ fontSize: "15px", cursor: "pointer" }}
                        >
                          <ListItemButton
                            sx={{
                              p: 0,
                              display: "flex",
                              justifyContent: "space-around",
                            }}
                          >
                            <ListItemText primary={page.title} />
                          </ListItemButton>
                        </Link>
                      </ListItem>
                    ))}
                  </Box>
                </List>
              </Box>
            </Item>
          </Grid>

          <Grid xs={6} lg={4}>
            <Item>
              <Box
                id="category-c"
                sx={{ fontSize: "12px", textTransform: "uppercase" }}
              >
                Redes Sociales
              </Box>
              <List sx={{ display: "flex", justifyContent: "center" }}>
                <Box>
                  {redes.map((page, idx) => (
                    <ListItem key={idx} disablePadding>
                      <Link
                        href={page.href}
                        color="inherit"
                        underline="hover"
                        target="_blank"
                        rel="noreferrer"
                        sx={{ fontSize: "15px", cursor: "pointer" }}
                      >
                        <ListItemButton
                          sx={{
                            p: 0,
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: "37px !important" }}>
                            {page.icon}
                          </ListItemIcon>
                          <ListItemText primary={page.title} />
                        </ListItemButton>
                      </Link>
                    </ListItem>
                  ))}
                </Box>
              </List>
            </Item>
          </Grid>
          <Grid xs={6} lg={4}>
            <Item>
              <Box
                id="category-d"
                sx={{ fontSize: "12px", textTransform: "uppercase" }}
              >
                Atribuciones
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  mt: 3,
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setOpen(true)}
                >
                  Ver Atribuciones
                </Button>
              </Box>
            </Item>
          </Grid>
        </Grid>
        <Grid xs={12}>
          <Item
            sx={{
              backgroundColor: "customTheme.primary700",
              mt: 3,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {/* menu con terminos y condiciones y privacidad */}
              <Stack
                direction="row"
                spacing={2}
                divider={
                  <Divider orientation="vertical" flexItem color="#e5e5e5" />
                }
              >
                <Button
                  variant="text"
                  color="secondary"
                  sx={{ fontSize: "12px" }}
                  onClick={() => setOpenCondiciones(true)}
                >
                  Terminos y condiciones
                </Button>
                <Button
                  variant="text"
                  color="secondary"
                  sx={{ fontSize: "12px" }}
                  onClick={() => setOpenPrivacidad(true)}
                >
                  Política de privacidad
                </Button>
              </Stack>
            </Box>
          </Item>
        </Grid>
      </Grid>

      <Box
        component="footer"
        sx={{
          py: 3,

          mt: "auto",
          backgroundColor: "#343338",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" component="p" color="customTheme.acento200">
            COMPETICIONES ONLINE FM
          </Typography>
          <Copyright />
        </Box>
      </Box>

      <ModalFooterAtribuciones open={open} setOpen={setOpen} />
      <PoliticasPrivacidad open={openPrivacidad} setOpen={setOpenPrivacidad} />
      <TerminosCondiciones
        open={openCondiciones}
        setOpen={setOpenCondiciones}
      />
    </Box>
  );
}
