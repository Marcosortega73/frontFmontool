import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import {
  Autocomplete,
  Chip,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Select,
} from "@mui/material";
import { Container, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import { useForm, Controller } from "react-hook-form";
import Button from "@mui/material/Button";

import Swal from "sweetalert2";

import userPendingService from "../../../../services/api/auth/userPending";
import { FormText } from "../../../../components/forms/imputs/FormText";

export default function DialogManagerComponent({
  open,
  setOpen,
  managerId,
  equipos,
  updateUser,
  userStates,
  setLoadingPending,
}) {
  const [loading, setLoading] = React.useState(true);

  const [selectRoleFinal, setSelectRoleFinal] = React.useState("");

  const [selectState, setSelectState] = React.useState("");

  const roles = ["USER", "MANAGER", "ADMIN"];

  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      equipo_id: {},
      rol: "",
      state: "",
    },
  });

  React.useEffect(() => {
    setLoading(false);
    if (managerId) {
      setValue("email", managerId.row.email);
      setValue("rol", managerId.row.rol);
      setValue("state", managerId.row.state_id);

      //Rol y estado inicial
      setSelectRoleFinal(managerId.row.rol);
      setSelectState(managerId.row.state_id);
    }
  }, [equipos, managerId, setValue, open]);

  React.useEffect(() => {

    setSelectRoleFinal(selectRoleFinal);

    if (selectRoleFinal === "ADMIN") {
      setValue("state", 5);
    } else if (selectRoleFinal === "USER") {
      setValue("state", 1);
    } else if (selectRoleFinal === "MANAGER") {
      setValue("state", 4);
    }
  }, [selectRoleFinal, setSelectRoleFinal, setValue]);

  React.useEffect(() => {
    setSelectState(selectState);
  }, [selectState, setSelectState]);

  const handleChangeSelectState = (value) => {
    const selectStateValue = value;
    setSelectState(selectStateValue);
  };

  const handleChangeSelectRol = (value) => {
    const selectRoleFinalValue = value;

    console.log(selectRoleFinalValue);
    if (selectRoleFinalValue === "ADMIN") {
      setSelectState("Activo");
    } else {
      setSelectState("Pendiente");
    }
    setSelectRoleFinal(selectRoleFinalValue);
  };

  const onSubmit = async (data) => {
    console.log(data);
    const { email, rol, state } = data;

    //Condicionar datos del form para enviar
    setLoading(true);

    if (selectState === 2) {
      const equipo_id = data.equipo_id.id;
      const dataSend = {
        email,
        equipo_id,
        rol,
        state,
      };
      setOpen(false);
      setLoading(false);
      Swal.fire({
        title: "¿Estas seguro?",
        text: "Se creara un nuevo manager",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, actualizar!",
        cancelButtonText: "No, cancelar!",
      })
        .then((result) => {
          if (result.value) {
            userPendingService
              .registerUserPendingService(dataSend)
              .then((res) => {
                if (res.status === 200) {
                  Swal.fire(
                    "Actualizado!",
                    "El Manager se creo correctamente",
                    "success"
                  );
                  setOpen(false);
                  updateUser();
                  setLoadingPending(true);
                } else {
                  Swal.fire(
                    "Error!",
                    "El usuario no se actualizo correctamente",
                    "error"
                  );
                  setOpen(false);
                }
              })
              .catch((err) => {
                console.log("CONSOLA DE ERR", err);
                Swal.fire(
                  "Error!",
                  "El Manager no se creo correctamente",
                  "error"
                );
                setOpen(false);
              });
          }
        })
        .catch((err) => {
          console.log("CONSOLA DE ERR", err);
          Swal.fire(
            "Error!",
            "El usuario no se actualizo correctamente",
            "error"
          );
          setOpen(false);
        });
    } else {
      const dataSend = {
        email,
        rol,
        state,
      };
      setOpen(false);
      Swal.fire({
        title: "¿Estas seguro?",
        text: "Estas a punto de cambiar el rol de este usuario",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, cambiar",
        cancelButtonText: "Cancelar",
      })
        .then((result) => {
          if (result.value) {
            setLoading(true);
            userPendingService
              .registerUserPendingService(dataSend)
              .then((res) => {
                setLoading(false);
                if (res.status === 200) {
                  Swal.fire({
                    title: "Usuario actualizado correctamente",
                    text: "El usuario se actualizo correctamente",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                  });
                  updateUser();
                  setLoadingPending(true);
                } else {
                  Swal.fire({
                    title: "Error",
                    text: "El usuario no se pudo actualizar",
                    icon: "error",
                    confirmButtonText: "Aceptar",
                  });
                }
              })
              .catch((err) => {
                setLoading(false);
                Swal.fire({
                  title: "Error",
                  text: "No se pudo actualizar el usuario",
                  icon: "error",
                  confirmButtonText: "Aceptar",
                }).then((result) => {
                  if (result.value) {
                    setOpen(false);
                  }
                });
              });
          }
        })
        .catch((err) => {
          setLoading(false);
          Swal.fire({
            title: "Error",
            text: "No se pudo actualizar el usuario",
            icon: "error",
            confirmButtonText: "Aceptar",
          }).then((result) => {
            if (result.value) {
              setOpen(false);
            }
          });
        });
    }
    setLoading(false);
  };
  const handleClose = () => {
    setOpen(false);
  };


  console.log("SELECT ROLE ", selectState);

  return (
    <div>
      <Dialog scroll="body" open={open} onClose={handleClose}>
        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "1rem",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
            overflow: "hidden",
            zIndex: "1",
          }}
        >
          <DialogTitle>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <PersonIcon
                sx={{
                  fontSize: "4rem",
                  color: "text.primary",
                  marginBottom: "1rem",
                  textAlign: "center",
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontWweight: "bold",
                  fontSize: "1.5rem",
                  color: "text.primary",
                  textAlign: "center",
                  marginBottom: "1rem",
                }}
              >
                Registro de usuario
              </Typography>
            </Box>
          </DialogTitle>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormText
                  labelText="Email"
                  text="Email"
                  name="email"
                  variant="outlined"
                  color="secondary"
                  control={control}
                  register={register}
                  errors={errors}
                  rulesBol={true}
                  readOnly={true}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="rol"
                  control={control}
                  render={({ field }) => (
                    <>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div style={{ marginBottom: 5 }}>
                          <Chip label="Rol" color="primary" />
                        </div>
                        <Select
                          {...field}
                          {...register("rol")}
                          options={roles}
                          defaultValue={managerId ? managerId.row.rol : ""}
                          onChange={(event) => {
                            handleChangeSelectRol(event.target.value);
                            field.onChange(event.target.value);
                          }}
                        >
                          {roles.map((rol, index) => (
                            <MenuItem value={rol} key={index}>
                              {rol}
                            </MenuItem>
                          ))}
                        </Select>
                      </div>
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div style={{ marginBottom: 5 }}>
                          <Chip label="Estado" color="primary" />
                        </div>
                        <Select
                          {...field}
                          {...register("state")}
                          defaultValue={managerId ? managerId.row.state_id : ""}
                          onChange={(event) => {
                            handleChangeSelectState(event.target.value);
                            field.onChange(event.target.value);
                          }}
                        >
                          {selectRoleFinal === "MANAGER"
                            ? userStates.map(
                                (estado, index) =>
                                  estado.rol === "MANAGER" &&
                                  estado.nombre !== "Pendiente" && (
                                    <MenuItem value={estado.id} key={index}>
                                      {estado.nombre}
                                    </MenuItem>
                                  )
                              )
                            : selectRoleFinal === "ADMIN"
                            ? userStates.map(
                                (estado, index) =>
                                  estado.rol === "ADMIN" && (
                                    <MenuItem value={estado.id} key={index}>
                                      {estado.nombre}
                                    </MenuItem>
                                  )
                              )
                            : selectRoleFinal === "USER" &&
                              userStates.map(
                                (estado, index) =>
                                  ((estado.nombre === "Pendiente" ) || (estado.nombre === "Rechazado")) && (
                                    <MenuItem value={estado.id} key={index}>
                                      {estado.nombre}
                                    </MenuItem>
                                  )
                              )}
                        </Select>
                      </div>
                    </>
                  )}
                />
              </Grid>
              {selectState === 2 && selectRoleFinal === "MANAGER" && (
                <Grid item xs={12}>
                  <Controller
                    name="equipo_id"
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        {...register("equipo_id")}
                        loading={loading}
                        options={equipos}
                        getOptionLabel={(option) =>
                          option.nombre
                            ? option.nombre
                            : "Seleccionar un Equipo"
                        }
                        isOptionEqualToValue={(option, value) =>
                          value === undefined ||
                          value === "" ||
                          option.id === value.id
                        }
                        defaultValue=""
                        renderInput={(params) => (
                          <>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <div style={{ marginBottom: 5 }}>
                                <Chip label="Equipos" color="primary" />
                              </div>

                              <TextField {...params} />
                            </div>
                          </>
                        )}
                        onChange={(event, value) => {
                          event.preventDefault();
                          field.onChange(value);
                        }}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip
                              label={option.nombre}
                              {...getTagProps({ index })}
                            />
                          ))
                        }
                      />
                    )}
                  />
                </Grid>
              )}

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  sx={{
                    width: "100%",
                    height: "50px",
                    borderRadius: "15px",
                    backgroundColor: "#212121",
                    boxShadow: "1px 2px 5px 3px rgba(0,0,0,0.75)",
                    border: "1px solid #ccc",
                    marginTop: "10px",
                    marginBottom: "10px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#fff",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#cca500",
                      boxShadow: "1px 2px 5px 3px rgba(0,0,0,0.75)",
                      border: "1px solid #ccc",
                      color: "#fff",
                      cursor: "pointer",
                    },
                  }}
                >
                  {loading ? "Cargando..." : "Confirmar"}
                </Button>
              </Grid>
            </Grid>
          </form>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Subscribe</Button>
          </DialogActions>
        </Container>
      </Dialog>
    </div>
  );
}
