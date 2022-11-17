import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Img } from "../../../styles-components/Layout";
import Portada from "../../../assets/images/banners/portadacofm.png";
import "./styles/Colaboradores.css";

import PortadaImg from "../../../assets/images/generales/cuerpoTecnico.jpeg";
import IconSuperLiga from "../../../assets/images/entherprise/logoSuperliga.png";
import IconCofm from "../../../assets/images/entherprise/logo.png";
import GroupsIcon from "@mui/icons-material/Groups";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import FormDate from "../../../components/forms/imputs/FormDate";
import { useForm } from "react-hook-form";
import reunionesService from "../../../services/api/reuniones/reunionesService";
import Swal from "sweetalert2";

const ContactoColaborador = () => {
  const [values, setValues] = React.useState();
  const [valueDate, setValueDate] = React.useState();
  const [disponible, setDisponible] = React.useState();
  const [activeForm, setActiveForm] = React.useState(false);
  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fecha: "",
      nombre: "",
      apellido: "",
      telefono: "",
      hora: "",
    },
  });

  const clearForm = () => {
    setValue("fecha", "");
    setValue("nombre", "");
    setValue("apellido", "");
    setValue("telefono", "");
    setValue("hora", "");
    setDisponible([]);
    setActiveForm(false);
  };

  const onSubmit = async (data) => {
    if (!activeForm) {
      console.log("Valor", data);
      setValueDate(data);
      const response = await reunionesService.getReunionesService(data);
      console.log("RESPPONSE REUNIONES", response);
      setDisponible(response[0]);
    } else {
      const response = await reunionesService.createReunionesService(data);
      console.log("RESPPONSE REUNIONES CREATEEE", response);
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Reunión creada con éxito",
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al crear reunión",
          showConfirmButton: false,
          timer: 3000,
        });
      }
      clearForm();
    }
  };

  const handleTurno = (hora) => {
    console.log("Valor", hora);
    setActiveForm(true);
    setValue("hora", hora?.hora);
  };

  console.log("response data reuniones", disponible);

  return (
    <>
      <Toolbar sx={{}} />
      <Box className="headerImage">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100%",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "100%",
              width: "100%",
              backgroundColor: "rgba(0,0,0,0.4)",
            }}
          >
            <Box>
              <img
                width={273}
                height={273}
                src={IconSuperLiga}
                alt="superliga"
              />
              <img width={273} height={273} src={IconCofm} alt="superliga" />
            </Box>
            <Typography
              variant="h3"
              sx={{
                color: "#fff",
                fontWeight: "bold",
                textShadow: "0px 0px 10px #cca500",
              }}
              gutterBottom
            >
              ¿Quieres ser parte de la Superliga?
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: "#fff",
                fontWeight: "bold",
                textShadow: "0px 0px 10px #cca500",
              }}
            >
              Convierte en un colaborador de la Superliga y forma parte de la
              comunidad de fm mas grande de latinoamerica.
            </Typography>
          </Box>
        </Box>
      </Box>
      <Container>
        <Grid container component="main" sx={{ height: "" }}>
          <CssBaseline />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <GroupsIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Coordinar una reunion
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 1 }}
              >
                <FormDate
                  control={control}
                  name="fecha"
                  label="Fecha"
                  errorobj={errors}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Consultar disponibilidad
                </Button>
              </Box>
              <Box>
                {disponible &&
                  disponible.turnosOrdenados &&
                  disponible.turnosOrdenados.map((item) => (
                    <Button
                      disabled={item.ocupado}
                      sx={{
                        mr: 1,
                        mb: 1,
                        backgroundColor: item.ocupado ? "red" : "green",
                        "&:disabled":{
                          backgroundColor: "red",
                          color:"white"
                        }
                      }}
                      variant="contained"
                      onClick={() => {
                        handleTurno(item);
                      }}
                    >
                      {item.hora}
                    </Button>
                  ))}
              </Box>

              {activeForm && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Formulario de contacto
                  </Typography>
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ mt: 1 }}
                  >
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          margin="normal"
                          required
                          id="nombre"
                          label="Nombre"
                          name="nombre"
                          autoComplete="nombre"
                          autoFocus
                          {...register("nombre", {
                            required: "El nombre es requerido",
                          })}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          margin="normal"
                          required
                          id="apellido"
                          label="Apellido"
                          name="apellido"
                          autoComplete="apellido"
                          autoFocus
                          {...register("apellido", {
                            required: "El apellido es requerido",
                          })}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          margin="normal"
                          required
                          id="telefono"
                          label="Telefono"
                          name="telefono"
                          autoComplete="telefono"
                          autoFocus
                          {...register("telefono", {
                            required: "El telefono es requerido",
                          })}
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Reservar
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://cdn.akamai.steamstatic.com/steam/apps/1904540/capsule_616x353.jpg?t=1668082258)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Grid>
      </Container>
    </>
  );
};

export default ContactoColaborador;
