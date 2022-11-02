import {
  Avatar,
  Divider,
  Fab,
  Grid,
  IconButton,
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

import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

import SaveIcon from "@mui/icons-material/Save";
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

const AsistenciasComponents = ({ visitante, setSearchVisitante,local,setSearchLocal,setSelectedVisitante,setSelectedLocal,dataItemSelect,asistentes,setAsistentes }) => {
  console.log("VISITANTE EN Asistencias", visitante);

  const [asistenciasVisitante, setAsistenciasVisitante] = React.useState([]);
  const [asistenciasLocal, setAsistenciasLocal] = React.useState([]);

  //que no se repitan los asistentees


  React.useEffect(() => {
    setAsistenciasVisitante([]);
    setAsistenciasLocal([]);
    setAsistenciasVisitante(visitante);
    setAsistenciasLocal(local);
  }, [visitante,local]);

  const handleDeleteChip = (jugador) => {
    console.info("You clicked the delete icon.");
    console.log("ID", jugador?.id);

    const asistentees = asistenciasVisitante.filter((asistente) => {
      return asistente.id !== jugador?.id;
    });
    console.log("asistentees visitante delete", asistentees);
    
    setAsistenciasVisitante(asistentees);

    setSearchVisitante((prev) => {
      return [...prev, jugador];
    });

    setSelectedVisitante(asistentees);
  };

  const handleDeleteChipLocal = (jugador) => {
    console.info("You clicked the delete icon.");
    console.log("ID", jugador?.id);
    const asistentees = asistenciasLocal.filter((asistente) => {
      return asistente.id !== jugador?.id;
    });

    setAsistenciasLocal(asistentees);

    setSearchLocal((prev) => {
    return [...prev, jugador];
    });

    setSelectedLocal(asistentees);
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
    asistentees?.map((asistente) => {
      if (asistente?.jugador_id === jugador?.id) {
        suma = suma + parseInt(e.target.value);
      } else {
        suma = suma + parseInt(asistente?.goles);
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

    const existe = asistentes.find((asistente) => {

      return asistente.jugador_id === jugador;

    });

    console.log("existe", existe);

    if (existe) {

      const asistentesFiltrados = asistentes.filter((asistente) => {
        return asistente.jugador_id !== jugador;
      });

      console.log("asistentesFiltrados", asistentesFiltrados);
      setAsistentes([
        ...asistentesFiltrados,
        {
          jugador_id: jugador,
          goles: e.target.value,
        },
      ]);
    } else {
      setAsistentes([
        ...asistentes,
        {
          jugador_id: jugador,
          goles: e.target.value,
        },
      ]);
    }
    console.log("asistentesss", asistentes);
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
    asistentes?.map((asistente) => {
      if (asistente?.jugador_id === jugador?.id) {
        suma = suma + parseInt(e.target.value);
      } else {
        suma = suma + parseInt(asistente?.goles);
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

    const existe = asistentes.find((asistente) => {

      return asistente.jugador_id === jugador;

    });

    console.log("existe", existe);

    if (existe) {

      const asistentesFiltrados = asistentes.filter((asistente) => {
        return asistente.jugador_id !== jugador;
      });

      console.log("asistentesFiltrados", asistentesFiltrados);
      setAsistentes([
        ...asistentesFiltrados,
        {
          jugador_id: jugador,
          goles: e.target.value,
        },
      ]);
    } else {
      setAsistentes([
        ...asistentes,
        {
          jugador_id: jugador,
          goles: e.target.value,
        },
      ]);
    }
    console.log("asistentesss", asistentes);
  };



  return (
    <>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={6}
          lg={6}
          sx={{ height: "100%", display: "flex", flexDirection: "column",width:"100%",alignItems:"center", justifyContent:"center" }}
        >
         <Item sx={{ display: "flex", maxHeight: "323px", overflow: "auto"}}>
            {asistenciasLocal?.length > 0 ? (
              
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
                  <Grid item xs={6} align="right">
                    <Typography sx={{ pl: 1, color: "white" }}>
                     Asistencias
                    </Typography>
                  </Grid>
                </Grid>
              </ListSubheader>
              {asistenciasLocal?.map((jugador, index) => {
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
                              name={jugador.id.toString()}
                              onChange={(e)=>{handleChangeLocal(e,jugador.id)}}
                            />
                          <IconButton onClick={
                            () => handleDeleteChipLocal(jugador)
                          } edge="end" aria-label="delete">
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
        
          <Item  className="estemolesta" sx={{ display: "flex", maxHeight: "323px", overflow: "auto" }}>
          {asistenciasVisitante?.length > 0 ? (
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
                  <Grid item xs={6} align="left">
                    <Typography sx={{ pl: 1, color: "white" }}>
                      Asistencias
                    </Typography>
                  </Grid>
                </Grid>
              </ListSubheader>
              {asistenciasVisitante?.map((jugador, index) => {
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
                              name={jugador.id.toString()}
                              onChange={(e)=>{handleChangeVisitante(e,jugador.id)}}
                            />
                          <IconButton onClick={
                            () => handleDeleteChip(jugador)
                          } edge="end" aria-label="delete">
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
          ) : (<>
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

export default AsistenciasComponents;
