import React from "react";
import { Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import "./styles/Home.css";
import Grid from "@mui/material/Unstable_Grid2";

import IconContrato from "../assets/images/iconos/firma-digital.png";

import ImageBg from "../assets/images/imagenes/home-bg.jpg";
import IconSuperLiga from "../assets/images/entherprise/logoSuperliga.png";
import ImageFM from "../assets/images/entherprise/FM23.jpg";
import LogoFM from "../assets/images/entherprise/FM23-Light.png";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor:"#343338",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  height: "100%",
  
  color: theme.palette.text.secondary,
}));

const Home = () => {
  return (
    <>
      <Box component="main" sx={{}}>
        <Toolbar />
        <Box sx={{}} className="bgImageContainer">
          {/* call to action */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "100%",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: "100%",
                width: "100%",
                backgroundColor: "rgba(0,0,0,0.4)",
              }}
            >
              <img
                width={273}
                height={273}
                src={IconSuperLiga}
                alt="superliga"
              />
              <Typography
                variant="h3"
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  textShadow: "0px 0px 10px #cca500",
                }}
                gutterBottom
              >
                Bienvenido a Competiciones Online FM
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  textShadow: "0px 0px 10px #cca500",
                }}
              >
                Conviértete en el director técnico del equipo de tus amores,
                supera a managers de todo el mundo y lleva a tu equipo a la
                cima.
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                sx={{ mt: 2, fontSize: 20 }}
              >
                <span style={{ marginRight: "13px" }}>Inscríbete</span>
                <img w src={IconContrato} alt="contrato" />
              </Button>
            </Box>
          </Box>
        </Box>
        <Box component="section" sx={{ px: 3,height:400 }}>
          <Grid
            container
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            
          >
            <Grid xs={6} height={"100%"}>
              <Item >
                <img width={"50%"} height={"50%"} src={LogoFM} alt="bg" />
                <Typography variant="h5" sx={{color:"#e5e5e5"}}>
                  UN JUEGO DE SIMULACIÓN INCOMPARABLE
                  <br />
                  <br />
                </Typography>
                <Typography variant="subtitle1" sx={{color:"#e5e5e5"}}  gutterBottom>
                  Métete en el papel de un verdadero mánager dirigiendo a los
                  mejores equipos de fútbol del planeta y juega al deporte rey a
                  tu manera.
                  <br />
                  <br />
                  Ya sea fichando mejor, entrenando más duro o siendo más
                  inteligente que el rival, el arte de la gestión futbolística
                  consiste en encontrar el margen de victoria.
                  <br />
                  <br />
                  Football Manager es un juego en el que ningún sueño es
                  demasiado grande y ni ninguna ambición demasiado extravagante.
                  No te limites a cumplir las expectativas. Toma el control de
                  tu club, sueña a lo grande y arrasa.
                </Typography>
              </Item>
            </Grid>
            <Grid xs={6} height={"100%"}>
              <Item >
                <img width={"100%"} height={"100%"} src={ImageFM} alt="bg" />
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Home;
