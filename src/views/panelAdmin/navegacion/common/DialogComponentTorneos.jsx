import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { styled } from "@mui/material/styles";

import Paper from "@mui/material/Paper";
import SaveIcon from "@mui/icons-material/Save";
import { useSelector } from "react-redux";
import Chip from "@mui/material/Chip";
import "../../../styles/Swal.css";
//CONSTRUCCION DEL FORM
import { useForm } from "react-hook-form";
import { FormText } from "../../../../components/forms/imputs/FormText";
import { FormSelect } from "../../../../components/forms/imputs/FormSelect";
import {
  Container,
  Grid,
  Typography,
  Avatar,
  Toolbar,
  Stack,
  Divider,
  Box,
  BadgeMark,
  Badge,
  CircularProgress,
  ListItem,
  Tooltip,
} from "@mui/material";
import jugadoresServices from "../../../../services/api/jugadores/jugadoresService";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import torneosServices from "../../../../services/api/torneos/torneosService";
import Swal from "sweetalert2";
import seasonsServices from "../../../../services/api/seasons/seasonsService";
import SteperComponent from "./SteperComponent";
import FormAutocomplete from "../../../../components/forms/imputs/FormAutocomplete";
import equiposServices from "../../../../services/api/equipos/equiposServices";
import TransferListComponet from "./TransferListComponet";
import CircularProgressComponent from "../../../../components/feedback/CircularProgressComponent";
import regionesServices from "../../../../services/api/regiones/regionesServices";
import FixtureServices from "../../../../services/api/fixture/fixtureService";

import GridComponent from "./GridComponent";
import FormDate from "../../../../components/forms/imputs/FormDate";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: theme.spacing(1),
  borderRadius: "5px",
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    fontSize: 14,
    fontWeight: 700,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "8x",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogComponentTorneos(props) {
  const { open, setOpen, action } = props;
  const [equipos, setEquipos] = React.useState([]);
  const [selectEquipos, setSelectEquipos] = React.useState([]);
  const [searchClub, setSearchClub] = React.useState("");
  const [defaultValues, setDefaultValues] = React.useState({
    nombre: "",
    tipo_id: null,
    region_id: null,
    total_de_equipos: null,
    total_grupos: null,
    total_equipos_grupos: null,
    season_id: null,
    torneo_id: null,
    continente_id: null,
    nacion_id: null,
    equipos: [],
    rondas: null,
    fecha_desde: null,
    fecha_hasta: null,
  });

  const { continents } = useSelector((state) => state.regiones);

  const [temporadas, setTemporadas] = React.useState([]);

  const [loading, setLoading] = React.useState(false);
  const [tiposTorneos, setTiposTorneos] = React.useState([]);
  const [activeStep, setActiveStep] = React.useState(0);
  const [torneoCreated, setTorneoCreated] = React.useState(null);
  const [checked, setChecked] = React.useState(false);
  const [fixture, setFixture] = React.useState([]);
  const [sorteo, setSorteo] = React.useState(false);
  const [fixtureCompleto, setFixtureCompleto] = React.useState([]);

  const [selected, setSelected] = React.useState(null);
  const [selectNation, setSelectNation] = React.useState(null);

  const [nationsByRegion, setNationsByRegion] = React.useState([]);
  const [progress, setProgress] = React.useState(true);

  const getTemporadas = async () => {
    const res = await seasonsServices.getSeasonsService();
    console.log("res", res);
    if (res?.status === 200) {
      setTemporadas(res.seasons);
    }
  };

  const getTiposTorneos = async () => {
    const res = await torneosServices.getTiposTorneosService();
    console.log("res", res);
    if (res?.status === 200) {
      setTiposTorneos(res.tiposTorneos);
    }
  };

  const getNacionalidadxRegion = async () => {
    setLoading(true);
    console.log("REGION nacion", selected);
    const data = {
      region_id: selected,
      season_id: torneoCreated?.season_id,
    };
    const { nations, clubes } =
      await regionesServices.getNacionalidadesAndClubByContinente(data);
    setNationsByRegion(nations);
    setEquipos(clubes);
    console.log("nacionalidad y clubes", nations, clubes, nationsByRegion);
    setLoading(false);
  };

  const getEquiposXnation = async () => {
    setLoading(true);
    console.log("NACION", selectNation);
    console.log("TORNEO ID GET NACION", torneoCreated?.id);
    const data = {
      nacion_id: selectNation,
      season_id: torneoCreated?.season_id,
    };

    const clubes = await equiposServices.getEquiposXnacion(data);

    console.log("clubes clubes ", clubes);
    setEquipos(clubes?.clubes);
    console.log("equipos torneos", equipos);
    setProgress(false);
    setLoading(false);
  };

  const getEquiposSelect = async () => {
    console.log("Hola equipos dialog torneo", selectEquipos.length);
  };

  const getEquipos = async () => {
    setLoading(true);
    const res = await equiposServices.getEquiposSearchService(searchClub);
    console.log("res", res);
    if (res?.status === 200) {
      setEquipos(res.equipos);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    getTemporadas();
    getTiposTorneos();
  }, []);

  React.useEffect(() => {
    getNacionalidadxRegion();
  }, [selected]);

  React.useEffect(() => {
    getEquiposXnation();
  }, [selectNation]);

  React.useEffect(() => {
    getEquiposSelect();
  }, [selectEquipos]);

  /*   React.useEffect(() => {
    getEquipos();
  }, [searchClub]); */

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const onSubmit = async (formValue) => {
    console.log("formvlaueeee", formValue);
    console.log(action);

    if (action === "create") {
      if (sorteo) {
        const data = {
          fixtureCreado: fixtureCompleto,
          torneo_id: torneoCreated.id,
        };

        console.log("sorteo", sorteo);
        console.log("fixture", fixture);
        console.log("fixture", data);

        Swal.fire({
          title: "¿Confirmas el fixture?",
          text: "No podras revertir los cambios!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, crear!",
          customClass: {
            container: "swal-overlay",
          },
        }).then(async (result) => {
          if (result.isConfirmed) {
            const res = await FixtureServices.confirmFixtureService(data);
            console.log("res", res);
            if (res?.status === 200) {
              Swal.fire({
                title: "Creado!",
                text: "El fixture ha sido creado.",
                icon: "success",
                customClass: {
                  container: "swal-overlay",
                },
              });

              setOpen(false);
            } else {
              Swal.fire({
                title: "Error!",
                text: "El fixture no ha sido creado.",
                icon: "error",
                customClass: {
                  container: "swal-overlay",
                },
              });
            }
          }
        });
      } else {
        if (selectEquipos.length > 0) {
          const { equipos, total_de_equipos } = formValue;
          const data = {
            equipos,
            torneo_id: torneoCreated?.id,
          };
          if (equipos.length < total_de_equipos) {
            Swal.fire({
              icon: "error",
              title: `Seleccionaste ${equipos.length} equipos`,
              text: `Debes seleccionar ${total_de_equipos} equipos`,
              customClass: {
                container: "swal-overlay",
              },
            });
            return;
          }

          await torneosServices.createEquiposByTorneoService(data);
          handleNext();
          return;
        } else {
          console.log("CRENADO EQUIPO", formValue);
          await torneosServices
            .createTorneosService(formValue)
            .then((res) => {
              console.log("resTorneo", res);
              if (res?.data?.status === 200) {
                setTorneoCreated(res?.data?.torneo);
                setSelected(formValue?.region_id);
                handleNext();
              } else if (res?.data?.status === 400) {
                Swal.fire({
                  title: "Error",
                  text: res?.data?.message,
                  icon: "error",
                  confirmButtonText: "Ok",
                  //custom
                  customClass: {
                    container: "swal-overlay",
                  },
                });
              }
            })
            .catch((err) => {
              console.log("err", err);
            });
        }
      }
    } else {
      await torneosServices.updateTorneosService(formValue);
    }

    handleClose();
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep < 2 ? prevActiveStep + 1 : (prevActiveStep = 2)
    );
    handleChange();
  };

  const handleFixture = () => {
    console.log("fixture", selectEquipos);
    if (selectEquipos.length > 0) {
      const data = {
        equipos: selectEquipos,
        torneo_id: torneoCreated?.id,
      };
      FixtureServices.createFixtureService(data).then((res) => {
        console.log("res", res);
        setFixture(res?.data?.fixtureCreado);
        setFixtureCompleto(res?.data?.fixtureCreadoBack);
        setSorteo(true);
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debes seleccionar equipos",
        customClass: {
          container: "swal-overlay",
        },
      });
    }
  };

  const handleBack = () => {
    /*    setActiveStep((prevActiveStep) =>
      prevActiveStep > 0 ? prevActiveStep - 1 : (prevActiveStep = 0)
    ); */
    setActiveStep(0);
    //reset(defaultValues);
    setDefaultValues(reset(defaultValues));
    setOpen(false);
  };

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xl"
        TransitionComponent={Transition}
        sx={{
          ".MuiPaper-elevation24": {
            backgroundColor: "secondary.main",
          },
        }}
      >
        <Container
          sx={{
            pt: 3,
            backgroundColor: "primary.main",
            borderRadius: 5,
            width: "1800px !important",
          }}
        >
          {" "}
          {open &&
            (action === "create" || action === "edit" ? (
              <>
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
                    {action === "create" ? "Crear Torneo" : "Editar Torneo"}
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
                    mb: 3,
                  }}
                >
                  <form onSubmit={handleSubmit(onSubmit)}>
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
                    >
                      <Item
                        sx={{
                          width: "25%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          m: 0,
                        }}
                      >
                        <EmojiEventsIcon
                          sx={{ fontSize: 123, color: "secondary.main" }}
                        />
                      </Item>
                      <Item sx={{ width: "75%" }}>
                        <Grid item xs={12}>
                          <SteperComponent activeStep={activeStep} />
                          <Divider
                            sx={{
                              border: "solid 5px #546e7a",
                              backgroundColor: "secondary.main",
                            }}
                          />
                        </Grid>
                        <Slide
                          direction="left"
                          in={activeStep === 0}
                          mountOnEnter
                          unmountOnExit
                        >
                          <Grid
                            container
                            spacing={1}
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Grid item xl={6} lg={6} md={6} xs={6}>
                              <Item>
                                <FormSelect
                                  control={control}
                                  errors={errors}
                                  register={register}
                                  tieneLabel={true}
                                  textColor="red"
                                  name="season_id"
                                  rulesBol={true}
                                  text="Temporada"
                                  opcion={temporadas}
                                />
                              </Item>
                            </Grid>
                            <Grid item xl={6} lg={6} md={6} xs={12}>
                              <Item>
                                <FormSelect
                                  control={control}
                                  errors={errors}
                                  register={register}
                                  name="tipo_id"
                                  tieneLabel={true}
                                  textColor="#546e7a"
                                  rulesBol={true}
                                  text="Tipo de Torneo"
                                  opcion={tiposTorneos}
                                />
                              </Item>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Item>
                                <FormText
                                  control={control}
                                  errors={errors}
                                  register={register}
                                  textColor="#546e7a"
                                  name="nombre"
                                  labelText="Nombre"
                                  rulesBol={true}
                                  tieneLabel={true}
                                  text="Nombre"
                                  type="text"
                                />
                              </Item>
                            </Grid>
                            <Grid item xs={6} md={6}>
                              <Item>
                                <FormSelect
                                  control={control}
                                  errors={errors}
                                  register={register}
                                  name="region_id"
                                  rulesBol={true}
                                  opcion={continents}
                                  text="Región"
                                />
                              </Item>
                            </Grid>

                            <Grid item xs={4} md={4}>
                              <Item>
                                <FormText
                                  control={control}
                                  errors={errors}
                                  register={register}
                                  name="total_de_equipos"
                                  tieneLabel={true}
                                  textColor="primary.main"
                                  rulesBol={true}
                                  text="Total de Equipos"
                                  labelText="Total de Equipos"
                                  type="number"
                                />
                              </Item>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <Item>
                                <FormText
                                  control={control}
                                  errors={errors}
                                  tieneLabel={true}
                                  register={register}
                                  name="total_grupos"
                                  textColor="primary.main"
                                  rulesBol={true}
                                  text="Total de Grupos"
                                  labelText="Total de Grupos"
                                  type="number"
                                />
                              </Item>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <Item>
                                <FormText
                                  control={control}
                                  errors={errors}
                                  tieneLabel={true}
                                  register={register}
                                  name="rondas"
                                  textColor="black"
                                  rulesBol={true}
                                  text="Total de Rondas"
                                  labelText="Total de Rondas"
                                  type="number"
                                />
                              </Item>
                            </Grid>
                          </Grid>
                        </Slide>

                        <Slide
                          direction="left"
                          in={activeStep === 1}
                          mountOnEnter
                          unmountOnExit
                        >
                          <Box>
                            <Grid item xs={12} sx={{ my: 1 }}>
                              <Item
                                sx={{
                                  backgroundColor: "#546e7a",
                                  color: "white",
                                  mt: 0,
                                }}
                              >
                                {/*     <strong>Torneo:</strong> */}
                                {/* <div style={{ marginBottom: 5 }}>
                                    <Chip label={torneoCreated?.nombre} sx={{   backgroundColor: "#546e7a",}} />
                                  </div> */}
                                <strong>{torneoCreated?.nombre}</strong>
                              </Item>
                            </Grid>
                            <Stack
                              direction="row"
                              spacing={1}
                              sx={{ width: "100%" }}
                            >
                              <Stack
                                direction="column"
                                divider={<Divider />}
                                sx={{ width: "25%", mt: 2 }}
                              >
                                <Grid item xs={12} sx={{ my: 1 }}>
                                  <div
                                    style={{
                                      textAlign: "start",
                                      marginLeft: 8,
                                    }}
                                  >
                                    <strong>Cantidad de equipos:</strong>
                                  </div>
                                  <Item
                                    sx={{
                                      backgroundColor: "#546e7a",
                                      color: "white",
                                      mt: 0,
                                    }}
                                  >
                                    <strong>
                                      {torneoCreated?.total_de_equipos}
                                    </strong>
                                  </Item>
                                </Grid>
                                <Grid item xs={12} sx={{ my: 1 }}>
                                  <div
                                    style={{
                                      textAlign: "start",
                                      marginLeft: 8,
                                    }}
                                  >
                                    <strong>Cantidad de Grupos:</strong>
                                  </div>
                                  <Item
                                    sx={{
                                      backgroundColor: "#546e7a",
                                      color: "white",
                                      mt: 0,
                                    }}
                                  >
                                    <strong>
                                      {torneoCreated?.total_grupos}
                                    </strong>
                                  </Item>
                                </Grid>
                                <Grid item xs={12} sx={{ my: 1 }}>
                                  <div
                                    style={{
                                      textAlign: "start",
                                      marginLeft: 8,
                                    }}
                                  >
                                    <strong>Equipos por Grupos:</strong>
                                  </div>
                                  <Item
                                    sx={{
                                      backgroundColor: "#546e7a",
                                      color: "white",
                                      mt: 0,
                                    }}
                                  >
                                    <strong>
                                      {" "}
                                      {torneoCreated?.total_equipos_grupos}
                                    </strong>
                                  </Item>
                                </Grid>
                                <Grid item xs={12} sx={{ my: 1 }}>
                                  <div
                                    style={{
                                      textAlign: "start",
                                      marginLeft: 8,
                                    }}
                                  >
                                    <strong>Rondas:</strong>
                                  </div>
                                  <Item
                                    sx={{
                                      backgroundColor: "#546e7a",
                                      color: "white",
                                      mt: 0,
                                    }}
                                  >
                                    <strong> {torneoCreated?.rondas}</strong>
                                  </Item>
                                </Grid>
                                <Grid item xs={12} sx={{ my: 1 }}>
                                  <div
                                    style={{
                                      textAlign: "start",
                                      marginLeft: 8,
                                    }}
                                  >
                                    <strong>Región:</strong>
                                  </div>
                                  <Item
                                    sx={{
                                      backgroundColor: "#546e7a",
                                      color: "white",
                                      mt: 0,
                                    }}
                                  >
                                    <strong>
                                      {torneoCreated?.Continente?.nombre}
                                    </strong>
                                  </Item>
                                </Grid>
                              </Stack>
                              <Stack
                                direction="column"
                                divider={<Divider />}
                                sx={{ width: "75%", mt: 2 }}
                              >
                                {loading ? (
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      height: "100%",
                                    }}
                                  >
                                    <CircularProgress />
                                  </div>
                                ) : (
                                  <>
                                    {nationsByRegion.length > 0 && (
                                      <Grid item xs={6}>
                                        <Item>
                                          <FormAutocomplete
                                            control={control}
                                            errors={errors}
                                            register={register}
                                            name="nacion_id"
                                            text="Filtrar por nación"
                                            tieneLabel={true}
                                            opciones={nationsByRegion}
                                            setSelected={setSelectNation}
                                            labelText="Filtrar por Nación"
                                            textColor="primary.main"
                                          />
                                        </Item>
                                      </Grid>
                                    )}
                                    {equipos.length > 0 && (
                                      <Grid item xs={12}>
                                        <Item>
                                          <FormAutocomplete
                                            control={control}
                                            errors={errors}
                                            register={register}
                                            name="equipos"
                                            rulesBol={true}
                                            multiple={true}
                                            limitTags={5}
                                            limitTagsSelect={
                                              torneoCreated?.total_de_equipos
                                            }
                                            text="Seleccionar equipos participantes"
                                            opciones={equipos}
                                            selectEquipos={true}
                                            setSelected={setSelectEquipos}
                                            setSearchClub={setSearchClub}
                                            tieneLabel={true}
                                            labelText="Seleccionar equipos participantes"
                                            textColor="primary.main"
                                          />
                                        </Item>
                                      </Grid>
                                    )}
                                  </>
                                )}
                              </Stack>
                            </Stack>

                            {selectEquipos.length > 0 && (
                              <Item>
                                <div>
                                  <StyledBadge
                                    badgeContent={selectEquipos?.length}
                                    color="secondary"
                                  >
                                    <Chip
                                      label="Equipos seleccionados"
                                      color="primary"
                                    />
                                  </StyledBadge>
                                </div>
                                {selectEquipos.map((equipo, index) => (
                                  <Chip
                                    key={index}
                                    label={equipo.nombre}
                                    sx={{ m: 0.5 }}
                                  />
                                ))}
                              </Item>
                            )}
                          </Box>
                        </Slide>
                        <Slide
                          direction="left"
                          in={activeStep === 2}
                          mountOnEnter
                          unmountOnExit
                        >
                          <Grid
                            container
                            spacing={1}
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Grid item xs={12} sx={{ my: 1 }}>
                              <Item
                                sx={{
                                  backgroundColor: "#546e7a",
                                  color: "white",
                                  mt: 0,
                                }}
                              >
                                {/*     <strong>Torneo:</strong> */}
                                {/* <div style={{ marginBottom: 5 }}>
                                    <Chip label={torneoCreated?.nombre} sx={{   backgroundColor: "#546e7a",}} />
                                  </div> */}
                                <strong>{torneoCreated?.nombre}</strong>
                              </Item>
                            </Grid>
                            <Grid item xs={12}>
                              <Item>
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  sx={{ width: "100%" }}
                                >
                                  <Stack
                                    direction="column"
                                    divider={<Divider />}
                                    sx={{ width: "25%", mt: 2 }}
                                  >
                                    <Grid item xs={12} sx={{ my: 1 }}>
                                      <div
                                        style={{
                                          textAlign: "start",
                                          marginLeft: 8,
                                        }}
                                      >
                                        <strong>Cantidad de equipos:</strong>
                                      </div>
                                      <Item
                                        sx={{
                                          backgroundColor: "#546e7a",
                                          color: "white",
                                          mt: 0,
                                        }}
                                      >
                                        <strong>
                                          {torneoCreated?.total_de_equipos}
                                        </strong>
                                      </Item>
                                    </Grid>
                                    <Grid item xs={12} sx={{ my: 1 }}>
                                      <div
                                        style={{
                                          textAlign: "start",
                                          marginLeft: 8,
                                        }}
                                      >
                                        <strong>Cantidad de Grupos:</strong>
                                      </div>
                                      <Item
                                        sx={{
                                          backgroundColor: "#546e7a",
                                          color: "white",
                                          mt: 0,
                                        }}
                                      >
                                        <strong>
                                          {torneoCreated?.total_grupos}
                                        </strong>
                                      </Item>
                                    </Grid>
                                    <Grid item xs={12} sx={{ my: 1 }}>
                                      <div
                                        style={{
                                          textAlign: "start",
                                          marginLeft: 8,
                                        }}
                                      >
                                        <strong>Equipos por Grupos:</strong>
                                      </div>
                                      <Item
                                        sx={{
                                          backgroundColor: "#546e7a",
                                          color: "white",
                                          mt: 0,
                                        }}
                                      >
                                        <strong>
                                          {" "}
                                          {torneoCreated?.total_equipos_grupos}
                                        </strong>
                                      </Item>
                                    </Grid>
                                    <Grid item xs={12} sx={{ my: 1 }}>
                                      <div
                                        style={{
                                          textAlign: "start",
                                          marginLeft: 8,
                                        }}
                                      >
                                        <strong>Rondas:</strong>
                                      </div>
                                      <Item
                                        sx={{
                                          backgroundColor: "#546e7a",
                                          color: "white",
                                          mt: 0,
                                        }}
                                      >
                                        <strong>
                                          {" "}
                                          {torneoCreated?.rondas}
                                        </strong>
                                      </Item>
                                    </Grid>
                                    <Grid item xs={12} sx={{ my: 1 }}>
                                      <div
                                        style={{
                                          textAlign: "start",
                                          marginLeft: 8,
                                        }}
                                      >
                                        <strong>Región:</strong>
                                      </div>
                                      <Item
                                        sx={{
                                          backgroundColor: "#546e7a",
                                          color: "white",
                                          mt: 0,
                                        }}
                                      >
                                        <strong>
                                          {torneoCreated?.Continente?.nombre}
                                        </strong>
                                      </Item>
                                    </Grid>
                                  </Stack>
                                  <Stack
                                    direction="column"
                                    divider={<Divider />}
                                    sx={{ width: "75%", mt: 2 }}
                                  >
                                    {loading ? (
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          height: "100%",
                                        }}
                                      >
                                        <CircularProgress />
                                      </div>
                                    ) : (
                                      <>
                                        {selectEquipos.length > 0 && (
                                          <Item>
                                            <div>
                                              <StyledBadge
                                                badgeContent={
                                                  selectEquipos?.length
                                                }
                                                color="secondary"
                                              >
                                                <Chip
                                                  label="Equipos seleccionados"
                                                  color="primary"
                                                />
                                              </StyledBadge>
                                            </div>
                                            <Paper
                                              sx={{
                                                display: "flex",
                                                justifyContent: "start",
                                                flexWrap: "wrap",
                                                listStyle: "none",
                                                p: 0.5,
                                                m: 0,
                                              }}
                                              component="ul"
                                            >
                                              {selectEquipos.map(
                                                (equipo, index) => (
                                                  <Grid
                                                    item
                                                    xs={4}
                                                    key={index}
                                                    sx={{
                                                      display: "flex",
                                                      justifyContent: "start",
                                                    }}
                                                  >
                                                    <Tooltip
                                                      title={equipo.nombre}
                                                    >
                                                      <Chip
                                                        label={`${index + 1}. ${
                                                          equipo.nombre
                                                        }`}
                                                        size="small"
                                                        sx={{ m: 0.5 }}
                                                      />
                                                    </Tooltip>
                                                  </Grid>
                                                )
                                              )}
                                            </Paper>

                                            <Item>
                                              <Item sx={{ display: "flex" }}>
                                                <Grid item xs={6}>
                                                  <strong>Fecha desde:</strong>
                                                  <FormDate
                                                    control={control}
                                                    errors={errors}
                                                    register={register}
                                                    textColor="primary.main"
                                                    name="fecha_desde"
                                                    labelText="Fecha desde"
                                                    rulesBol={true}
                                                    text="Fecha desde"
                                                    type="date"
                                                    /*  readOnly={readOnlyProfile} */
                                                  />
                                                </Grid>
                                                <Divider
                                                  orientation="vertical"
                                                  flexItem
                                                />
                                                <Grid item xs={6}>
                                                  <strong>Fecha hasta:</strong>
                                                  <FormDate
                                                    control={control}
                                                    errors={errors}
                                                    register={register}
                                                    textColor="primary.main"
                                                    name="fecha_hasta"
                                                    labelText="Fecha hasta"
                                                    rulesBol={true}
                                                    text="Fecha desde"
                                                    type="date"
                                                    /*  readOnly={readOnlyProfile} */
                                                  />
                                                </Grid>
                                              </Item>
                                              <Button
                                                variant="contained"
                                                onClick={handleFixture}
                                                sx={{ mt: 1, mr: 1 }}
                                              >
                                                Crear Fixture
                                              </Button>
                                            </Item>
                                            {sorteo && (
                                              <GridComponent
                                                fixture={fixture}
                                              />
                                            )}
                                          </Item>
                                        )}
                                      </>
                                    )}
                                  </Stack>
                                </Stack>
                              </Item>
                            </Grid>
                          </Grid>
                        </Slide>

                        <Grid item xs={12}>
                          <Item>
                            <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                              Cancelar
                            </Button>
                            <Button
                              variant="contained"
                              type="submit"
                              sx={{ mt: 1, mr: 1 }}
                            >
                              {sorteo ? "Confirmar" : "Siguiente"}
                            </Button>
                          </Item>
                        </Grid>
                        {/*        <Grid item xl={4} lg={4} md={4} xs={6} sx={{ mt: 2 }}>
                          <Item>
                            <Button
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
                            </Button>
                          </Item>
                        </Grid> */}
                      </Item>
                    </Stack>
                  </form>
                </Item>
              </>
            ) : (
              action === "ver" && (
                <Grid
                  container
                  spacing={3}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    pl: "25px",
                    pb: "25px",
                  }}
                >
                  <Grid item xl={4} lg={4} md={4} xs={6}>
                    <Item>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        Equipo:
                        <Chip sx={{ mt: 1 }} color="primary" />
                      </Typography>
                    </Item>
                  </Grid>
                  <Grid item xl={4} lg={4} md={4} xs={6}>
                    <Item>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        Nacionalidad:
                        <Chip sx={{ mt: 1 }} color="primary" />
                      </Typography>
                    </Item>
                  </Grid>
                  <Grid item xl={4} lg={4} md={4} xs={6}>
                    <Item>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        Altura:
                        <Chip sx={{ mt: 1 }} color="primary" />
                      </Typography>
                    </Item>
                  </Grid>
                  <Grid item xl={4} lg={4} md={4} xs={6}>
                    <Item>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        Peso:
                        <Chip sx={{ mt: 1 }} color="primary" />
                      </Typography>
                    </Item>
                  </Grid>
                  <Grid item xl={4} lg={4} md={4} xs={6}>
                    <Item>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        Calidad Actual:
                        <Chip sx={{ mt: 1 }} color="primary" />
                      </Typography>
                    </Item>
                  </Grid>
                  <Grid item xl={4} lg={4} md={4} xs={6}>
                    <Item>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        Calidad Potencial:
                        <Chip sx={{ mt: 1 }} color="primary" />
                      </Typography>
                    </Item>
                  </Grid>
                  <Grid item xl={4} lg={4} md={4} xs={6}>
                    <Item>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        Valor:
                        <Chip sx={{ mt: 1 }} color="primary" />
                      </Typography>
                    </Item>
                  </Grid>
                </Grid>
              )
            ))}
        </Container>
      </Dialog>
    </div>
  );
}
