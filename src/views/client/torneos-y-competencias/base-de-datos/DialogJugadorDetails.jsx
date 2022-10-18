import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import grafico from "../../../../assets/images/jugadores/analisisGraficoAtributos.png";

import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box, Container } from "@mui/system";

import Silueta from "../../../../assets/images/persons/silueta.png";
import TableHabilidades from "./component/TableHabilidades";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Img = styled("img")({
  width: "33%",
  height: "33%",
});

const ImgSm = styled("img")({
  width: "10%",
  height: "10%",
});

const ImgLogo = styled("img")({
  width: "33%",
  height: "33%",
});
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  height: 123,

}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: "flex-start",
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  // Override media queries injected by theme.mixins.toolbar
  "@media all": {
    minHeight: 128,
  },
}));

export default function DialogJugadorDetails({ open, setOpen, jugador }) {
  console.log("Mirando Jugador en el Cliente Detail", jugador);

  console.log("IMAGEN",jugador?.Equipo?.idFmrte);

  const formatterDolar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  });

  const habilidadesTecnicas = [
    {
      nombre: "Pases",
      valor: jugador.pases,
    },
    {
      nombre: "Cabeceo",
      valor: jugador.rematesCabeza,
    },
    {
      nombre: "Centros",
      valor: jugador.centros,
    },
    {
      nombre: "Primer Toque",
      valor: jugador.primerToque,
    },
    {
      nombre: "Entradas",
      valor: jugador.entradas,
    },
    {
      nombre: "Marcaje",
      valor: jugador.marcaje,
    },
    {
      nombre: "Penaltis",
      valor: jugador.penalty,
    },
    {
      nombre: "Regate",
      valor: jugador.regate,
    },
    {
      nombre: "Remate",
      valor: jugador.remate,
    },
    {
      nombre: "Córners",
      valor: jugador.corners,
    },
    {
      nombre: "Saques Largos",
      valor: jugador.saquesLargoLateral,
    },
    {
      nombre: "Técnica",
      valor: jugador.tecnica,
    },
    {
      nombre: "Tiros Lejanos",
      valor: jugador.tirosLejanos,
    },
    {
      nombre: "Tiros Libres",
      valor: jugador.lanzadorFaltas,
    },
  ];
  const habilidadesMentales = [
    {
      nombre: "Agresividad",
      valor: jugador.agresividad,
    },
    {
      nombre: "Anticipación",
      valor: jugador.anticipacion,
    },
    {
      nombre: "Colocación",
      valor: jugador.colocacion,
    },
    {
      nombre: "Concentración",
      valor: jugador.concentracion,
    },
    {
      nombre: "Deciciones",
      valor: jugador.deciciones,
    },
    {
      nombre: "Desmarques",
      valor: jugador.desmarques,
    },
    {
      nombre: "Determinación",
      valor: jugador.determinacion,
    },
    {
      nombre: "Juego en Equipo",
      valor: jugador.trabajoEquipo,
    },
    {
      nombre: "Liderazgo",
      valor: jugador.influencia,
    },
    {
      nombre: "Sacrificio",
      valor: jugador.lucha,
    },
    {
      nombre: "Serenidad",
      valor: jugador.serenidad,
    },
    {
      nombre: "Talento",
      valor: jugador.talento,
    },
    {
      nombre: "Valentia",
      valor: jugador.valentia,
    },
    {
      nombre: "Visión",
      valor: jugador.creatividad,
    },
  ];
  const habilidadesFisicas = [
    {
      nombre: "Aceleración",
      valor: jugador.aceleracion,
    },
    {
      nombre: "Agilidad",
      valor: jugador.agilidad,
    },
    {
      nombre: "Alcance de Salto",
      valor: jugador.salto,
    },
    {
      nombre: "Equilibrio",
      valor: jugador.equilibrio,
    },
    {
      nombre: "Fuerza",
      valor: jugador.fuerza,
    },
    {
      nombre: "Recuperación Física",
      valor: jugador.formaNatural,
    },
    {
      nombre: "Resistencia",
      valor: jugador.resistencia,
    },
    {
      nombre: "Velocidad",
      valor: jugador.velocidad,
    },
  ];

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {jugador?.nombre}
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <AppBar position="static">
          <StyledToolbar sx={{ maxHeight: 200,pt:2.5,backgroundColor:"primary.main" }}>
            <Grid container spacing={3} sx={{ maxHeight: 200}}>
              <Grid item xs={4}>
                <Item>
                  <Card
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      height: 123,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography component="div" variant="h6">
                          Datos Personales
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          component="div"
                        >
                          <strong>Nombre: </strong>
                          {jugador?.nombre}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          component="div"
                        >
                          <strong>Edad: </strong>
                          {jugador?.edad + " años"}
                        </Typography>

                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          component="div"
                          sx={{ display: "flex", pt: 0.1 }}
                        >
                          <strong>Nacionalidad: </strong>
                          <ImgSm
                            sx={{ px: 1 }}
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1200px-Flag_of_Argentina.svg.png"
                            alt="Bandera Nacion"
                          />
                          <span>
                            {jugador?.Nacionalidad?.gentilicio?.toUpperCase()}
                            {jugador?.id}
                          </span>
                        </Typography>
                      </CardContent>
                    </Box>
                    <CardMedia
                      component="img"
                      sx={{ width: 151 }}
                      // eslint-disable-next-line no-octal-escape
                      image={`/public/images/Faces/${jugador?.id}.png`}
                      alt="Face Jugador"
                    />
                  </Card>
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item>
                  <Card
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      height: 123,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography component="div" variant="h6">
                          Contratado por
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          component="div"
                        >
                          {" "}
                          <strong>Equipo: </strong>
                          {jugador?.Equipo?.nombre}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          component="div"
                        >
                          <strong>Liga: </strong>
                          Ligue 1
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          component="div"
                          sx={{ display: "flex", pt: 0.1 }}
                        >
                          <strong>Pais: </strong>
                          <ImgSm
                            sx={{ px: 1 }}
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/270px-Flag_of_France.svg.png"
                            alt="Nacionalidad Equipo"
                          />
                          <span>
                            {jugador?.Equipo?.Nacionalidad?.nombre?.toUpperCase()}
                          </span>
                        </Typography>
                      </CardContent>
                    </Box>
                    <CardMedia
                      component="img"
                      sx={{ width: 151 }}
                      image={`/graphics/logos/${jugador?.Equipo?.Nacionalidad?.nombre}/Clubs/normal/${jugador?.Equipo?.id&&jugador.Equipo.idFmrte}.png`}
              
                      alt="Logo Equipo"
                    />
                  </Card>
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item>
                  <Card
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      height: 123,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <CardContent
                        sx={{
                          flex: "1 0 auto",
                          pr: 0,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography component="div" variant="h6">
                          Ojeo Rapido
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          component="div"
                        >
                          <strong>Posiciones: </strong>
                          {jugador?.posiciones}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          component="div"
                        >
                          {/* TODO: Agregar pie como atributo del jugador  */}
                          <strong>Pierna Buena: </strong>
                          Zurda
                        </Typography>
                        {/*         <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          component="div"
                          sx={{ display: "flex" }}
                        >
                          <strong style={{ paddingRight: "3px" }}>
                            Altura:{" "}
                          </strong>
                          <span>{jugador?.altura + " cm"}</span>
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          component="div"
                          sx={{ display: "flex" }}
                        >
                          <strong
                            style={{paddingRight: "3px" }}
                          >
                            Peso:{" "}
                          </strong>
                          <span>{jugador?.peso + " kg"}</span>
                        </Typography> */}
                      </CardContent>
                    </Box>
                    <CardContent>
                      {" "}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <Chip
                          variant="filled"
                          color="secondary"
                          label={"Calidad Actual: " + jugador?.ca}
                          size="small"
                          sx={{ mb: 1 }}
                        />
                        <Chip
                          variant="filled"
                          color="secondary"
                          label={"Calidad Potencial: " + jugador?.cp}
                          size="small"
                          sx={{ mb: 1 }}
                        />
                        <Chip
                          variant="filled"
                          color="primary"
                          size="small"
                          label={
                            jugador && formatterDolar.format(jugador.valor)
                          }
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Item>
              </Grid>
            </Grid>
          </StyledToolbar>
        </AppBar>
        <Box
          sx={{
            width: "100%",
            my: 3,
            mb:3,
            height: "90%",
          }}
        >
          <Grid
            container
            spacing={3}
            sx={{
              width: "100%",
              height: "100%",
              mb:3,
            }}
          >
            <Grid item xs={4}>
              <Item
                sx={{
                  width: "100%",
                  height: "100%",
                  ml:2.4,
                  backgroundColor: "primary.main",
                }}
              >
                <Card
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    height: "75%",
                    p:2,
                   
                  }}
                >
                  <CardMedia
                    component="img"
                    image={grafico}
                    alt="Grafico Atributos"
                    sx={{ borderRadius: "10px",}}
                  />
                </Card>
              </Item>
            </Grid>
            <Grid item xs={8}>
              <Item
                sx={{
                  width: "100%",
                  backgroundColor: "primary.main",
                  height: "100%",
                  mx:2,
                  mr:2
                }}
              >
                <Card
                  sx={{
                    backgroundColor: "primary.main",
                  }}
                >
                  <Typography
                    variant="h6"
                    color="white"
                    component="div"
                    align="center"
                  >
                    Atributos
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      height: "100%",
                    }}
                  >
                    <Item
                      sx={{
                        width: "100%",
                        height: "100%",
                        mr: 2,
                        ml: 2,
                      }}
                    >
                      <CardContent>
                        {" "}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alingItem: "center",
                          }}
                        >
                          <TableHabilidades
                            type="Técnicos"
                            rows={habilidadesTecnicas}
                          />
                        </Box>
                      </CardContent>
                    </Item>
                    <Item
                      sx={{
                        width: "100%",
                        height: "100%",
                        mr: 2,
                      }}
                    >
                      <CardContent>
                        {" "}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alingItem: "center",
                          }}
                        >
                          <TableHabilidades
                            type="Mentales"
                            rows={habilidadesMentales}
                          />
                        </Box>
                      </CardContent>
                    </Item>
                    <Item
                      sx={{
                        width: "100%",
                        height: "100%",
                        mr: 2,
                      }}
                    >
                      <CardContent>
                        {" "}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alingItem: "center",
                          }}
                        >
                          <TableHabilidades
                            type="Físicos"
                            rows={habilidadesFisicas}
                          />
                        </Box>
                      </CardContent>
                    </Item>
                  </Box>
                </Card>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </div>
  );
}
