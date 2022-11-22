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

//CONSTRUCCION DEL FORM
import { useForm } from "react-hook-form";
import { FormText } from "../../../../components/forms/imputs/FormText";
import { FormSelect } from "../../../../components/forms/imputs/FormSelect";
import {
  Container,
  Grid,
  Typography,
  Toolbar,
  Stack,
  Divider,
  Switch,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import Swal from "sweetalert2";
import FormDate from "../../../../components/forms/imputs/FormDate";
import seasonsServices from "../../../../services/api/seasons/seasonsService";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: theme.spacing(1),
  borderRadius: "5px",
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogComponentTemporada(props) {
  const { open, setOpen, action, setLoadingTemp } = props;
  const [switchState, setSwitchState] = React.useState(false);

  console.log("action", action);

  const handleClose = () => {
    setValue("nombre", "");
    setValue("fecha_inicio", "");
    setValue("fecha_fin", "");
    setValue("equipo_campeon_id", null);
    setValue("manager_campeon_id", null);
    setValue("equipo_mvp_id", null);
    setValue("jugador_mvp_id", null);
    setValue("jugador_goleador_id", null);
    setValue("jugador_asistente_id", null);
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
      nombre: "",
      fecha_inicio: "",
      fecha_fin: "",
      equipo_campeon_id: null,
      manager_campeon_id: null,
      equipo_mvp_id: null,
      jugador_mvp_id: null,
      jugador_goleador_id: null,
      jugador_asistente_id: null,
      estado: false,
    },
  });

  const onSubmit = async (formValue) => {
    console.log(formValue);
    console.log(action);

    if (action === "create") {
      console.log("entro if");
      if (formValue.estado) {
        Swal.fire({
          title: "¿Estas seguro?",
          text: "La temporada se creara como actual y se desactivara la temporada actual",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, crear!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            await seasonsServices
              .createSeasonService(formValue)
              .then((res) => {
                console.log("res", res);
                if (res.status === 200) {
                  console.log("entro if 2");
                  Swal.fire({
                    title: "Temporada Creada correctamente",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                  });
                  handleClose();
                  setLoadingTemp(true);
                  setOpen(false);
                }
              })
              .catch((err) => {
                console.log("err", err);
              });
          }
        });
      }
      else{
        await seasonsServices
        .createSeasonService(formValue)
        .then((res) => {
          console.log("res", res);
          if (res.status === 200) {
            console.log("entro if 2");
            Swal.fire({
              title: "Temporada Creada correctamente,queda en estado en espera",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            handleClose();
            setLoadingTemp(true);
            setOpen(false);
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
      }
    } else {
      await seasonsServices.updateSeasonService(formValue);
    }
    setOpen(false);
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
          {action === "create" || action === "edit" ? (
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
                  {action === "create"
                    ? "Crear Nueva Temporada"
                    : "Editar Temporada"}
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
                        width: "30%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        m: 0,
                      }}
                    >
                      <EventIcon
                        sx={{ fontSize: 123, color: "secondary.main" }}
                      />
                    </Item>
                    <Item sx={{ width: "70%" }}>
                      <Grid
                        container
                        spacing={1}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Grid item xs={12}>
                          <Item>
                            <FormText
                              control={control}
                              errors={errors}
                              register={register}
                              name="nombre"
                              tieneLabel={true}
                              textColor="primary.main"
                              rulesBol={true}
                              text="Nombre"
                              labelText="Nombre"
                              type="text"
                            />
                          </Item>
                        </Grid>
                        <Grid item xs={6}>
                          <Item>
                            <FormDate
                              control={control}
                              errors={errors}
                              disablePast={true}
                              register={register}
                              textColor="primary.main"
                              name="fecha_inicio"
                              labelText="Fecha de Inicio"
                              rulesBol={true}
                              tieneLabel={true}
                              text="Fecha de Inicio"
                              type="text"
                            />
                          </Item>
                        </Grid>
                        <Grid item xs={6}>
                          <Item>
                            <FormDate
                              control={control}
                              errors={errors}
                              register={register}
                              disablePast={true}
                              textColor="primary.main"
                              name="fecha_fin"
                              labelText="Fecha de Fin"
                              rulesBol={true}
                              tieneLabel={true}
                              text="Fecha de Fin"
                              type="text"
                            />
                          </Item>
                        </Grid>
                        <Grid item xs={8}>
                          <Item
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <FormGroup>
                              <Typography
                                variant="h6"
                                sx={{ color: "primary.main" }}
                              >
                                ¿ Desea crear esta temporada como actual?
                              </Typography>
                              <FormControlLabel
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                                control={
                                  <Switch
                                    size="large"
                                    onChange={(e) => {
                                      setSwitchState(e.target.checked);
                                      setValue("estado", e.target.checked);
                                    }}
                                  />
                                }
                                label={switchState ? "Si" : "No"}
                              />
                            </FormGroup>
                          </Item>
                        </Grid>
                      </Grid>
                      <Grid item xl={4} lg={4} md={4} xs={6} sx={{ mt: 2 }}>
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
                <Grid xl={4} lg={4} md={4} xs={6}>
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
                <Grid xl={4} lg={4} md={4} xs={6}>
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
                <Grid xl={4} lg={4} md={4} xs={6}>
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
                <Grid xl={4} lg={4} md={4} xs={6}>
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
                <Grid xl={4} lg={4} md={4} xs={6}>
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
                <Grid xl={4} lg={4} md={4} xs={6}>
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
                <Grid xl={4} lg={4} md={4} xs={6}>
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
          )}
        </Container>
      </Dialog>
    </div>
  );
}
