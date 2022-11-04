import {
  Badge,
  Box,
  Chip,
  CircularProgress,
  Divider,
  Pagination,
  Stack,
} from "@mui/material";
import React from "react";
import FixtureServices from "../../../../../services/api/fixture/fixtureService";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";

const Item = styled("div")(({ theme }) => ({
  backgroundColor: "#E0E0E0",
  width:"97%",
  borderRadius: "10px",
}));

const FixtureComponent = ({ liga }) => {
  const [fixtureBytorneo, setFixtureBytorneo] = React.useState([]);
  const [progress, setProgress] = React.useState(false);
  //borrar
  const [dense, setDense] = React.useState(false);
  //Esto

  //pagination
  const [fecha, setFecha] = React.useState(1);

  const fechasTotales = (liga?.total_de_equipos - 1) * liga?.rondas;

  const getFixtureByTorneo = async () => {
   
    const response = await FixtureServices.getFilterFixtureService(
      liga?.id,
      fecha
    );
    setFixtureBytorneo(response?.rows);
    console.log("fixtureBytorneo", fixtureBytorneo);
    setProgress(false);
  };

  const handleChangePage = (event, newPage) => {
    setFecha(newPage);
  };

  React.useEffect(() => {
    setProgress(true);
    getFixtureByTorneo();
  }, [liga, fecha]); // eslint-disable-line react-hooks/exhaustive-deps

  console.log("liga fixture", liga);
  console.log("FIXTURE VBYYBYB", fixtureBytorneo);
  console.log("fechasTotales", fechasTotales);

  return (
    <>
      {progress ? (
        <Box  sx={{ backgroundColor: "primary.main", p: 0, m: 0, borderRadius:3 ,width: "100%",height:"100%",display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <Box
          sx={{ backgroundColor: "primary.main", p: 0, m: 0, borderRadius:3 ,width: "100%",height:"100%",display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}
        >
          <Box sx={{ width: "100%",height:"100%", backgroundColor: "primary.main",borderRadius:3 }}>
          <Toolbar
            sx={{
              color: "#fff",
              display: "flex",
              justifyContent: "space-between",
              minHeight: "37px !important",
              pb: 1.2,
              pt: 1.2,
              borderTopLeftRadius: 7,
              width: "90%",
              borderLeft: "5px solid #fff",
              
            }}
          >
            <Typography variant="h6" component="div" >
              {fixtureBytorneo?.length > 0 ? "Fixture" : "No hay fixture"}
            </Typography>
            <Typography variant="h6" component="div"  sx={{}}>
              Fecha: {fecha}
            </Typography>
          </Toolbar>

          </Box>
          <Item>
            
            <Divider />
            <List dense={dense} sx={{pb:0}}>
              {fixtureBytorneo?.map((fixture, index) => {
                if(fixture.torneo_id === liga.id){
                return (
                  <Box sx={{ borderRadius: 5 }} key={index}>
                    <ListItem
                      sx={{ p: "0 !important", pl: ".8rem !important" }}
                      secondaryAction={
                        <ListItemAvatar
                          edge="end"
                          aria-label="visitante"
                          sx={{
                            display: "flex",
                            justifyContent: "end",
                            alignItems: "center",
                          }}
                        >
                          {fixture?.estado !== "Terminado" ? (
                            <>
                              <Chip
                                size="small"
                                variant="outlined"
                                sx={{ mr: "1.1rem" }}
                                label="vs"
                              />
                            </>
                          ) : (
                            <>
                              <Chip
                                size="small"
                                variant="contained"
                                color="primary"
                                sx={{ mr: ".3rem" }}
                                label={fixture?.goles_local}
                              />
                              -
                              <Chip
                                size="small"
                                variant="contained"
                                color="primary"
                                sx={{ mr: "1.1rem", ml: ".3rem" }}
                                label={fixture?.goles_visitante}
                              />
                            </>
                          )}
                          <img
                            width="33"
                            height="37"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_H3XbnPRAO1IzoLDdEAhDfAQ9NP7ebk_DBzbF6_2oRzAPXSrNW1cmyJvM2qLYgz08N2M&usqp=CAU"
                            alt="logo"
                          />
                        </ListItemAvatar>
                      }
                    >
                      <ListItemAvatar aria-label="local">
                        <img
                          width="33"
                          height="37"
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/CA_river_plate_logo.svg/1200px-CA_river_plate_logo.svg.png"
                          alt="logo"
                        />
                      </ListItemAvatar>
                      <ListItemText
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width: "50%",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "3px",
                          }}
                        >
                          <Chip size="small" label={fixture?.local?.nombre_corto} />
                        </div>
                        <div>
                          <Chip
                            size="small"
                            label={fixture?.visitante?.nombre_corto}
                          />
                        </div>
                      </ListItemText>
                    </ListItem>
                    <Divider component="li" />
                  </Box>
                );
                        }
              })}
            </List>
          </Item>
          <Stack spacing={2} sx={{ py: 3 }}>
            <Pagination
              count={fechasTotales}
              defaultPage={fecha}
              sx={{
                ".MuiPaginationItem-root": {
                  color: "white !important",
                },
              }}
              color="secondary"
              onChange={handleChangePage}
            />
          </Stack>
        </Box>
      )}
    </>
  );
};

export default FixtureComponent;
