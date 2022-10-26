import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { styled } from "@mui/material/styles";

import Paper from "@mui/material/Paper";
import SaveIcon from "@mui/icons-material/Save";
import { useSelector } from "react-redux";
import Chip from "@mui/material/Chip";

import EventIcon from "@mui/icons-material/Event";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

//CONSTRUCCION DEL FORM
import { useForm } from "react-hook-form";
import { FormText } from "../../../../components/forms/imputs/FormText";

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
} from "@mui/material";
import Swal from "sweetalert2";
import FormDate from "../../../../components/forms/imputs/FormDate";
import { AddIcCallOutlined } from "@mui/icons-material";

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
            backgroundColor: "primary.main",
            width: "100%",
            height: "100%",
          }}
        >
          <Box sx={{ width: "100%", height: "100%" }}>
            <Toolbar
              sx={{
                backgroundColor: "#546e7a",
                mx: "8px",
                borderTopLeftRadius: "14px",
                borderTopRightRadius: "14px",
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, color: "white", fontWeight: 700 }}
              >
                Estadisticas
              </Typography>
              <Button
                autoFocus
                sx={{ color: "white", fontWeight: 700 }}
                onClick={handleClose}
              >
                Cerrar
              </Button>
            </Toolbar>

            <Item
              sx={{
                mt: 0,
                borderRadius: 0,
                borderBottomLeftRadius: "14px",
                borderBottomRightRadius: "14px",
                height: "89%",
              }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
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
                      <EventIcon
                        sx={{ fontSize: 123, color: "secondary.main" }}
                      />
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
                                sx={{ borderBottom: 1, borderColor: "divider", display:"flex",
                                justifyContent:"center",
                                alignItems:"center", }}
                              >
                                <Tabs
                                  value={valueTab}
                                  onChange={handleChangeTab}
                                  aria-label="basic tabs example"
                            
                                >
                                  <Tab label="Goleadores" {...a11yProps(0)} icon={<img width={73} height={73} src="https://w7.pngwing.com/pngs/160/939/png-transparent-logo-golden-boot-logo-gold-silhouette.png"  alt="goleador"/>} />

                                    

                                
                                  <Tab label="Asistentes" {...a11yProps(1)} />
                                  <Tab label="Tarjeta Roja" {...a11yProps(2)} />
                                  <Tab
                                    label="Tarjeta Amarilla"
                                    {...a11yProps(3)}
                                  />
                                  <Tab
                                    label="Lesion Naranja"
                                    {...a11yProps(4)}
                                  />
                                  <Tab label="Lesion Roja" {...a11yProps(5)} />
                                  <Tab label="MVP" {...a11yProps(6)} />
                                </Tabs>
                              </Box>

                              <TabPanel value={valueTab} index={0}>
                                Goleadores
                              </TabPanel>
                              <TabPanel value={valueTab} index={1}>
                                Asistentes
                              </TabPanel>
                              <TabPanel value={valueTab} index={2}>
                                Tarjeta Amarilla
                              </TabPanel>
                              <TabPanel value={valueTab} index={3}>
                                Lesion Naranja
                              </TabPanel>
                              <TabPanel value={valueTab} index={4}>
                                Lesion Roja
                              </TabPanel>
                              <TabPanel value={valueTab} index={5}>
                                MVP
                              </TabPanel>
                            </Box>
                          </Item>
                        </Grid>
                      </Grid>
                      <Grid item xl={4} lg={4} md={4} xs={6} sx={{ mt: 2 }}>
                        <Item>
                          {/*       <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            endIcon={<SaveIcon />}
                            sx={{
                              width: "50%",
                              height: "50px",
                              borderRadius: "5px",
                              backgroundColor: "#546e7a",
                              color: "white",
                              fontSize: "20px",
                              fontWeight: "bold",
                              marginTop: "10px",
                              marginBottom: "10px",
                            }}
                          >
                            Guardar
                          </Button> */}
                          <Fab
                            type="submit"
                            size="x-large"
                            color="secondary"
                            aria-label="add"
                          >
                            <SaveIcon />
                          </Fab>
                        </Item>
                      </Grid>
                    </Item>
                  </Stack>
                </Box>
              </form>
            </Item>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
}
