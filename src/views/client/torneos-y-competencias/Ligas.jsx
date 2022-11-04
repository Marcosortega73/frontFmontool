import { Box, Grid, Paper, Toolbar, Typography } from "@mui/material";
import React from "react";
//icons

import { useDispatch, useSelector } from "react-redux";
import { getTorneos } from "../../../redux/torneoSlice";

//TABS
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Img } from "../../../styles-components/Layout";
import { styled } from "@mui/material/styles";
import TableLigasClasificacionComponent from "./base-de-datos/component/TableLigasClasificacionComponent";
import FixtureComponent from "./base-de-datos/component/FixtureComponent";
import { getFixture } from "../../../redux/fixtureSlice";

import IconLiga from "../../../assets/images/iconos/liga.png";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  height: 123,
}));

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number,
};

const Ligas = () => {
  const dispatch = useDispatch();
  const { torneos } = useSelector((state) => state.torneos);
  const { fixture } = useSelector((state) => state.fixture);
  const [ligasData, setLigasData] = React.useState([]);
  const [value, setValue] = React.useState(0);
  const [fixtureData, setFixtureData] = React.useState([]);

  //tipo de torneo = 1 corresponde a los tipo de torneo "liga"

  const getLigas = () => {
    const torneosByTipo = torneos.filter((liga) => {
      return liga.tipo_id === 1;
    });

    console.log("TORNEO", torneosByTipo);

    setLigasData(torneosByTipo);

    console.log("liga data getLigas", ligasData);
  };

  const getFixtures = () => {
    setFixtureData(fixture);
    console.log("fixture data getFixtures", fixtureData);
  };

  React.useEffect(() => {
    dispatch(getTorneos());
    dispatch(getFixture());
  }, [dispatch]);

  React.useEffect(() => {
    getLigas();
    getFixtures();
  }, [torneos, fixture]); // eslint-disable-line react-hooks/exhaustive-deps

  console.log("torneos aqui", torneos);

  console.log("value", value);

  console.log("fixture", fixture);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%", backgroundColor: "customTheme.acento500",borderRadius:5 }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "center",
            mt: 2,
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {ligasData.map((liga, index) => {
              return (
                <Tab
                className="tab-opciones"
                  key={index}
                  label={liga.nombre}
                  onClick={() => {
                    console.log("liga", liga);
                    setValue(index);
                  }}
                  icon={
                    <Img
                      width={73}
                      height={73}
                      src={IconLiga}
                      alt="imagen"
                    />
                  }
                />
              );
            })}
          </Tabs>
        </Box>

        {ligasData?.map((liga, index) => {
          return (
            <TabPanel value={value} index={index} key={index}>
             {/*  <Toolbar
                variant="dense"
                sx={{
                  backgroundColor: "secondary.main",
                  px: "0px !important",

                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    height: "100%",
                    px: 32,
                  }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      flexGrow: 1,
                      textAlign: "start",
                      fontWeight: 700,
                    }}
                  >
                    {liga.nombre}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      flexGrow: 1,
                      textAlign: "end",
                      fontWeight: 700,
                    }}
                  >
                    {liga?.Season.nombre}
                  </Typography>
                </div>
              </Toolbar> */}
              <Grid container spacing={2} elevation="0">
                <Grid item xs={12} md={8}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "primary.main",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        borderRadius: 3,
                      }}
                    >
                      <Toolbar
                        sx={{
                          backgroundColor: "primary.main",
                          color: "#fff",
                          display: "flex",
                          justifyContent: "flex-start",
                          minHeight: "37px !important",
                          pt: 1,
                          borderLeft: "5px solid #fff",
                          borderTopLeftRadius: 7,
                        }}
                      >
                        <Typography variant="h6" component="div" align="center">
                          Tabla de posiciones
                        </Typography>
                      </Toolbar>
                      <Box sx={{ width: "100%", height: "100%" }}>
                        <TableLigasClasificacionComponent
                          equipos={ligasData[index]?.Equipos}
                          liga={ligasData[index]}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      elevation: 0,
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <FixtureComponent liga={ligasData[index]} />
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
          );
        })}
      </Box>
    </>
  );
};

export default Ligas;
