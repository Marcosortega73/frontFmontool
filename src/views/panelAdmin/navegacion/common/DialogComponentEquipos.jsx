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
import { useForm } from "react-hook-form";
import { FormText } from "../../../../components/forms/imputs/FormText";
import { FormSelect } from "../../../../components/forms/imputs/FormSelect";
import {
  Container,
  Grid,
  Typography,
  Avatar,
  Toolbar,
  Divider,
  Stack,
} from "@mui/material";
import equiposServices from "../../../../services/api/equipos/equiposServices";
import FormAutocomplete from "../../../../components/forms/imputs/FormAutocomplete";
import LogoEquipo from "../../../../assets/images/logos/LogoLocal.png";

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

export default function DialogComponentEquipos(props) {
  const {
    open,
    setOpen,
    setLoading,
    equipo,
    setEquiposSelect,
    managers,
    torneos,
    action,
  } = props;
  const { nations } = useSelector((state) => state.regiones);

  console.log("equipo Llegando al hijo ahora", equipo);
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
      nombre_corto: "",
      nacionalidad: 0,
      manager: 0,
      torneo: 0,
    },
  });

  React.useEffect(() => {
    if (action === "edit") {
      setValue("id", equipo.id);
      setValue("nombre", equipo.nombre);
      setValue("nombre_corto", equipo.nombre_corto);
      setValue("nacionalidad", equipo.nacionalidad);
      setValue("manager", equipo?.manager);
      setValue("torneo", equipo?.torneo);
    } else if (action === "create") {
      setValue("id", 0);
      setValue("nombre", "");
      setValue("nacionalidad", []);
      setValue("manager", 0);
      setValue("torneo", 0);
    }
  }, [equipo, setValue, action]);

  const onSubmit = (formValue) => {
    console.log(formValue);
    if (action === "create") {
      equiposServices.createEquiposService(formValue);
    } else if (action === "edit") {
      equiposServices.updateEquiposService(formValue);
    }
    setOpen(false);
    setLoading(true);
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
                ? "Crear Nuevo Equipo"
                : action === "edit"
                ? "Editar a " + equipo?.nombre
                : "Ver a " + equipo.nombre}
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
                <Item sx={{ width: "100%", backgroundColor: "#e5e5e5" }}>
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
                    <Grid item xl={12} lg={12} md={12} xs={12}>
                      <Item>
                        <FormText
                          control={control}
                          errors={errors}
                          register={register}
                          name="nombre"
                          labelText="Nombre"
                          rulesBol={true}
                          text="Nombre"
                          type="text"
                          vmodel={equipo && equipo.nombre}
                          textColor="#4D4D4D"
                          tieneLabel={true}
                        />
                      </Item>
                    </Grid>
                    <Grid item xl={6} lg={6} md={6} xs={12}>
                      <Item>
                        <FormText
                          control={control}
                          errors={errors}
                          register={register}
                          name="nombre_corto"
                          rulesBol={true}
                          text="Nombre Corto"
                          labelText="Nombre Corto"
                          textColor="#4D4D4D"
                          tieneLabel={true}
                        />
                      </Item>
                    </Grid>
                    <Grid item xl={6} lg={6} md={6} xs={12}>
                      <Item>
                        <FormText
                          control={control}
                          errors={errors}
                          register={register}
                          name="id"
                          rulesBol={true}
                          text="ID equipo"
                          labelText="ID equipo"
                          type="number"
                          textColor="#4D4D4D"
                          tieneLabel={true}
                        />
                      </Item>
                    </Grid>

                    <Grid item xl={6} lg={6} md={6} xs={12}>
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
                  </Grid>
                  <Grid item xl={4} lg={4} md={6} xs={12} sx={{ mt: 2 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      endIcon={<SaveIcon />}
                      sx={{
                        height: "50px",
                        borderRadius: "5px",
                        color: "white",
                        fontSize: "20px",
                        fontWeight: "bold",
                        marginTop: "10px",
                        marginBottom: "10px",
                        "&:hover": {
                          backgroundColor: "#4D4D4D",
                        },
                      }}
                    >
                      Guardar
                    </Button>
                  </Grid>
                </Item>
              </Stack>
            </form>
          ) : (
            action === "ver" && (
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
                  <img src={LogoEquipo} width="123px" alt="jugador" />
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
                    }}
                  >
                    <Grid item xl={12} lg={12} md={6} xs={12}>
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
                          Nombre:
                          <Chip
                            sx={{ mt: 1 }}
                            color="primary"
                            label={equipo?.nombre}
                          />
                        </Typography>
                      </Item>
                    </Grid>
                    <Grid item xl={6} lg={6} md={6} xs={12}>
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
                          Manager:
                          <Chip
                            sx={{ mt: 1 }}
                            color="primary"
                            label={
                              equipo.manager ? equipo.manager : "Sin entrenador"
                            }
                          />
                        </Typography>
                      </Item>
                    </Grid>
                    <Grid item xl={6} lg={6} md={6} xs={12}>
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
                            label={equipo.nacionalidad}
                          />
                        </Typography>
                      </Item>
                    </Grid>
                    <Grid item xl={6} lg={6} md={6} xs={12}>
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
                          Torneo:
                          {equipo?.Torneos?.length > 0 ? (
                            equipo.Torneos.map((torneo) => (
                              <Chip
                                sx={{ mt: 1 }}
                                color="primary"
                                label={torneo.nombre}
                              />
                            ))
                          ) : (
                            <Chip
                              sx={{ mt: 1 }}
                              color="primary"
                              label="Sin torneo"
                            />
                          )}
                        </Typography>
                      </Item>
                    </Grid>
                    <Grid item xl={6} lg={6} md={6} xs={12}>
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
                          ID Equipo:
                          <Chip
                            sx={{ mt: 1 }}
                            color="primary"
                            label={equipo?.id}
                          />
                        </Typography>
                      </Item>
                    </Grid>
                  </Grid>
                </Item>
              </Stack>
            )
          )}
        </Container>
      </Dialog>
    </div>
  );
}
