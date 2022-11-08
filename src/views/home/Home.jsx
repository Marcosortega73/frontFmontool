import React from "react";
import {
  Box,
  Button,
  Container,
  Grow,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import "./styles/Home.css";
import Grid from "@mui/material/Unstable_Grid2";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import IconContrato from "../../assets/images/iconos/firma-digital.png";

import ImageBg from "../../assets/images/imagenes/home-bg.jpg";
import IconSuperLiga from "../../assets/images/entherprise/logoSuperliga.png";
import ImageFM from "../../assets/images/entherprise/FM23.jpg";
import LogoFM from "../../assets/images/entherprise/FM23-Light.png";
import SectionLigaComponets from "./components/SectionLigaComponets";
import IconArrow from "../../assets/images/iconos/arrow-down.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

import { useDispatch, useSelector } from "react-redux";
import { getTorneos } from "../../redux/torneoSlice";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#34333891",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  height: "100%",
  mb: 55,

  color: theme.palette.text.secondary,
}));

const boxVariant = {
  visible: { opacity: 1, scale: 1, transition: { duration: 0.1 } },
  hidden: { opacity: 0, scale: 0 },
};
const BoxMotion = () => {
  const control = useAnimation();
  const [ref, inView] = useInView();

  React.useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);

  return (
    <motion.div
      className="box"
      ref={ref}
      variants={boxVariant}
      initial="hidden"
      animate={control}
    >
      <Grid container columnSpacing={{ xs: 1 }}>
        <Grid xs={12} md={6} sx={{ p: 3 }}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <img
                style={{ maxHeight: "15vh", maxWidth: "100%" }}
                src={LogoFM}
                alt="bg"
                className="logoFm"
              />
            </Box>

            <Typography sx={{ color: "#e5e5e5" }}>
              UN JUEGO DE SIMULACIÓN INCOMPARABLE
              <br />
              <br />
            </Typography>
            <Typography sx={{ color: "#e5e5e5" }}>
              Métete en el papel de un verdadero mánager dirigiendo a los
              mejores equipos de fútbol del planeta y juega al deporte rey a tu
              manera.
              <br />
              <br />
              Ya sea fichando mejor, entrenando más duro o siendo más
              inteligente que el rival, el arte de la gestión futbolística
              consiste en encontrar el margen de victoria.
              <br />
              <br />
              Football Manager es un juego en el que ningún sueño es demasiado
              grande y ni ninguna ambición demasiado extravagante. No te limites
              a cumplir las expectativas. Toma el control de tu club, sueña a lo
              grande y arrasa.
            </Typography>
          </Box>
        </Grid>
        <Grid xs={12} md={6} sx={{ p: 3 }}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <img
                style={{ maxHeight: "15vh", maxWidth: "100%" }}
                src={IconSuperLiga}
                alt="bg"
                className="logoFm"
              />
            </Box>

            <Typography sx={{ color: "#e5e5e5" }}>
              SUPER LIGA DE LAS AMÉRICAS
              <br />
              <br />
            </Typography>
            <Typography sx={{ color: "#e5e5e5" }}>
              Somos una comunidad de habla hispana, jugadores de Football
              Manager con mas de 10 años de antigüedad, que se unen para jugar
              una liga online con mas de 60 managers de todo el mundo, los
              cuales su objetivo es llevar a su equipo a la cima.
              <br />
              <br />
              En nuestros torneos, participan equipos de toda América, se arman
              torneos relampagos, debates de futbol y mas.
              <br />
              <br />
              Arma el equipo a tu gusto, contrata los jugadores que siempre
              deseaste, interactua con tecnicos de todo el mundo, y convierte a
              tu equipo en el mejor de la liga y del mundo.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </motion.div>
  );
};

const LigasMotion = ({ torneos }) => {
  const control = useAnimation();
  const [ref, inView] = useInView();

  React.useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);

  return (
    <motion.div
      ref={ref}
      variants={boxVariant}
      initial="hidden"
      animate={control}
    >
      <Grid container>
        <Grid
          xs={12}
          md={12}
          sx={{ backgroundColor: "#F0C40011", p: 5, my: 3, borderRadius: 5 }}
        >
          <Typography
            variant="h5"
            sx={{ color: "#e5e5e5", textAlign: "center", mb: 5 }}
          >
            Torneos y Competencias FM
          </Typography>
          <SectionLigaComponets torneos={torneos} />
        </Grid>
      </Grid>
    </motion.div>
  );
};

const ArrowMotion = ({ torneos }) => {
  return (
    <motion.div
      animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 180, 180, 0],
        borderRadius: ["0%", "0%", "50%", "50%", "0%"],
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 1,
      }}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={IconArrow} alt="bg" />
    </motion.div>
  );
};

const Home = () => {
  const { torneos } = useSelector((state) => state.torneos);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getTorneos());
  }, [dispatch]);

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

              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" sx={{ color: "#fff" }}>
                  Conocenos
                </Typography>
                <ArrowMotion />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box component="section" className="bgImage">
        <Box sx={{ backgroundColor: "#34333891 !important", px: 3, my: 1 }}>
          <BoxMotion />
          <LigasMotion torneos={torneos} />
        </Box>
      </Box>
      <Box
        component="section"
        sx={{ backgroundColor: "#34333891 !important", px: 3, my: 1 }}
      >
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ color: "#e5e5e5" }}>
              Unite a la comunidad
            </Typography>
            <Typography variant="body1" sx={{ color: "#e5e5e5" }}>
              Registrate y forma parte de la comunidad de Competiciones Online
              FM, donde podras interactuar con otros managers de todo el mundo,
              compartir tus experiencias, y mucho mas y convertirte en el mejor
              manager de la comunidad.
            </Typography>

            <Button
              variant="contained"
              color="secondary"
              sx={{ mt: 2, fontSize: 20 }}
            >
              <span style={{ marginRight: "13px" }}>Inscríbete</span>
              <img w src={IconContrato} alt="contrato" />
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* widget de discord */}
            <iframe
              title="discord"
              src="https://discord.com/widget?id=703697712138420255&theme=dark"
              width="100%"
              height="500"
              allowTransparency="true"
              frameBorder="0"
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            ></iframe>
          </Grid>
        </Grid>
      </Box>
      <Box component="aside" sx={{ backgroundColor: "#34333891 !important" }}>
        <Box sx={{ px: 3, my: 1 }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ color: "#e5e5e5" }}>
                Seguinos en nuestras redes sociales
              </Typography>
              <Typography variant="body1" sx={{ color: "#e5e5e5" }}>
                Seguinos en nuestras redes sociales para estar al tanto de las
                ultimas novedades de Competiciones Online FM. Donde podras
                interactuar con otros managers de todo el mundo, compartir tus
                experiencias, y mucho mas
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <IconButton
                  size="large"
                  variant="contained"
                  color="secondary"
                  sx={{ mr: 2 }}
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton
                  size="large"
                  variant="contained"
                  color="secondary"
                  sx={{ mr: 2 }}
                >
                  <TwitterIcon />
                </IconButton>
                <IconButton
                  size="large"
                  variant="contained"
                  color="secondary"
                  sx={{ mr: 2 }}
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton
                  size="large"
                  variant="contained"
                  color="secondary"
                  sx={{ mr: 2 }}
                >
                  <YouTubeIcon  />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Home;
