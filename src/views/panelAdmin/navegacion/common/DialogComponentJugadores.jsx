import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { styled } from "@mui/material/styles";

import Paper from "@mui/material/Paper";
import SaveIcon from "@mui/icons-material/Save";
import { useSelector } from "react-redux";
import Chip from "@mui/material/Chip";

//CONSTRUCCION DEL FORM
import { Controller, useForm } from "react-hook-form";
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
  TextField,
  Autocomplete,
} from "@mui/material";
import jugadoresServices from "../../../../services/api/jugadores/jugadoresService";
import Swal from "sweetalert2";
import Silueta from "../../../../assets/images/persons/silueta.png";
import FormAutocomplete from "../../../../components/forms/imputs/FormAutocomplete";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: theme.spacing(1),
  borderRadius: "5px",
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "-1px 1px 1px 1px rgba(204,165,0,1)",
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogComponentJugadores(props) {
  const { open, setOpen, setLoading, equipos, jugador, action } = props;
  const { nations } = useSelector((state) => state.regiones);
  const [loading, setLoadings] = React.useState(false);

  console.log("jugador Llegando al hijo", jugador);
  console.log("action", action);

  const handleClose = () => {
    setOpen(false);
  };

  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: 0,
      nombre: "",
      nacionalidad: [],
      equipo: null,
      altura: 0,
      peso: 0,
      ca: 0,
      cp: 0,
      valor: 0,
    },
  });

  React.useEffect(() => {
    setLoadings(false);
    if (jugador) {
      if (action === "edit") {
        setValue("id", jugador.id);
        setValue("nombre", jugador.nombre);
        setValue("nacionalidad", jugador.nacionalidad);
        setValue("equipo", jugador.equipo);
        setValue("altura", jugador.altura);
        setValue("peso", jugador.peso);
        setValue("ca", jugador.ca);
        setValue("cp", jugador.cp);
        setValue("valor", jugador.valor);
      } else if (action === "create") {
        setValue("id", 0);
        setValue("nombre", "");
        setValue("nacionalidad", []);
        setValue("equipo", 0);
        setValue("altura", 0);
        setValue("peso", 0);
        setValue("ca", 0);
        setValue("cp", 0);
        setValue("valor", 0);
      }
    }
  }, [jugador, setValue, action]);

  const onSubmit = (formValue) => {
    console.log(formValue);
    if (action === "create") {
      jugadoresServices.createJugadorService(formValue).then((res) => {
        console.log(res);
        setLoading(true);
        Swal.fire({
          title: "Jugador Creado",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        handleClose();
      });
    } else if (action === "edit") {
      jugadoresServices.updateJugadorService(formValue).then((res) => {
        console.log(res);
        setLoading(true);
        Swal.fire({
          title: "Jugador Actualizado",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        handleClose();
      });
    }
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
          sx={{ pt: 3, backgroundColor: "primary.main", borderRadius: 5 }}
        >
          <Toolbar
            sx={{
              backgroundColor: "#757575",

              borderTopLeftRadius: "14px",
              borderTopRightRadius: "14px",
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: "white", fontWeight: 700 }}
            >
              {action === "create"
                ? "Crear Nuevo Jugador"
                : action === "edit"
                ? "Editar a " + jugador?.nombre
                : "Ver a " + jugador.nombre}
            </Typography>
            <Button
              autoFocus
              sx={{ color: "white", fontWeight: 700 }}
              onClick={handleClose}
            >
              Cerrar
            </Button>
          </Toolbar>
          {action === "create" || action === "edit" ? (
            <form onSubmit={handleSubmit(onSubmit)}>
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
                spacing={2}
              >
                <Item sx={{ width: "100%" }}>
                  <Grid
                    container
                    spacing={3}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      pl: "25px",
                      pb: "25px",
                      mt: 2,
                    }}
                  >
                    <Grid item xl={4} lg={4} md={6} xs={6}>
                      <Item>
                        <FormText
                          control={control}
                          errors={errors}
                          register={register}
                          name="id"
                          rulesBol={true}
                          text="ID Jugador"
                          labelText="ID Jugador"
                          tieneLabel={true}
                          type="number"
                          readOnly={true}
                          textColor="#4D4D4D"
                        />
                      </Item>
                    </Grid>
                    <Grid item xl={4} lg={4} md={6} xs={6}>
                      <Item>
                        <FormText
                          control={control}
                          errors={errors}
                          register={register}
                          name="nombre"
                          labelText="Nombre"
                          rulesBol={true}
                          tieneLabel={true}
                          text="Nombre"
                          type="text"
                          vmodel={jugador && jugador.nombre}
                          textColor="#4D4D4D"
                        />
                      </Item>
                    </Grid>
                    <Grid item xl={4} lg={4} md={6} xs={6}>
                      <Item>
                  

                        <FormAutocomplete
                          control={control}
                          errors={errors}
                          tieneLabel={true}
                          register={register}
                          name="nacionalidad"
                          rulesBol={true}
                          textColor="#4D4D4D"
                          labelText="Nacionalidad"
                          text="Nacionalidad"
                          opciones={nations?.nations}
                        />
                      </Item>
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} xs={6}>
                      <Item>
                        <FormAutocomplete
                          control={control}
                          errors={errors}
                          register={register}
                          name="equipo"
                          rulesBol={true}
                          text="Equipo"
                          opciones={equipos}
                          selectEquipos={true}
                          tieneLabel={true}
                          labelText="Equipo"
                          textColor="primary.main"
                        />
                      </Item>
                    </Grid>
                    <Grid item xl={4} lg={4} md={6} xs={6}>
                      <Item>
                        <FormText
                          control={control}
                          errors={errors}
                          register={register}
                          name="altura"
                          tieneLabel={true}
                          rulesBol={true}
                          text="Altura - Cm"
                          labelText="Altura - Cm"
                          type="number"
                          textColor="#4D4D4D"
                        />
                      </Item>
                    </Grid>
                    <Grid item xl={4} lg={4} md={6} xs={6}>
                      <Item>
                        <FormText
                          control={control}
                          errors={errors}
                          register={register}
                          name="peso"
                          tieneLabel={true}
                          rulesBol={true}
                          text="Peso - Kg"
                          labelText="Peso - Kg"
                          type="number"
                          textColor="#4D4D4D"
                        />
                      </Item>
                    </Grid>
                    <Grid item xl={4} lg={4} md={6} xs={6}>
                      <Item>
                        <FormText
                          control={control}
                          errors={errors}
                          tieneLabel={true}
                          register={register}
                          name="ca"
                          rulesBol={true}
                          text="Calidad Actual"
                          labelText="Calidad Actual"
                          type="number"
                          textColor="#4D4D4D"
                        />
                      </Item>
                    </Grid>
                    <Grid item xl={4} lg={4} md={6} xs={6}>
                      <Item>
                        <FormText
                          control={control}
                          errors={errors}
                          register={register}
                          tieneLabel={true}
                          name="cp"
                          rulesBol={true}
                          text="Calidad Potencial"
                          labelText="Calidad Potencial"
                          type="number"
                          textColor="#4D4D4D"
                        />
                      </Item>
                    </Grid>
                    <Grid item xl={4} lg={4} md={6} xs={6}>
                      <Item>
                        <FormText
                          control={control}
                          errors={errors}
                          register={register}
                          name="valor"
                          tieneLabel={true}
                          rulesBol={true}
                          text="Valor - €"
                          labelText="Valor - €"
                          type="number"
                          textColor="#4D4D4D"
                        />
                      </Item>
                    </Grid>
                  </Grid>
                  <Grid item xl={4} lg={4} md={6} xs={6} sx={{ mt: 2 }}>
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
                          backgroundColor: "#757575",
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
                  </Grid>
                </Item>
              </Stack>
            </form>
          ) : (
            action === "ver" && (
              <>
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
                  spacing={2}
                >
                  <Item
                    sx={{
                      width: "15%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      m: 0,
                      background: "#e5e5e5",
                      mb: 3,
                    }}
                  >
                    <img src={Silueta} width="123px" alt="jugador" />
                    <Typography
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                      variant="h6"
                    >
                      {jugador?.nombre}
                    </Typography>
                  </Item>
                  <Item
                    sx={{
                      width: "85%",
                      background: "#e5e5e5",
                      mb: "1.5rem !important",
                    }}
                  >
                    <Grid
                      container
                      spacing={3}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        pl: "25px",
                        pb: "25px",
                        mt: 3,
                      }}
                    >
                      <Grid item xl={4} lg={4} md={6} xs={6}>
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
                            <Chip
                              sx={{ mt: 1 }}
                              color="primary"
                              label={jugador?.equipo}
                            />
                          </Typography>
                        </Item>
                      </Grid>
                      <Grid item xl={4} lg={4} md={6} xs={6}>
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
                            <Chip
                              sx={{ mt: 1 }}
                              color="primary"
                              label={jugador?.nacionalidad}
                            />
                          </Typography>
                        </Item>
                      </Grid>
                      <Grid item xl={4} lg={4} md={6} xs={6}>
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
                            <Chip
                              sx={{ mt: 1 }}
                              color="primary"
                              label={jugador?.altura + " cm"}
                            />
                          </Typography>
                        </Item>
                      </Grid>
                      <Grid item xl={4} lg={4} md={6} xs={6}>
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
                            <Chip
                              sx={{ mt: 1 }}
                              color="primary"
                              label={jugador?.peso + " kg"}
                            />
                          </Typography>
                        </Item>
                      </Grid>
                      <Grid item xl={4} lg={4} md={6} xs={6}>
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
                            <Chip
                              sx={{ mt: 1 }}
                              color="primary"
                              label={jugador?.ca}
                            />
                          </Typography>
                        </Item>
                      </Grid>
                      <Grid item xl={4} lg={4} md={6} xs={6}>
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
                            <Chip
                              sx={{ mt: 1 }}
                              color="primary"
                              label={jugador?.cp}
                            />
                          </Typography>
                        </Item>
                      </Grid>
                      <Grid item xl={4} lg={4} md={6} xs={6}>
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
                            <Chip
                              sx={{ mt: 1 }}
                              color="primary"
                              label={"€ " + jugador?.valor}
                            />
                          </Typography>
                        </Item>
                      </Grid>
                    </Grid>
                  </Item>
                </Stack>
              </>
            )
          )}
        </Container>
      </Dialog>
    </div>
  );
}
