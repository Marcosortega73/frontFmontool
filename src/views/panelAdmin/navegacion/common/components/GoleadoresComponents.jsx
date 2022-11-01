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
}) => {
  console.log("VISITANTE EN GOLEADORES", visitante);

  const [goleadorVisitante, setGoleadorVisitante] = React.useState([]);
  const [goleadorLocal, setGoleadorLocal] = React.useState([]);
  const [goleador, setGoleador] = React.useState([]);

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

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "cantidad", // unique name for your Field Array
    }
  );

  const onSubmit = async (data) => {
    //unir los goleadores
    console.log("goleadorsdadasdases", data)
    console.log("data goleador", goleador); // { test: ['test', 'test'] }

    /*  await estadisticasServices.createEstadisticaservice(formData).then((res) => {

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Estadisticas creadas correctamente",
        showConfirmButton: false,
        timer: 1500,
    }).catch((err) => {
      console.log(err);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error al crear las estadisticas",
        showConfirmButton: false,
        timer: 1500,
      });
        
    });
  }); */
  };

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} style={{margin:0,padding:0}}>
      <Grid container spacing={2}>
        
          <Grid item xs={12} md={6} lg={6} sx={{ height: "100%" }}>
            <Item
              sx={{ display: "flex", maxHeight: "323px", overflow: "auto" }}
            >
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
                                name="gol"
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
            <Item
              sx={{ display: "flex", maxHeight: "323px", overflow: "auto" }}
            >
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
                              <Controller
                                name={`cantidad[${index}]`}
                                control={control}
                                render={({ field }) => (
                                  <Input
                                    size="small"
                                    id="outlined-number"
                                    type="number"
                                    edge="end"
                                    onChange={(_, values) => {
                                      field.onChange(
                                        setGoleador((values)
                                        )
                                      );
                                    }}
                                    sx={{
                                      width: "73px",
                                      pl: 1,
                                    }}
                                    {...field}
                                  />
                                )}
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
          <Grid item xl={4} lg={4} md={4} xs={6} sx={{ mt: 2 }}>
            <Fab
              type="submit"
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
       </form>
    </>
  );
};

export default GoleadoresComponents;
