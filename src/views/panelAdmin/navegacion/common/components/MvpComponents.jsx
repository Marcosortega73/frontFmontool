import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Chip,
  Divider,
  Fab,
  Grid,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Paper,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "./stylesComponents.css";

import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

import SaveIcon from "@mui/icons-material/Save";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: theme.spacing(1),
  borderRadius: "5px",
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "100% !important",
}));

const MvpComponents = ({
  setSearchVisitante,
  setSearchLocal,
  jugador,
  setJugador,
}) => {
  console.log("VISITANTE EN MVP", jugador);

  const [mvp, setMvp] = React.useState([]);
  const [mvpLocal, setMvpLocal] = React.useState([]);

  //que no se repitan los goleadores

  React.useEffect(() => {
    setMvp([]);
    setMvp(jugador);
  }, [jugador]);

  const handleDeleteChip = (jugador) => {
    console.info("You clicked the delete icon.");
    console.log("ID", jugador?.id);

    const goleadores = mvp.filter((goleador) => {
      return goleador.id !== jugador?.id;
    });
    console.log("goleadores visitante delete", goleadores);

    setMvp(goleadores);

    setSearchVisitante((prev) => {
      return [...prev, jugador];
    });
  };

  const handleDelete = (jugador) => {
    console.info("You clicked the delete icon.");
    console.log("ID", jugador?.id);
    const goleadores = mvpLocal.filter((goleador) => {
      return goleador.id !== jugador?.id;
    });
    setMvpLocal(goleadores);
    setSearchLocal((prev) => {
      return [...prev, jugador];
    });
  };

  return (
    <>
      <Grid container  sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mr: 1,
          }}>
        <Grid
          item
          xs={12}
          md={6}
          lg={6}
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Item sx={{ maxHeight: "323px", width: "100%", overflow: "auto" }}>
            {mvp !== {} ? (
              <Card sx={{ display: "flex",alignItems:"center", justifyContent:"center",width:"100%" }}>
                <Box sx={{ display: "flex", flexDirection: "column"}}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="h5">
                      {mvp.nombre}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      Jugador del Partido
                    </Typography>
                  </CardContent>
                </Box>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image="https://thumbs.dreamstime.com/b/mvp-most-valuable-player-gold-badge-concept-champion-crown-above-luxury-styled-phrase-sport-cybersport-logotype-st-172146663.jpg"
                  alt="Jugador del Partido"
                />
              </Card>
            ) : (
              <>
                <ArrowCircleLeftIcon />
                <Typography sx={{ textAlign: "center", width: "100%" }}>
                  Selecione un jugador
                </Typography>
              </>
            )}
          </Item>
        </Grid>

        <Grid item xl={12} lg={12} md={12} xs={12} sx={{ mt: 2 }}>
              
              <Fab
       
                size="x-large"
                color="secondary"
                aria-label="add"
                sx={{
                  position: "absolute",
                  bottom: 16,
                  right: 423,
                }}
              >
               <SaveIcon />
              </Fab>
  
          </Grid>
      </Grid>
    </>
  );
};

export default MvpComponents;
