import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { styled } from "@mui/material/styles";

import SaveIcon from "@mui/icons-material/Save";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SquareIcon from "@mui/icons-material/Square";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import StarsIcon from "@mui/icons-material/Stars";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

//CONSTRUCCION DEL FORM

import IconoAsistensias from "../../../../assets/images/iconos/Asistencias.png";
import LogoLocal from "../../../../assets/images/logos/LogoLocal.png";
import LogoVisitante from "../../../../assets/images/logos/LogoVisitante.png";

import SearchIcon from "@mui/icons-material/Search";

import {
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
  ListItemIcon,
  ListItemAvatar,
  Avatar,
  InputBase,
  Paper,
  ListItemButton,
  FormControl,
} from "@mui/material";
import GoleadoresComponents from "./components/GoleadoresComponents";
import AsistenciasComponents from "./components/AsistenciasComponents";
import TarjetaRojaComponents from "./components/TarjetaRojaComponents";
import TarjetaAmarillaComponents from "./components/TarjetaAmarillaComponents";
import LesionNaranjaComponents from "./components/LesionNaranjaComponents";
import LesionRojaComponents from "./components/LesionRojaComponents";
import MvpComponents from "./components/MvpComponents";
import { useForm } from "react-hook-form";
import estadisticasServices from "../../../../services/api/estadisticas/estadisticasService";
import Swal from "sweetalert2";

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
        <Box sx={{ p: 3, px: 0 }}>
          <Box>{children}</Box>
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
  const [searchLocal, setSearchLocal] = React.useState([]);
  const [searchVisitante, setSearchVisitante] = React.useState([]);
  const [valueTab, setValueTab] = React.useState(0);

  const [disabledSelected, setDisabledSelected] = React.useState(false);

  const [selectedIndexVisitante, setSelectedIndexVisitante] =
    React.useState(null);
  const [selectedIndexLocal, setSelectedIndexLocal] = React.useState(null);

  //goleador select
  const [selectedVisitante, setSelectedVisitante] = React.useState([]);
  const [selectedLocal, setSelectedLocal] = React.useState([]);
  const [goleadores, setGoleadores] = React.useState([]);

  //asistencias select
  const [selectedVisitanteAsistencias, setSelectedVisitanteAsistencias] =
    React.useState([]);
  const [selectedLocalAsistencias, setSelectedLocalAsistencias] =
    React.useState([]);
  const [asistentes, setAsistentes] = React.useState([]);

  //tarjeta roja select
  const [selectedVisitanteTarjetaRoja, setSelectedVisitanteTarjetaRoja] =
    React.useState([]);
  const [selectedLocalTarjetaRoja, setSelectedLocalTarjetaRoja] =
    React.useState([]);

  //tarjeta amarilla select
  const [
    selectedVisitanteTarjetaAmarilla,
    setSelectedVisitanteTarjetaAmarilla,
  ] = React.useState([]);
  const [selectedLocalTarjetaAmarilla, setSelectedLocalTarjetaAmarilla] =
    React.useState([]);

  //lesion naranja select
  const [selectedVisitanteLesionNaranja, setSelectedVisitanteLesionNaranja] =
    React.useState([]);
  const [selectedLocalLesionNaranja, setSelectedLocalLesionNaranja] =
    React.useState([]);

  //lesion roja select
  const [selectedVisitanteLesionRoja, setSelectedVisitanteLesionRoja] =
    React.useState([]);
  const [selectedLocalLesionRoja, setSelectedLocalLesionRoja] = React.useState(
    []
  );

  //mvp select
  const [selectedMvp, setSelectedMvp] = React.useState({});
  console.log("action", action);
  console.log("dataItemSelect", dataItemSelect);

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    //limpiar datos
    setSelectedIndexVisitante(null);
    setSelectedIndexLocal(null);
    setSelectedVisitante([]);
    setSelectedLocal([]);
    setGoleadores([]);
    setSelectedVisitanteAsistencias([]);
    setSelectedLocalAsistencias([]);
    setAsistentes([]);
    setSelectedVisitanteTarjetaRoja([]);
    setSelectedLocalTarjetaRoja([]);
    setSelectedVisitanteTarjetaAmarilla([]);
    setSelectedLocalTarjetaAmarilla([]);
    setSelectedVisitanteLesionNaranja([]);
    setSelectedLocalLesionNaranja([]);
    setSelectedVisitanteLesionRoja([]);
    setSelectedLocalLesionRoja([]);
    setSelectedMvp({});
    setDisabledSelected(false);
    //fin limpiar datos

    setSearchLocal(dataItemSelect?.local?.Jugadors);
    setSearchVisitante(dataItemSelect?.visitante?.Jugadors);
  }, [dataItemSelect, open]);

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);

    switch (newValue) {
      case 0:
        setDisabledSelected(false);
        console.log("goleador");
        const dataLocal = dataItemSelect?.local?.Jugadors.filter(
          (
            itemSearch //quitar los que ya estan seleccionados
          ) =>
            !selectedLocal.find(
              (itemSelected) => itemSelected.id === itemSearch.id
            )
        );
        const dataVisitante = dataItemSelect?.visitante?.Jugadors.filter(
          (
            itemSearch //quitar los que ya estan seleccionados
          ) =>
            !selectedVisitante.find(
              (itemSelected) => itemSelected.id === itemSearch.id
            )
        );
        console.log("dataLocalss goleador", dataVisitante);
        setSearchLocal(dataLocal);
        setSearchVisitante(dataVisitante);
        break;
      case 1:
        setDisabledSelected(false);
        console.log("asistencias");
        const dataLocalAsistencias = dataItemSelect?.local?.Jugadors.filter(
          (
            itemSearch //quitar los que ya estan seleccionados
          ) =>
            !selectedLocalAsistencias.find(
              (itemSelected) => itemSelected.id === itemSearch.id
            )
        );
        const dataVisitanteAsistencias =
          dataItemSelect?.visitante?.Jugadors.filter(
            (
              itemSearch //quitar los que ya estan seleccionados
            ) =>
              !selectedVisitanteAsistencias.find(
                (itemSelected) => itemSelected.id === itemSearch.id
              )
          );

        console.log("dataLocalss asistencias", dataVisitanteAsistencias);
        setSearchLocal(dataLocalAsistencias);
        setSearchVisitante(dataVisitanteAsistencias);
        break;
      case 2:
        setDisabledSelected(false);
        console.log("tarjeta roja");
        const dataLocalTarjetaRoja = dataItemSelect?.local?.Jugadors.filter(
          (
            itemSearch //quitar los que ya estan seleccionados
          ) =>
            !selectedLocalTarjetaRoja.find(
              (itemSelected) => itemSelected.id === itemSearch.id
            )
        );
       
        const dataVisitanteTarjetaRoja =
          dataItemSelect?.visitante?.Jugadors.filter(
            (
              itemSearch //quitar los que ya estan seleccionados
            ) =>
              !selectedVisitanteTarjetaRoja.find(
                (itemSelected) => itemSelected.id === itemSearch.id
              )
          );
        setSearchLocal(dataLocalTarjetaRoja);
        setSearchVisitante(dataVisitanteTarjetaRoja);

        break;
      case 3:
        setDisabledSelected(false);
        console.log("tarjeta amarilla");
        const dataLocalTarjetaAmarilla = dataItemSelect?.local?.Jugadors.filter(
          (
            itemSearch //quitar los que ya estan seleccionados
          ) =>
            !selectedLocalTarjetaAmarilla.find(
              (itemSelected) => itemSelected.id === itemSearch.id
            )
        );
        const dataVisitanteTarjetaAmarilla =
          dataItemSelect?.visitante?.Jugadors.filter(
            (
              itemSearch //quitar los que ya estan seleccionados
            ) =>
              !selectedVisitanteTarjetaAmarilla.find(
                (itemSelected) => itemSelected.id === itemSearch.id
              )
          );
        setSearchLocal(dataLocalTarjetaAmarilla);
        setSearchVisitante(dataVisitanteTarjetaAmarilla);

        break;
      case 4:
        setDisabledSelected(false);
        console.log("lesion naranja");
        const dataLocalLesionNaranja = dataItemSelect?.local?.Jugadors.filter(
          (
            itemSearch //quitar los que ya estan seleccionados
          ) =>
            !selectedLocalLesionNaranja.find(
              (itemSelected) => itemSelected.id === itemSearch.id
            )
        );
        const dataVisitanteLesionNaranja =
          dataItemSelect?.visitante?.Jugadors.filter(
            (
              itemSearch //quitar los que ya estan seleccionados
            ) =>
              !selectedVisitanteLesionNaranja.find(
                (itemSelected) => itemSelected.id === itemSearch.id
              )
          );
        setSearchLocal(dataLocalLesionNaranja);
        setSearchVisitante(dataVisitanteLesionNaranja);
        break;
      case 5:
        setDisabledSelected(false);
        console.log("lesion roja");
        const dataLocalLesionRoja = dataItemSelect?.local?.Jugadors.filter(
          (
            itemSearch //quitar los que ya estan seleccionados
          ) =>
            !selectedLocalLesionRoja.find(
              (itemSelected) => itemSelected.id === itemSearch.id
            )
        );
        const dataVisitanteLesionRoja =
          dataItemSelect?.visitante?.Jugadors.filter(
            (
              itemSearch //quitar los que ya estan seleccionados
            ) =>
              !selectedVisitanteLesionRoja.find(
                (itemSelected) => itemSelected.id === itemSearch.id
              )
          );
        setSearchLocal(dataLocalLesionRoja);
        setSearchVisitante(dataVisitanteLesionRoja);
        break;
      case 6:
        setDisabledSelected(false);
        console.log("mvp");
        const dataLocalMvp = dataItemSelect?.local?.Jugadors.filter(
          (
            itemSearch //quitar los que ya estan seleccionados
          ) => !selectedMvp.id === itemSearch.id
        );
        const dataVisitanteMvp = dataItemSelect?.visitante?.Jugadors.filter(
          (
            itemSearch //quitar los que ya estan seleccionados
          ) => !selectedMvp.id === itemSearch.id
        );

        setSearchLocal(dataLocalMvp);
        setSearchVisitante(dataVisitanteMvp);

        break;
      default:
        break;
    }
  };

  console.log("seachLocal", searchLocal);
  console.log("seachVisitante", searchVisitante);

  const handleSearchVisitante = (event) => {
    console.log("event.target.value", event.target.value);
    const dataVisitante = dataItemSelect?.visitante?.Jugadors.filter((item) =>
      item.nombre.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSearchVisitante(dataVisitante);
    console.log("searchVisitante", searchVisitante);
  };

  const handleSearchLocal = (event) => {
    console.log("event.target.value", event.target.value);
    const dataLocal = dataItemSelect?.local?.Jugadors.filter((item) =>
      item.nombre.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSearchLocal(dataLocal);
    console.log("searchLocal", searchLocal);
  };

  const handleClickVisitante = (item) => {
    console.log("item visitante", item);
    //quitar el jugador seleccionado de la lista
    setSelectedIndexVisitante(item.id);
    switch (valueTab) {
      case 0:
        setSelectedVisitante((prev) => [...prev, item]);
        const dataVisitante = searchVisitante.filter(
          (itemSearch) => itemSearch.id !== item.id //quitar el jugador seleccionado de la lista
        );
        setSearchVisitante(dataVisitante);
        break;
      case 1:
        setSelectedVisitanteAsistencias((prev) => [...prev, item]);
        const dataVisitanteAsistencias = searchVisitante.filter(
          (itemSearch) => itemSearch.id !== item.id //quitar el jugador seleccionado de la lista
        );
        setSearchVisitante(dataVisitanteAsistencias);
        break;
      case 2:
        setSelectedVisitanteTarjetaRoja((prev) => [...prev, item]);
        const dataVisitanteTarjetaRoja = searchVisitante.filter(
          (itemSearch) => itemSearch.id !== item.id //quitar el jugador seleccionado de la lista
        );
        setSearchVisitante(dataVisitanteTarjetaRoja);
        break;
      case 3:
        setSelectedVisitanteTarjetaAmarilla((prev) => [...prev, item]);
        const dataVisitanteTarjetaAmarilla = searchVisitante.filter(
          (itemSearch) => itemSearch.id !== item.id //quitar el jugador seleccionado de la lista
        );
        setSearchVisitante(dataVisitanteTarjetaAmarilla);

        break;
      case 4:
        setSelectedVisitanteLesionNaranja((prev) => [...prev, item]);
        const dataVisitanteLesionNaranja = searchVisitante.filter(
          (itemSearch) => itemSearch.id !== item.id //quitar el jugador seleccionado de la lista
        );
        setSearchVisitante(dataVisitanteLesionNaranja);

        break;
      case 5:
        setSelectedVisitanteLesionRoja((prev) => [...prev, item]);
        const dataVisitanteLesionRoja = searchVisitante.filter(
          (itemSearch) => itemSearch.id !== item.id //quitar el jugador seleccionado de la lista
        );
        setSearchVisitante(dataVisitanteLesionRoja);
        break;
      case 6:
        setSelectedMvp(item);
        break;
      default:
        break;
    }
  };

  const handleClickLocal = (item) => {
    setSelectedIndexLocal(item.id);
    switch (valueTab) {
      case 0:
        setSelectedLocal((prev) => [...prev, item]);

        const dataLocal = searchLocal.filter(
          (itemSearch) => itemSearch.id !== item.id //quitar el jugador seleccionado de la lista
        );
        setSearchLocal(dataLocal);
        break;
      case 1:
        setSelectedLocalAsistencias((prev) => [...prev, item]);
        const dataVisitanteAsistencias = searchLocal.filter(
          (itemSearch) => itemSearch.id !== item.id //quitar el jugador seleccionado de la lista
        );
       
        setSearchLocal(dataVisitanteAsistencias);
       
        break;
      case 2:
        setSelectedLocalTarjetaRoja((prev) => [...prev, item]);
        const dataVisitanteTarjetaRoja = searchLocal.filter(
          (itemSearch) => itemSearch.id !== item.id //quitar el jugador seleccionado de la lista
        );
       
        setSearchLocal(dataVisitanteTarjetaRoja);
        
        break;
      case 3:
        setSelectedLocalTarjetaAmarilla((prev) => [...prev, item]);
        const dataVisitanteTarjetaAmarilla = searchLocal.filter(
          (itemSearch) => itemSearch.id !== item.id //quitar el jugador seleccionado de la lista
        );
       
        setSearchLocal(dataVisitanteTarjetaAmarilla);
       
        break;
      case 4:
        setSelectedLocalLesionNaranja((prev) => [...prev, item]);
        const dataVisitanteLesionNaranja = searchLocal.filter(
          (itemSearch) => itemSearch.id !== item.id //quitar el jugador seleccionado de la lista
        );
       
        setSearchLocal(dataVisitanteLesionNaranja);
     
        break;
      case 5:
        setSelectedLocalLesionRoja((prev) => [...prev, item]);
        const dataVisitanteLesionRoja = searchLocal.filter(
          (itemSearch) => itemSearch.id !== item.id //quitar el jugador seleccionado de la lista
        );
       
        setSearchLocal(dataVisitanteLesionRoja);
       
        break;
      case 6:
        setSelectedMvp(item);
       
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(dataItemSelect);

    if (goleadores?.length > 0) {
      console.log("ENTRO A GOLEADORES PARA MANDAR AL BACH");
      const dataGoleadores = {
        goleadores: goleadores,
        idPartido: dataItemSelect.id,
        idTorneo: dataItemSelect.torneo_id,
        estadistica_id: 1,
      };
      const response = await estadisticasServices.cargarGoleadoresService(
        dataGoleadores
      );
      console.log("response", response);
    }

    if (asistentes?.length > 0) {
      console.log("ENTRO A ASISTENCIAS PARA MANDAR AL BACH");
      const dataAsistencias = {
        asistencias: asistentes,
        idPartido: dataItemSelect.id,
        idTorneo: dataItemSelect.torneo_id,
        estadistica_id: 2,
      };
      const response = await estadisticasServices.cargarAsistenciasService(
        dataAsistencias
      );
      console.log("response", response);
    }

    if (
      selectedLocalTarjetaRoja.length > 0 ||
      selectedVisitanteTarjetaRoja.length > 0
    ) {
      console.log("entro a rojas");

      const data = {
        idPartido: dataItemSelect.id,
        idTorneo: dataItemSelect.torneo_id,
        roja: [...selectedLocalTarjetaRoja, ...selectedVisitanteTarjetaRoja],
        estadistica_id: 3,
      };

      const response = await estadisticasServices.cargarRojasService(data);
      console.log(response);
    }

    if (
      selectedLocalTarjetaAmarilla.length > 0 ||
      selectedVisitanteTarjetaAmarilla.length > 0
    ) {
      console.log("entro a amarillas");
      const data = {
        idPartido: dataItemSelect.id,
        idTorneo: dataItemSelect.torneo_id,
        amarilla: [
          ...selectedLocalTarjetaAmarilla,
          ...selectedVisitanteTarjetaAmarilla,
        ],
        estadistica_id: 4,
      };

      const response = await estadisticasServices.cargarAmarillasService(data);
      console.log(response);
    }

    if (
      selectedLocalLesionNaranja.length > 0 ||
      selectedVisitanteLesionNaranja.length > 0
    ) {
      console.log("entro a lesion naranja");
      const data = {
        idPartido: dataItemSelect.id,
        idTorneo: dataItemSelect.torneo_id,
        lesionados: [
          ...selectedLocalLesionNaranja,
          ...selectedVisitanteLesionNaranja,
        ],
        estadistica_id: 5,
      };

      const response = await estadisticasServices.cargarLesionNaranjaService(
        data
      );
      console.log(response);
    }

    if (
      selectedLocalLesionRoja.length > 0 ||
      selectedVisitanteLesionRoja.length > 0
    ) {
      console.log("entro a lesion rojas");
      const data = {
        idPartido: dataItemSelect.id,
        idTorneo: dataItemSelect.torneo_id,
        lesionados: [
          ...selectedLocalLesionRoja,
          ...selectedVisitanteLesionRoja,
        ],
        estadistica_id: 6,
      };

      const response = await estadisticasServices.cargarLesionRojaService(data);
      console.log(response);
    }
    console.log(selectedMvp, "SOLITARIO LOCALL")
    if (Object.entries(selectedMvp).length > 0) {
      console.log("entro a mvp");
      const data = {
        idPartido: dataItemSelect.id,
        idTorneo: dataItemSelect.torneo_id,
        mvp: selectedMvp,
        estadistica_id: 7,
      };

      const response = await estadisticasServices.cargarMvpService(data);
      console.log(response);
    }

    Swal.fire({
      title: "Estadisticas cargadas correctamente",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        container: "swal-overlay",
      },
    }).then(() => {
      setOpen(false);
    });
  };

  React.useEffect(() => {
    setDisabledSelected(false);
    handleDisabled();
  }, [
    selectedLocal,
    selectedVisitante,
    selectedLocalTarjetaRoja,
    selectedVisitanteTarjetaRoja,
    selectedLocalAsistencias,
    selectedVisitanteAsistencias,
    searchLocal,
    searchVisitante
  ]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleDisabled = () => {
    if (
      selectedLocal?.length + selectedVisitante?.length >=
      dataItemSelect?.goles_local + dataItemSelect?.goles_visitante
      && valueTab === 0
    ) {
      setDisabledSelected(true);
    }

    if (
      selectedLocalAsistencias?.length + selectedVisitanteAsistencias?.length >=
      dataItemSelect?.goles_local + dataItemSelect?.goles_visitante && valueTab === 1
    ) {
      setDisabledSelected(true);
    }

    if (
      (selectedLocalTarjetaRoja?.length >= 4 ||
      selectedVisitanteTarjetaRoja?.length >= 4)
      && valueTab === 2
    ) {
      setDisabledSelected(true);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen
      TransitionComponent={Transition}
    >
      <form onSubmit={handleSubmit}>
        <AppBar position="fixed">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "customTheme.acento500",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              Cargar Estadisticas
            </IconButton>
            <Button autoFocus variant="contained" color="primary" type="submit">
              Guardar
            </Button>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            p: 3,
            pt: 8,
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
                      border: "solid 5px #757575",
                      backgroundColor: "secondary.main",
                    }}
                    orientation="vertical"
                    flexItem
                  />
                }
                spacing={1}
                sx={{ width: "100%", height: "100%" }}
              >
                <Item
                  sx={{
                    width: "20%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    m: 0,
                    height: "100%",
                  }}
                >
                  <Item sx={{ width: "233px", height: "223px" }}>
                    <img
                      width={213}
                      height={200}
                      src={LogoLocal}
                      alt="icono futbol"
                    />
                  </Item>
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                      position: "relative",
                      overflow: "auto",
                      maxHeight: 633,
                      "& ul": { padding: 0 },
                    }}
                    subheader={<li />}
                  >
                    <ListSubheader
                      sx={{ backgroundColor: "primary.main", color: "white" }}
                    >
                      <Typography variant="h6" component="div">
                        Jugadores
                      </Typography>
                    </ListSubheader>
                    <ListSubheader>
                      <Paper
                        component="form"
                        sx={{
                          p: "2px 4px",
                          display: "flex",
                          alignItems: "center",
                          maxWidth: 400,
                        }}
                      >
                        <InputBase
                          sx={{ ml: 1, flex: 1 }}
                          placeholder="Buscar jugadores..."
                          inputProps={{ "aria-label": "search" }}
                          onChange={handleSearchLocal}
                        />
                        <IconButton
                          type="button"
                          sx={{ p: "10px" }}
                          aria-label="search"
                        >
                          <SearchIcon />
                        </IconButton>
                      </Paper>
                    </ListSubheader>
                    {searchLocal?.length > 0 ? (
                      searchLocal.map((jugador) => (
                        <li key={jugador.id}>
                          <ul>
                            <ListItemButton
                              disabled={disabledSelected}
                              selected={
                                valueTab === 6 &&
                                selectedIndexLocal === jugador.id
                              }
                              onClick={() => handleClickLocal(jugador)}
                            >
                              <ListItemAvatar>
                                <Avatar src="/broken-image.jpg" />
                              </ListItemAvatar>
                              <ListItemText primary={jugador.nombre} />
                            </ListItemButton>
                          </ul>
                        </li>
                      ))
                    ) : (
                      <li key={1}>
                        <ul>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar src="/broken-image.jpg" />
                            </ListItemAvatar>
                            <ListItemText primary="No hay jugadores" />
                          </ListItem>
                        </ul>
                      </li>
                    )}
                  </List>
                </Item>
                <Item sx={{ width: "60%", height: "100%" }}>
                  <Grid
                    container
                    spacing={1}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "primary.main",
                        mt: 0,
                        mb: 0,
                        mx: 0,
                        width: "100%",
                        height: "53px",
                        borderLeft: "7px solid #cca500",
                        borderRight: "7px solid #cca500",
                      }}
                    >
                      <Typography
                        variant="h6"
                        component="div"
                        color="white"
                        sx={{ pl: 1 }}
                      >
                        Torneo {dataItemSelect?.Torneo?.nombre}
                      </Typography>

                      <Typography
                        variant="h6"
                        component="div"
                        color="white"
                        sx={{ pr: 1 }}
                      >
                        Fecha {dataItemSelect?.num_fecha}
                      </Typography>
                    </Box>
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
                            m: 0,
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
                            <Typography
                              variant="h5"
                              component="div"
                              color="white"
                            >
                              VS
                            </Typography>
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
                    <Grid
                      item
                      xs={12}
                      md={12}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Item>
                        <Box sx={{ width: "100%" }}>
                          <Box
                            sx={{
                              flexGrow: 1,
                    
                              borderBottom: 1,
                              borderColor: "divider",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              overflow: "auto",
                            }}
                          >
                            <Tabs
                              value={valueTab}
                              onChange={handleChangeTab}
                              aria-label="scrollable auto tabs example"
                              variant="scrollable"
                              scrollButtons="auto"
                            >
                              <Tab
                                sx={{ pr: 0.5 }}
                                label="Goleadores"
                                {...a11yProps(0)}
                                icon={<SportsSoccerIcon fontSize="large" />}
                                onClick={() => {}}
                              />
                              <Tab
                                sx={{ p: 1 }}
                                label="Asistencias"
                                {...a11yProps(1)}
                                icon={
                                  <img
                                    width={37}
                                    height={33}
                                    src={IconoAsistensias}
                                    alt="asistencias"
                                  />
                                }
                              />
                              <Tab
                                sx={{ p: 1 }}
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
                                sx={{ p: 1 }}
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
                                sx={{ p: 1 }}
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
                                sx={{ p: 1 }}
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
                                sx={{ p: 1 }}
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
                          <Box>
                            {/* GOLEADORES TABS */}
                            <TabPanel value={valueTab} index={0}>
                              <GoleadoresComponents
                                partido={dataItemSelect?.id}
                                torneo={dataItemSelect?.torneo_id}
                                visitante={selectedVisitante}
                                setSelectedVisitante={setSelectedVisitante}
                                local={selectedLocal}
                                setSelectedLocal={setSelectedLocal}
                                setSearchVisitante={setSearchVisitante}
                                setSearchLocal={setSearchLocal}
                                setGoleadores={setGoleadores}
                                goleadores={goleadores}
                                dataItemSelect={dataItemSelect}
                              />
                            </TabPanel>
                            <TabPanel value={valueTab} index={1}>
                              <AsistenciasComponents
                                partido={dataItemSelect?.id}
                                torneo={dataItemSelect?.torneo_id}
                                visitante={selectedVisitanteAsistencias}
                                setSelectedVisitante={
                                  setSelectedVisitanteAsistencias
                                }
                                local={selectedLocalAsistencias}
                                setSelectedLocal={setSelectedLocalAsistencias}
                                setSearchVisitante={setSearchVisitante}
                                setSearchLocal={setSearchLocal}
                                setAsistentes={setAsistentes}
                                asistentes={asistentes}
                              />
                            </TabPanel>
                            <TabPanel value={valueTab} index={2}>
                              <TarjetaRojaComponents
                                partido={dataItemSelect?.id}
                                torneo={dataItemSelect?.torneo_id}
                                visitante={selectedVisitanteTarjetaRoja}
                                setSelectedVisitante={
                                  setSelectedVisitanteTarjetaRoja
                                }
                                local={selectedLocalTarjetaRoja}
                                setSelectedLocal={setSelectedLocalTarjetaRoja}
                                setSearchVisitante={setSearchVisitante}
                                setSearchLocal={setSearchLocal}
                              />
                            </TabPanel>
                            <TabPanel value={valueTab} index={3}>
                              <TarjetaAmarillaComponents
                                partido={dataItemSelect?.id}
                                torneo={dataItemSelect?.torneo_id}
                                visitante={selectedVisitanteTarjetaAmarilla}
                                setSelectedVisitante={
                                  setSelectedVisitanteTarjetaAmarilla
                                }
                                local={selectedLocalTarjetaAmarilla}
                                setSelectedLocal={
                                  setSelectedLocalTarjetaAmarilla
                                }
                                setSearchVisitante={setSearchVisitante}
                                setSearchLocal={setSearchLocal}
                              />
                            </TabPanel>
                            <TabPanel value={valueTab} index={4}>
                              <LesionNaranjaComponents
                                partido={dataItemSelect?.id}
                                torneo={dataItemSelect?.torneo_id}
                                visitante={selectedVisitanteLesionNaranja}
                                setSelectedVisitante={
                                  setSelectedVisitanteLesionNaranja
                                }
                                local={selectedLocalLesionNaranja}
                                setSelectedLocal={setSelectedLocalLesionNaranja}
                                setSearchVisitante={setSearchVisitante}
                                setSearchLocal={setSearchLocal}
                              />
                            </TabPanel>
                            <TabPanel value={valueTab} index={5}>
                              <LesionRojaComponents
                                partido={dataItemSelect?.id}
                                torneo={dataItemSelect?.torneo_id}
                                visitante={selectedVisitanteLesionRoja}
                                setSelectedVisitante={
                                  setSelectedVisitanteLesionRoja
                                }
                                local={selectedLocalLesionRoja}
                                setSelectedLocal={setSelectedLocalLesionRoja}
                                setSearchVisitante={setSearchVisitante}
                                setSearchLocal={setSearchLocal}
                              />
                            </TabPanel>
                            <TabPanel value={valueTab} index={6}>
                              <MvpComponents
                                partido={dataItemSelect?.id}
                                torneo={dataItemSelect?.torneo_id}
                                jugador={selectedMvp}
                                setJugador={setSelectedMvp}
                                setSearchVisitante={setSearchVisitante}
                                setSearchLocal={setSearchLocal}
                              />
                            </TabPanel>
                          </Box>
                        </Box>
                      </Item>
                    </Grid>
                  </Grid>
                  {/*  <Grid item xl={4} lg={4} md={4} xs={6} sx={{ mt: 2 }}>
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
                  </Grid> */}
                </Item>
                <Item
                  sx={{
                    width: "20%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    m: 0,
                    height: "100%",
                  }}
                >
                  <Item sx={{ width: "233px", height: "223px" }}>
                    <img
                      width={213}
                      height={200}
                      src={LogoVisitante}
                      alt="icono futbol"
                    />
                  </Item>
                  <List
                    component="nav"
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                      position: "relative",
                      overflow: "auto",
                      maxHeight: 633,
                      "& ul": { padding: 0 },
                    }}
                    subheader={<li />}
                  >
                    <ListSubheader
                      sx={{ backgroundColor: "primary.main", color: "white" }}
                    >
                      <Typography variant="h6" component="div">
                        Jugadores
                      </Typography>
                    </ListSubheader>
                    <ListSubheader>
                      <Paper
                        component="form"
                        sx={{
                          p: "2px 4px",
                          display: "flex",
                          alignItems: "center",
                          maxWidth: 400,
                        }}
                      >
                        <InputBase
                          sx={{ ml: 1, flex: 1 }}
                          placeholder="Buscar jugadores..."
                          inputProps={{ "aria-label": "search" }}
                          onChange={handleSearchVisitante}
                        />
                        <IconButton
                          type="button"
                          sx={{ p: "10px" }}
                          aria-label="search"
                        >
                          <SearchIcon />
                        </IconButton>
                      </Paper>
                    </ListSubheader>
                    {searchVisitante?.length > 0 ? (
                      searchVisitante?.map((jugador) => (
                        <li key={jugador.id}>
                          <ul>
                            <ListItemButton
                              disabled={disabledSelected}
                              selected={
                                valueTab === 6 &&
                                selectedIndexVisitante === jugador.id
                              }
                              onClick={() => handleClickVisitante(jugador)}
                            >
                              <ListItemAvatar>
                                <Avatar src="/broken-image.jpg" />
                              </ListItemAvatar>
                              <ListItemText primary={jugador.nombre} />
                            </ListItemButton>
                          </ul>
                        </li>
                      ))
                    ) : (
                      <li key={`section-0`}>
                        <ul>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar src="/broken-image.jpg" />
                            </ListItemAvatar>
                            <ListItemText primary="No hay jugadores" />
                          </ListItem>
                        </ul>
                      </li>
                    )}
                  </List>
                </Item>
              </Stack>
            </Box>
          </Item>
        </Box>
        {/*  <Grid item xl={4} lg={4} md={4} xs={6} sx={{ mt: 2 }}>
          <Fab
            type="submit"
            size="x-large"
            color="primary"
            aria-label="add"
            sx={{
              position: "absolute",
              bottom: 1,
              right: 273,
            }}
          >
            <SaveIcon />
          </Fab>
        </Grid> */}
      </form>
    </Dialog>
  );
}
