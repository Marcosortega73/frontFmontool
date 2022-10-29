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

import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

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

const LesionNaranjaComponents = ({ visitante, setSearchVisitante,local,setSearchLocal,setSelectedVisitante,setSelectedLocal }) => {
  console.log("VISITANTE EN Lesion Naranja", visitante);

  const [lesionNaranjaVisitante, setLesionNaranjaVisitante] = React.useState([]);
  const [lesionNaranjaLocal, setLesionNaranjaLocal] = React.useState([]);

  //que no se repitan los goleadores


  React.useEffect(() => {
    setLesionNaranjaVisitante([]);
    setLesionNaranjaLocal([]);
    setLesionNaranjaVisitante(visitante);
    setLesionNaranjaLocal(local);
  }, [visitante,local]);

  const handleDeleteChip = (jugador) => {
    console.info("You clicked the delete icon.");
    console.log("ID", jugador?.id);

    const goleadores = lesionNaranjaVisitante.filter((goleador) => {
      return goleador.id !== jugador?.id;
    });
    console.log("goleadores visitante delete", goleadores);
    
    setLesionNaranjaVisitante(goleadores);

    setSearchVisitante((prev) => {
      return [...prev, jugador];
    });

    setSelectedVisitante(goleadores);
  };

  const handleDeleteChipLocal = (jugador) => {
    console.info("You clicked the delete icon.");
    console.log("ID", jugador?.id);
    const goleadores = lesionNaranjaLocal.filter((goleador) => {
      return goleador.id !== jugador?.id;
    });

    setLesionNaranjaLocal(goleadores);

    setSearchLocal((prev) => {
    return [...prev, jugador];
    });

    setSelectedLocal(goleadores);
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
            {lesionNaranjaLocal?.length > 0 ? (
              
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
              {lesionNaranjaLocal?.map((jugador, index) => {
                //cantidad de gole
                return (
                  <>
                    <ListItem
                      key={index}
                      sx={{ p: 0.5 }}
                      secondaryAction={
                        <>
                          
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
        
          <Item sx={{ display: "flex", maxHeight: "323px", overflow: "auto" }}>
          {lesionNaranjaVisitante?.length > 0 ? (
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
              {lesionNaranjaVisitante?.map((jugador, index) => {
                //cantidad de gole
                return (
                  <>
                    <ListItem
                      key={index}
                      sx={{ p: 0.5 }}
                      secondaryAction={
                        <>
                          
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
        <Grid item xl={4} lg={4} md={4} xs={6} sx={{ mt: 2 }}>
              
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

export default LesionNaranjaComponents;
