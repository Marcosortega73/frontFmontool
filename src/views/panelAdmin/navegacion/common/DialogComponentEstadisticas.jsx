import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { styled } from "@mui/material/styles";

import Paper from "@mui/material/Paper";
import SaveIcon from "@mui/icons-material/Save";
import { useSelector } from "react-redux";
import Chip from "@mui/material/Chip";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SquareIcon from "@mui/icons-material/Square";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import StarsIcon from "@mui/icons-material/Stars";

import EventIcon from "@mui/icons-material/Event";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

//CONSTRUCCION DEL FORM
import { useForm } from "react-hook-form";
import { FormText } from "../../../../components/forms/imputs/FormText";

import IconoAsistensias from "../../../../assets/images/iconos/Asistencias.png";

import {
  Container,
  Grid,
  Typography,
  Toolbar,
  Stack,
  Divider,
  AppBar,
  IconButton,
  Box,
  Fab,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
} from "@mui/material";
import Swal from "sweetalert2";
import FormDate from "../../../../components/forms/imputs/FormDate";
import { AddIcCallOutlined } from "@mui/icons-material";
import GoleadoresComponents from "./components/GoleadoresComponents";
import AsistenciasComponents from "./components/AsistenciasComponents";
import TarjetaRojaComponents from "./components/TarjetaRojaComponents";
import TarjetaAmarillaComponents from "./components/TarjetaAmarillaComponents";
import LesionNaranjaComponents from "./components/LesionNaranjaComponents";
import LesionRojaComponents from "./components/LesionRojaComponents";
import MvpComponents from "./components/MvpComponents";

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: theme.spacing(1),
  borderRadius: "5px",
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogComponentEstadisticas(props) {
  const { open, setOpen, action, dataItemSelect } = props;
  const [valueTab, setValueTab] = React.useState(0);

  console.log("action", action);
  console.log("dataItemSelect", dataItemSelect);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const onSubmit = async (formValue) => {
    console.log(formValue);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "#546e7a",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              Estadisticas
            </IconButton>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Save
            </Button>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            p: 3,
            pt: 0,
            backgroundColor: "primary.main",
            width: "100%",
            height: "100%",
          }}
        >
          <Item
            sx={{
              mt: 0,
              pt: 0,
              borderRadius: 0,
              borderBottomLeftRadius: "14px",
              borderBottomRightRadius: "14px",
              height: "100%",
            }}
          >
            <Box sx={{ height: "100%" }}>
              <Stack
                direction="row"
                divider={
                  <Divider
                    sx={{
                      border: "solid 5px #546e7a",
                      backgroundColor: "secondary.main",
                    }}
                    orientation="vertical"
                    flexItem
                  />
                }
                spacing={2}
                sx={{ width: "100%", height: "100%" }}
              >
                <Item
                  sx={{
                    width: "30%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    m: 0,
                    height: "100%",
                  }}
                >
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                      position: "relative",
                      overflow: "auto",
                      maxHeight: 300,
                      "& ul": { padding: 0 },
                    }}
                    subheader={<li />}
                  >
                    {dataItemSelect?.local.Jugadors.map((sectionId) => (
                      <li key={sectionId.id}>
                        <ul>
                            <ListItem >
                              <ListItemText primary={sectionId.nombre} />
                            </ListItem>
                        </ul>
                      </li>
                    ))}
                  </List>
                </Item>
                <Item sx={{ width: "70%", height: "100%" }}>
                  <Grid
                    container
                    spacing={1}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Grid
                      item
                      xs={12}
                      md={12}
                      sx={{
                        boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
                        display: "flex",
                        justifyContent: "space-between",
                        bgcolor: "#E5E5E5",
                        paddingTop: "0px !important",
                        paddingLeft: "0px !important",
                        borderBottomRightRadius: "43px",
                        borderBottomLeftRadius: "43px",
                        borderLeft: "7px solid #cca500",
                        borderRight: "7px solid #cca500",
                        borderBottom: "2px solid #cca500",
                      }}
                    >
                      <Grid item xs={5} md={5}>
                        <Item
                          sx={{
                            backgroundColor: "#E5E5E5",
                            width: "100%",
                            borderBottomLeftRadius: "33px",
                          }}
                        >
                          <Typography
                            variant="h5"
                            component="div"
                            sx={{
                              flexGrow: 1,
                              fontWeight: 700,
                            }}
                          >
                            {dataItemSelect?.local?.nombre}
                          </Typography>
                        </Item>
                      </Grid>
                      <Grid item xs={2} md={2}>
                        <Item
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "primary.main",
                            mt: 0,
                            width: "100%",
                            borderBottomRightRadius: "33px",
                            borderBottomLeftRadius: "33px",
                            borderLeft: "4px solid #cca500",
                            borderRight: "4px solid #cca500",
                          }}
                        >
                          {dataItemSelect?.estado === "Terminado" ? (
                            <>
                              <Item
                                sx={{
                                  border: "2px white",
                                  height: "33px",
                                  display: "flex",
                                  alignItems: "center",
                                  my: 0,
                                }}
                              >
                                {dataItemSelect?.goles_local}
                              </Item>
                              <span style={{ color: "white" }}> - </span>
                              <Item
                                sx={{
                                  border: "2px white",
                                  height: "33px",
                                  display: "flex",
                                  alignItems: "center",
                                  my: 0,
                                }}
                              >
                                {dataItemSelect?.goles_visitante}
                              </Item>
                            </>
                          ) : (
                            <Item sx={{ border: "2px white" }}>
                              <Typography variant="h5" component="div">
                                VS
                              </Typography>
                            </Item>
                          )}
                        </Item>
                      </Grid>
                      <Grid item xs={5} md={5} sx={{ pr: 3 }}>
                        <Item
                          sx={{
                            backgroundColor: "#E5E5E5",
                            width: "100%",
                            borderBottomRightRadius: "33px",
                          }}
                        >
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{
                              flexGrow: 1,
                              fontWeight: 700,
                            }}
                          >
                            {dataItemSelect?.visitante?.nombre}
                          </Typography>
                        </Item>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Item>
                        <Box sx={{ width: "100%" }}>
                          <Box
                            sx={{
                              borderBottom: 1,
                              borderColor: "divider",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Tabs
                              value={valueTab}
                              onChange={handleChangeTab}
                              aria-label="basic tabs example"
                            >
                              <Tab
                                label="Goleadores"
                                {...a11yProps(0)}
                                icon={<SportsSoccerIcon fontSize="large" />}
                              />
                              <Tab
                                label="Asistencias"
                                {...a11yProps(1)}
                                icon={
                                  <img
                                    width={45}
                                    height={45}
                                    src={IconoAsistensias}
                                    alt="asistencias"
                                    fontSize="large"
                                  />
                                }
                              />
                              <Tab
                                label="Tarjeta Roja"
                                {...a11yProps(2)}
                                icon={
                                  <SquareIcon
                                    fontSize="large"
                                    sx={{ color: "red" }}
                                  />
                                }
                              />
                              <Tab
                                label="Tarjeta Amarilla"
                                {...a11yProps(3)}
                                icon={
                                  <SquareIcon
                                    fontSize="large"
                                    sx={{ color: "yellow" }}
                                  />
                                }
                              />

                              <Tab
                                label="Lesion Naranja"
                                {...a11yProps(4)}
                                icon={
                                  <LocalHospitalIcon
                                    sx={{ color: "orange" }}
                                    fontSize="large"
                                  />
                                }
                              />

                              <Tab
                                label="Lesion Roja"
                                {...a11yProps(5)}
                                icon={
                                  <LocalHospitalIcon
                                    sx={{ color: "red" }}
                                    fontSize="large"
                                  />
                                }
                              />
                              <Tab
                                label="MVP"
                                {...a11yProps(6)}
                                icon={
                                  <StarsIcon
                                    fontSize="large"
                                    sx={{ color: "secondary.main" }}
                                  />
                                }
                              />
                            </Tabs>
                          </Box>
                          <form onSubmit={handleSubmit(onSubmit)}>
                            <TabPanel value={valueTab} index={0}>
                              <Item>
                                <GoleadoresComponents />
                              </Item>
                            </TabPanel>
                            <TabPanel value={valueTab} index={1}>
                              <AsistenciasComponents />
                            </TabPanel>
                            <TabPanel value={valueTab} index={2}>
                              <TarjetaRojaComponents />
                            </TabPanel>
                            <TabPanel value={valueTab} index={3}>
                              <TarjetaAmarillaComponents />
                            </TabPanel>
                            <TabPanel value={valueTab} index={4}>
                              <LesionNaranjaComponents />
                            </TabPanel>
                            <TabPanel value={valueTab} index={5}>
                              <LesionRojaComponents />
                            </TabPanel>
                            <TabPanel value={valueTab} index={6}>
                              <MvpComponents />
                            </TabPanel>
                          </form>
                        </Box>
                      </Item>
                    </Grid>
                  </Grid>
                  <Grid item xl={4} lg={4} md={4} xs={6} sx={{ mt: 2 }}>
                    <Item>
                      <Fab
                        type="submit"
                        size="x-large"
                        color="secondary"
                        aria-label="add"
                        sx={{
                          position: "absolute",
                          bottom: 43,
                          right: 43,
                        }}
                      >
                        <SaveIcon />
                      </Fab>
                    </Item>
                  </Grid>
                </Item>
              </Stack>
            </Box>
          </Item>
        </Box>
      </Dialog>
    </div>
  );
}
