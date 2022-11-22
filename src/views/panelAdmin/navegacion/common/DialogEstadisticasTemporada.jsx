import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { styled } from "@mui/material/styles";

import Paper from "@mui/material/Paper";
import SaveIcon from "@mui/icons-material/Save";
import { useSelector } from "react-redux";
import Chip from "@mui/material/Chip";
import FormAutocomplete from "../../../../components/forms/imputs/FormAutocomplete";
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

export default function DialogEstadisticaTemporada(props) {
  const { open, setOpen, action, setLoadingTemp, season_id } = props;
  const [switchState, setSwitchState] = React.useState(false);
  const [jugadores, setJugadores] = React.useState([]);
  const [equipos, setEquipos] = React.useState([]);
  const [manager, setManager] = React.useState([]);

  console.log("action", action);

  const handleClose = () => {
    setOpen(false);
  };

  const getJugadoresBySeason = async (data) => {
    const res = await seasonsServices.getJugadoresBySeasonService(data);
    setJugadores(res);
  };
  const getManagersBySeason = async (data) => {
    const res = await seasonsServices.getManagersBySeasonService(data);
    setManager(res);
  };
  const getEquiposBySeason = async (data) => {
    const res = await seasonsServices.getEquiposBySeasonService(data);
    setEquipos(res);
  };

  React.useEffect(() => {
    getJugadoresBySeason(season_id);
    getManagersBySeason(season_id);
    getEquiposBySeason(season_id);
  }, [season_id]);

  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      manager_mvp_id: null,
      equipo_mvp_id: null,
      jugador_mvp_id: null,
      estado: false,
    },
  });

  const onSubmit = async (formValue) => {
    console.log(formValue);

    let estadisticas = {
      season_id: season_id,
      manager_mvp_id: formValue.manager_mvp_id.id,
      equipo_mvp_id: formValue.equipo_mvp_id.id,
      jugador_mvp_id: formValue.jugador_mvp_id.id,
      estado: formValue.estado,
    };

        await seasonsServices
          .cargarEstadisticasService(estadisticas)
          .then((res) => {
            console.log("res", res);
            if (res.status === 200) {
              console.log("entro if 2");
              Swal.fire({
                title:
                  "Estadisticas de la temporada actualizadas",
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
      
   
  };


  console.log("jugadores estadisticas", jugadores);

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
                Cargar estadisticas de Temporada
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
                      <Grid item xs={6}>
                        <Item>
                        <Chip label="Mejor Manager" color="primary" sx={{mb:1.5}} />
                          <FormAutocomplete
                            control={control}
                            errors={errors}
                            register={register}
                            name="manager_mvp_id"
                            rulesBol={true}
                            textColor="primary.main"
                            labelText="Jugador con Mas Asistencias"
                            text="Juagdor con Mas Asistencias"
                            opciones={manager}
                            /*  readOnly={readOnlyProfile} */
                          />
                        </Item>
                      </Grid>
                      <Grid item xs={6}>
                        <Item>
                        <Chip label="Mejor Equipo" color="primary" sx={{mb:1.5}} />
                          <FormAutocomplete
                            control={control}
                            errors={errors}
                            register={register}
                            name="equipo_mvp_id"
                            rulesBol={true}
                            textColor="primary.main"
                            labelText="Goleador de la temporada"
                            text="Goleador de la temporada"
                            opciones={equipos}
                            /*  readOnly={readOnlyProfile} */
                          />
                        </Item>
                      </Grid>
                      <Grid item xs={6}>
                        <Item>
                          <Chip label="Mejor Jugador" color="primary" sx={{mb:1.5}} />
                          <FormAutocomplete
                            control={control}
                            errors={errors}
                            register={register}
                            name="jugador_mvp_id"
                            rulesBol={true}
                            textColor="primary.main"
                            labelText="Mejor Jugador de la temporada"
                            text="Mejor "
                            opciones={jugadores}
                            /*  readOnly={readOnlyProfile} */
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
                              ¿ Desea finalizar la temporada?
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
        </Container>
      </Dialog>
    </div>
  );
}
