import {
  Avatar,
  Box,
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
import { Controller, useFieldArray, useForm } from "react-hook-form";
import estadisticasServices from "../../../../../services/api/estadisticas/estadisticasService";
import Swal from "sweetalert2";

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

const GoleadoresComponents = ({
  visitante,
  setSearchVisitante,
  local,
  setSearchLocal,
  setSelectedVisitante,
  setSelectedLocal,
  partido,
  torneo,
  setGoleadores,
  goleadores,
  dataItemSelect,
}) => {
  console.log("VISITANTE EN GOLEADORES", visitante);

  const [goleadorVisitante, setGoleadorVisitante] = React.useState([]);
  const [goleadorLocal, setGoleadorLocal] = React.useState([]);
  const [resetGoles, setResetGoles] = React.useState(0);

  //que no se repitan los goleadores

  React.useEffect(() => {
    setGoleadorVisitante([]);
    setGoleadorLocal([]);
    setGoleadorVisitante(visitante);
    setGoleadorLocal(local);
  }, [visitante, local]);

  const handleDeleteChip = (jugador) => {
    console.info("You clicked the delete icon.");
    console.log("ID", jugador?.id);

    const goleadores = goleadorVisitante.filter((goleador) => {
      return goleador.id !== jugador?.id;
    });
    console.log("goleadores visitante delete", goleadores);

    setGoleadorVisitante(goleadores);

    setSearchVisitante((prev) => {
      return [...prev, jugador];
    });

    setSelectedVisitante(goleadores);
  };

  const handleDeleteChipLocal = (jugador) => {
    console.info("You clicked the delete icon.");
    console.log("ID", jugador?.id);
    const goleadores = goleadorLocal.filter((goleador) => {
      return goleador.id !== jugador?.id;
    });

    setGoleadorLocal(goleadores);

    setSearchLocal((prev) => {
      return [...prev, jugador];
    });

    setSelectedLocal(goleadores);
  };

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm(
    {
      defaultValues: {
        infoPartido: [
          {
            partido_id: partido,
            torneo_id: torneo,
          },
        ],
      },
    },
    {
      mode: "onBlur",
    }
  );
  //useFieldArray

  const onSubmit = async (data) => {
    //unir los goleadores
    console.log("goleadorsdadasdases", data);
    console.log("data goleador",goleadores); // { test: ['test', 'test'] }
  };

  const handleChangeLocal = (e,jugador) => {


    console.log("e", e,jugador);
    console.log("dataItemSelect", dataItemSelect);
    //si es mayor a la cantidad de goles
    
    if (e.target.value > dataItemSelect?.goles_local) {
      console.log("ESSSSSSSSSSSSS MAAAAAAAAYYYYYYYYYYYPPOOOOOOOOOOR")
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No puede ingresar un numero mayor a la cantidad de goles",
        customClass: {
          container: "swal-overlay",
        },
        
      });
      return;
    }

    //si es menor que 0
    if (e.target.value < 0) {
      console.log("ESSSSSSSSSSSSS MEEEEEEEEENOOOOOOOOOOOR")
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No puede ingresar un numero menor a 0",
        customClass: {
          container: "swal-overlay",
        },

      });
      return;
    }

 /*    //si la suma de los goles es mayor a la cantidad de goles
    let suma = 0;
    goleadores?.map((goleador) => {
      if (goleador?.jugador_id === jugador?.id) {
        suma = suma + parseInt(e.target.value);
      } else {
        suma = suma + parseInt(goleador?.goles);
      }
    });

    console.log("suma", suma);

    if (suma > dataItemSelect?.goles_local) {
      console.log("ESSSSSSSSSSSSS MAAAAAAAAYYYYYYYYYYYPPOOOOOOOOOOR")
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No puede ingresar un numero mayor sunma a la cantidad de goles",
        customClass: {
          container: "swal-overlay",
        },

      });
      return;
    } */

    const existe = goleadores.find((goleador) => {

      return goleador.jugador_id === jugador;

    });

    console.log("existe", existe);

    if (existe) {

      const goleadoresFiltrados = goleadores.filter((goleador) => {
        return goleador.jugador_id !== jugador;
      });

      console.log("goleadoresFiltrados", goleadoresFiltrados);
      setGoleadores([
        ...goleadoresFiltrados,
        {
          jugador_id: jugador,
          goles: e.target.value,
        },
      ]);
    } else {
      setGoleadores([
        ...goleadores,
        {
          jugador_id: jugador,
          goles: e.target.value,
        },
      ]);
    }
    console.log("goleadoresss", goleadores);
  };
  const handleChangeVisitante = (e,jugador) => {


    console.log("e", e,jugador);
    console.log("dataItemSelect", dataItemSelect);
    //si es mayor a la cantidad de goles
    
    if (e.target.value > dataItemSelect?.goles_visitante) {
      console.log("ESSSSSSSSSSSSS MAAAAAAAAYYYYYYYYYYYPPOOOOOOOOOOR")
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No puede ingresar un numero mayor a la cantidad de goles",
        customClass: {
          container: "swal-overlay",
        },
        
      });
      return;
    }

    //si es menor que 0
    if (e.target.value < 0) {
      console.log("ESSSSSSSSSSSSS MEEEEEEEEENOOOOOOOOOOOR")
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No puede ingresar un numero menor a 0",
        customClass: {
          container: "swal-overlay",
        },

      });
      return;
    }

 /*    //si la suma de los goles es mayor a la cantidad de goles
    let suma = 0;
    goleadores?.map((goleador) => {
      if (goleador?.jugador_id === jugador?.id) {
        suma = suma + parseInt(e.target.value);
      } else {
        suma = suma + parseInt(goleador?.goles);
      }
    });

    console.log("suma", suma);

    if (suma > dataItemSelect?.goles_local) {
      console.log("ESSSSSSSSSSSSS MAAAAAAAAYYYYYYYYYYYPPOOOOOOOOOOR")
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No puede ingresar un numero mayor sunma a la cantidad de goles",
        customClass: {
          container: "swal-overlay",
        },

      });
      return;
    } */

    const existe = goleadores.find((goleador) => {

      return goleador.jugador_id === jugador;

    });

    console.log("existe", existe);

    if (existe) {

      const goleadoresFiltrados = goleadores.filter((goleador) => {
        return goleador.jugador_id !== jugador;
      });

      console.log("goleadoresFiltrados", goleadoresFiltrados);
      setGoleadores([
        ...goleadoresFiltrados,
        {
          jugador_id: jugador,
          goles: e.target.value,
        },
      ]);
    } else {
      setGoleadores([
        ...goleadores,
        {
          jugador_id: jugador,
          goles: e.target.value,
        },
      ]);
    }
    console.log("goleadoresss", goleadores);
  };


  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={6} sx={{ height: "100%" }}>
          <Item sx={{ display: "flex", maxHeight: "323px", overflow: "auto" }}>
            {goleadorLocal?.length > 0 ? (
              <List
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                  position: "relative",
                  overflow: "auto",
                  maxHeight: 323,
                  "& ul": { padding: 0 },
                }}
                subheader={<li />}
              >
                <ListSubheader sx={{ bgcolor: "primary.main" }}>
                  <Grid container>
                    <Grid item xs={6} align="left">
                      <Typography sx={{ pl: 1, color: "white" }}>
                        Nombre
                      </Typography>
                    </Grid>
                  </Grid>
                </ListSubheader>
                {goleadorLocal?.map((jugador, index) => {
                  //cantidad de gole
                  return (
                    <>
                      <ListItem
                        key={jugador.id}
                        sx={{ p: 0.5 }}
                        secondaryAction={
                          <>
                            <TextField
                              sx={{
                                width: "73px",
                                pl: 1,
                              }}
                              size="small"
                              id="outlined-number"
                              type="number"
                              edge="end"
                              name={jugador.id.toString()}
                              onChange={(e)=>{handleChangeLocal(e,jugador.id)}}
                            />
                            <IconButton
                              onClick={() => handleDeleteChipLocal(jugador)}
                              edge="end"
                              aria-label="delete"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </>
                        }
                        disablePadding
                      >
                        <ListItemButton>
                          <ListItemAvatar>
                            <Avatar />
                          </ListItemAvatar>
                          <ListItemText
                            sx={{ maxWidth: "47%" }}
                            primary={jugador.nombre}
                          />
                        </ListItemButton>
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </>
                  );
                })}
              </List>
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
        <Grid item xs={12} md={6} lg={6}>
          <Item sx={{ display: "flex", maxHeight: "323px", overflow: "auto" }}>
            {goleadorVisitante?.length > 0 ? (
              <List
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                  position: "relative",
                  overflow: "auto",
                  maxHeight: 323,

                  "& ul": { padding: 0 },
                }}
                subheader={<li />}
              >
                <ListSubheader sx={{ bgcolor: "primary.main" }}>
                  <Grid container>
                    <Grid item xs={6} align="left">
                      <Typography sx={{ pl: 1, color: "white" }}>
                        Nombre
                      </Typography>
                    </Grid>
                  </Grid>
                </ListSubheader>
                {goleadorVisitante?.map((jugador, index) => {
                  //cantidad de gole
                  return (
                    <>
                      <ListItem
                        key={index}
                        sx={{ p: 0.5 }}
                        secondaryAction={
                          <>
                           <TextField
                              sx={{
                                width: "73px",
                                pl: 1,
                              }}
                              size="small"
                              id="outlined-number"
                              type="number"
                              edge="end"
                              placeholder="Gol"
                              name={jugador.id.toString()}
                              onChange={(e)=>{handleChangeVisitante(e,jugador.id)}}
                            />
                            <IconButton
                              onClick={() => handleDeleteChip(jugador)}
                              edge="end"
                              aria-label="delete"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </>
                        }
                        disablePadding
                      >
                        <ListItemButton>
                          <ListItemAvatar>
                            <Avatar />
                          </ListItemAvatar>
                          <ListItemText
                            sx={{ maxWidth: "47%" }}
                            primary={jugador.nombre}
                          />
                        </ListItemButton>
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </>
                  );
                })}
              </List>
            ) : (
              <>
                <Typography sx={{ textAlign: "center", width: "100%" }}>
                  Selecione un jugador
                </Typography>
                <ArrowCircleRightIcon />
              </>
            )}
          </Item>
        </Grid>
      </Grid>
    </>
  );
};

export default GoleadoresComponents;
