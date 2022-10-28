import {
  Avatar,
  Box,
  Checkbox,
  Chip,
  Divider,
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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: theme.spacing(1),
  borderRadius: "5px",
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const GoleadoresComponents = ({ visitante, setSearchVisitante }) => {
  console.log("VISITANTE EN GOLEADORES", visitante);

  const [goleadorVisitante, setGoleadorVisitante] = React.useState([]);

  //que no se repitan los goleadores


  React.useEffect(() => {
    setGoleadorVisitante([]);
    setGoleadorVisitante(visitante);
  }, [visitante]);

  const handleDeleteChip = (jugador) => {
    console.info("You clicked the delete icon.");
    console.log("ID", jugador?.id);

    const goleadores = goleadorVisitante.filter((goleador) => {
      return goleador.id !== jugador?.id;
    });

    setGoleadorVisitante(goleadores);
    setSearchVisitante((prev) => {
      return [...prev, jugador];
    });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={6}
          lg={6}
          sx={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          <Item sx={{ display: "flex", maxHeight: "100%" }}></Item>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Item sx={{ display: "flex", maxHeight: "323px", overflow: "auto" }}>
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
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
                  <Grid item xs={6}>
                    <Typography sx={{ color: "white" }}>Goles</Typography>
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
          </Item>
        </Grid>
      </Grid>
    </>
  );
};

export default GoleadoresComponents;
