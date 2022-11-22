import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import Paper from "@mui/material/Paper";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch, useSelector } from "react-redux";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { format } from "date-fns";

//CONSTRUCCION DEL FORM
import { useForm } from "react-hook-form";
import { FormText } from "../../../components/forms/imputs/FormText";

import {
  Container,
  Grid,
  Typography,
  IconButton,
  Chip,
  Slide,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { Box } from "@mui/system";
import DialogMiCuenta from "./common/DialogMiCuenta";
import "./styles/MisDatos.css";
import FormDate from "../../../components/forms/imputs/FormDate";
import FormAutocomplete from "../../../components/forms/imputs/FormAutocomplete";
import FormTextArea from "../../../components/forms/imputs/FormTextArea";
import clientServices from "../../../services/api/managerProfile/managerProfile";
import Swal from "sweetalert2";
import { getUpdatedUser, login } from "../../../redux/authSlice";
import ButtonProgress from "../../../components/buttons/ButtonProgress";

const Item = styled(Paper)(({ theme }) => ({
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
        <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
          <Item sx={{ width: "73%" }}>{children}</Item>
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

export default function MisDatos(props) {
  /*    const { equipos,jugador,action } = props; */
  const { nations } = useSelector((state) => state.regiones);
  const [disableOnOff, setDisableOnOff] = React.useState(false);
  const [disableOnOffUserName, setDisableOnOffUserName] = React.useState(false);
  const [verEmail, setVerEmail] = React.useState(true);
  const [verUsername, setVerUsername] = React.useState(true);

  const [viewData, setViewData] = React.useState(false);
  const [editData, setEditData] = React.useState(true);

  //dispatch

  const dispatch = useDispatch();

  const [valueTab, setValueTab] = React.useState(0);

  const [readOnlyProfile, setReadOnlyProfile] = React.useState(true);

  const [openDialog, setOpenDialog] = React.useState(false);
  const [accionDialog, setAccionDialog] = React.useState("");

  const { user } = useSelector((state) => state.auth);

  console.log("Naciones", nations);

  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: null,
      nombre: "",
      apellido: "",
      nacionalidad_id: null,
      equipoFavorito: null,
      biografia: "",
      nacimiento: "",
      email: "",
      username: "",
      equipo: null,
    },
  });

  React.useEffect(() => {
    if (user) {
      setValue("id", user.id);
      setValue("nombre", user.nombre ? user.nombre : "");
      setValue("apellido", user.apellido ? user.apellido : "");
      setValue(
        "nacionalidad_id",
        user.nacionalidad ? user.nacionalidad : undefined
      );
      setValue("equipo", user.equipo ? user.equipo : undefined);
      setValue("username", user.username ? user.username : "");
      setValue("email", user.email ? user.email : "");
      setValue(
        "nacimiento",
        user.nacimiento ? new Date(user.nacimiento) : undefined
      );
      setValue(
        "equipoFavorito",
        user.equipoFavorito ? user.equipoFavorito : undefined
      );
      setValue("biografia", user.biografia ? user.biografia : "");
    }
  }, [user, setValue]);

  const handleProfile = async (formValue) => {
    console.log("FORM VALUEES", formValue);
    // clientServices
    const response = await clientServices.updateProfile(formValue);

    console.log("HANDLE PROFILE", response);

    if (response.status === 200) {
      Swal.fire({
        title: "Perfil actualizado",
        text: "Se modifico los datos correctamente",
        icon: "success",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(getUpdatedUser());
        }
      });
    } else {
      Swal.fire({
        title: "Error al actualizar",
        text: "No se pudo actualizar los datos",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const handlePasswordChange = (e) => {
    setDisableOnOff(!disableOnOff);
    setAccionDialog("changePassword");
    setOpenDialog(true);
  };
  const handleEmailChange = (e) => {
    setDisableOnOff(!disableOnOff);
    setAccionDialog("changeEmail");
    setOpenDialog(true);
  };
  const handleUsernameChange = (e) => {
    setDisableOnOffUserName(!disableOnOffUserName);
    setAccionDialog("changeUsername");
    setOpenDialog(true);
  };

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  return (
    <div>
      <Container>
        <Box>
          <Item
            sx={{
              backgroundColor: "#292c31",
              boxShadow: "-1px 2px 11px 3px rgba(204,165,0,1)",
            }}
          >
            <Box sx={{ width: "100%", color: "white" }}>
              <Box
                sx={{ borderBottom: 3, borderColor: "#cfd8dc", color: "white" }}
              >
                <Tabs
                  value={valueTab}
                  onChange={handleChangeTab}
                  sx={{ pb: 1 }}
                  indicatorColor="secondary"
                  selectionFollowsFocus
                  textColor="secondary"
                >
                  <Tab
                    label="Mi cuenta"
                    sx={{ color: "white" }}
                    {...a11yProps(0)}
                  />
                  <Tab
                    label="Mi Perfil"
                    sx={{ color: "white" }}
                    className="textColorPrimary"
                    {...a11yProps(1)}
                  />
                </Tabs>
              </Box>
              <Box className="containerItems">
                <TabPanel
                  value={valueTab}
                  index={0}
                  sx={{
                    width: "50%",
                    backgroundColor: "#121417",

                    ".MuiBox-root css-ge2qc1 .MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 css-12yzgpb-MuiPape,r-root":
                      {
                        boxShadow:
                          "-1px 1px 0px 1px RGBA(30,32,36,0.7) !important",
                           mr: 4.5,
                      },
                  }}
                >
                  
                  <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                  <Box>
                  <div>
                    <Typography
                      align="center"
                      sx={{ color: "#cfd8dc" }}
                      variant="h5"
                    >
                      Mi Cuenta
                    </Typography>
                  </div>

                  <Grid item xs={12}>
                    <Item
                      sx={{
                        backgroundColor: "#121417",
                        border: "none !important",
                        boxShadow: "none !important",
                      }}
                    >
                      <div>
                        <Typography
                          variant="h6"
                          align="left"
                          sx={{ mb: 1, color: "#cfd8dc !important" }}
                        >
                          Correo Electrónico
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <FormText
                              control={control}
                              textColor="#cfd8dc"
                              errors={errors}
                              register={register}
                              name="email"
                              rulesBol={true}
                              disabled={disableOnOff}
                              tieneLabel={false}
                              text="Email"
                              readOnly={true}
                              labelText="Email"
                              type="email"
                              mostrar={verEmail}
                              maxWidth="100%"
                            />
                            <IconButton
                              sx={{ pl: "10px", color: "#cfd8dc" }}
                              size="small"
                              onClick={() => {
                                setVerEmail(!verEmail);
                              }}
                            >
                              {verEmail ? (
                                <RemoveRedEyeIcon />
                              ) : (
                                <VisibilityOffIcon />
                              )}
                            </IconButton>
                          </Box>
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{ color: "#cfd8dc" }}
                            onClick={handleEmailChange}
                          >
                            Editar
                          </Button>
                        </Box>
                      </div>
                    </Item>
                  </Grid>
                  <Grid item xs={12}>
                    <Item
                      sx={{ backgroundColor: "#121417", boxShadow: "none" }}
                    >
                      <div>
                        <Typography
                          variant="h6"
                          align="left"
                          sx={{ mb: 1, color: "#cfd8dc" }}
                        >
                          Nombre de Usuario
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <FormText
                              control={control}
                              errors={errors}
                              register={register}
                              textColor="#cfd8dc"
                              name="username"
                              rulesBol={true}
                              readOnly={true}
                              disabled={disableOnOffUserName}
                              tieneLabel={false}
                              text="Nombre de Usuario"
                              labelText="Nombre de Usuario"
                              type="text"
                              mostrar={verUsername}
                              maxWidth="100%"
                            />
                            <IconButton
                              sx={{ pl: "10px", color: "#cfd8dc" }}
                              size="small"
                              onClick={() => {
                                setVerUsername(!verUsername);
                              }}
                            >
                              {verUsername ? (
                                <RemoveRedEyeIcon />
                              ) : (
                                <VisibilityOffIcon />
                              )}
                            </IconButton>
                          </Box>
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{ color: "#cfd8dc" }}
                            onClick={handleUsernameChange}
                          >
                            Editar
                          </Button>
                        </Box>
                      </div>
                    </Item>
                  </Grid>
                  <Grid item xs={12}>
                    <div>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          mt: 2,
                          mb: 1,
                        }}
                      >
                        <Button
                          variant="contained"
                          onClick={handlePasswordChange}
                        >
                          Cambiar Contraseña
                        </Button>
                      </Box>
                    </div>
                  </Grid>

                  <DialogMiCuenta
                    open={openDialog}
                    setOpen={setOpenDialog}
                    action={accionDialog}
                    user={user}
                  />
                  </Box>
                  </Slide>
                </TabPanel>

                <TabPanel
                  value={valueTab}
                  index={1}
                  sx={{ backgroundColor: "#121417" }}
                >
                  <div>
                    <Typography
                      variant="h5"
                      align="center"
                      sx={{ color: "#cfd8dc", mt: 1 }}
                    >
                      Mi perfil
                    </Typography>
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {     
                        setReadOnlyProfile((prev) => !prev);   
                        setViewData((prev) => !prev);
                     
                    }
                    }
                  >
                    {readOnlyProfile ? "Editar Perfil" : "Ver Perfil"}
                  </Button>
               
   
                      <Slide
                      direction="right"
                      in={!viewData}
                      mountOnEnter
                      unmountOnExit
                    >
                      <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        sx={{ pl: 3, my: 2 }}
                      >
                        <Grid item xs={6}>
                          <Item
                            sx={{
                              backgroundColor: "#121417",
                              boxShadow: "0px 0px 1px 1px #cfd8dc",

                              mr: 4.5,
                            }}
                          >
                            <Typography
                              variant="h6"
                              align="center"
                              sx={{ mb: 1, color: "#cfd8dc" }}
                            >
                              Nombre:
                            </Typography>
                            <div>
                              <Chip
                                align="center"
                                color="primary"
                                width="100%"
                                label={user?.nombre}
                                sx={{
                                  mb: 1,
                                  color: "#cfd8dc",
                                  width: "100%",
                                  fontSize: "1rem",
                                }}
                              />
                            </div>
                          </Item>
                        </Grid>

                        <Grid item xs={6}>
                          <Item
                            sx={{
                              backgroundColor: "#121417",
                              boxShadow: "0px 0px 1px 1px #cfd8dc",

                              mr: 4.5,
                            }}
                          >
                            <Typography
                              variant="h6"
                              align="center"
                              sx={{ mb: 1, color: "#cfd8dc" }}
                            >
                              Apellido:
                            </Typography>
                            <div>
                              <Chip
                                align="center"
                                color="primary"
                                width="100%"
                                label={user?.apellido}
                                sx={{
                                  mb: 1,
                                  color: "#cfd8dc",
                                  width: "100%",
                                  fontSize: "1rem",
                                }}
                              />
                            </div>
                          </Item>
                        </Grid>

                        <Grid item xs={6}>
                          <Item
                            sx={{
                              backgroundColor: "#121417",
                              boxShadow: "0px 0px 1px 1px #cfd8dc",
                              mr: 4.5,
                            }}
                          >
                            <Typography
                              variant="h6"
                              align="center"
                              sx={{ mb: 1, color: "#cfd8dc" }}
                            >
                              Fecha de Nacimiento:
                            </Typography>
                            <div>
                              <Chip
                                align="center"
                                color="primary"
                                width="100%"
                                label={format(
                                  new Date(user?.nacimiento),
                                  "dd/MM/yyyy"
                                )}
                                sx={{
                                  mb: 1,
                                  color: "#cfd8dc",
                                  width: "100%",
                                  fontSize: "1rem",
                                }}
                              />
                            </div>
                          </Item>
                        </Grid>
                        <Grid item xs={6}>
                          <Item
                            sx={{
                              backgroundColor: "#121417",
                              boxShadow: "0px 0px 1px 1px #cfd8dc",
                              mr: 4.5,
                            }}
                          >
                            <Typography
                              variant="h6"
                              align="center"
                              sx={{ mb: 1, color: "#cfd8dc" }}
                            >
                              Nacionalidad:
                            </Typography>
                            <div>
                              <Chip
                                align="center"
                                color="primary"
                                width="100%"
                                label={user?.nacionalidad?.nombre}
                                sx={{
                                  mb: 1,
                                  color: "#cfd8dc",
                                  width: "100%",
                                  fontSize: "1rem",
                                }}
                              />
                            </div>
                          </Item>
                        </Grid>
                        <Grid item xs={12}>
                          <Item
                            sx={{
                              backgroundColor: "#121417",
                              boxShadow: "0px 0px 1px 1px #cfd8dc",
                              mr: 4.5,
                            }}
                          >
                            <Typography
                              variant="h6"
                              align="center"
                              sx={{ mb: 1, color: "#cfd8dc" }}
                            >
                              Equipo Favorito:
                            </Typography>
                            <div>
                              <Chip
                                align="center"
                                color="primary"
                                width="100%"
                                label={user?.equipoFavorito}
                                sx={{
                                  mb: 1,
                                  color: "#cfd8dc",
                                  width: "100%",
                                  fontSize: "1rem",
                                }}
                              />
                            </div>
                          </Item>
                        </Grid>
                        <Grid item xs={12}>
                          <Item
                            sx={{
                              backgroundColor: "#121417",
                              boxShadow: "0px 0px 1px 1px #cfd8dc",
                              mr: 4.5,
                            }}
                          >
                            <Typography
                              variant="h6"
                              align="center"
                              sx={{ mb: 1, color: "#cfd8dc" }}
                            >
                              Biografía:
                            </Typography>
                            <div>
                              <Typography
                                variant="body2"
                                align="center"
                                sx={{
                                  mb: 1,
                                  color: "#cfd8dc",
                                  width: "100%",
                                  height: "auto",
                                  fontSize: "1rem",
                                }}
                              >
                                {user?.biografia}
                              </Typography>
                            </div>
                          </Item>
                        </Grid>
                      </Grid>
                      </Slide>  
                
                    <Slide
                      direction="right"
                      in={viewData}
                  
                      unmountOnExit
                    >
                      <form onSubmit={handleSubmit(handleProfile)}>
                        <Grid
                          container
                          rowSpacing={1}
                          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                          sx={{ pl: 3, my: 2 }}
                        >
                          <>
                            <Grid item xs={6}>
                              <Item
                                sx={{
                                  backgroundColor: "#121417",
                                  boxShadow:
                                    "1px 1px 0px 1px RGBA(30,32,36,0.7)",
                                     mr: 4,
                                }}
                              >
                                   <Typography
                              variant="h6"
                              align="center"
                              sx={{ mb: 1, color: "#cfd8dc" }}
                            >
                              Nombre:
                            </Typography>
                                <FormText
                                  control={control}
                                  errors={errors}
                                  tieneLabel={false}
                                  register={register}
                                  name="nombre"
                                  labelText="Nombre"
                                  rulesBol={true}
                                  textColor="#cfd8dc"
                                  text="Nombre"
                                  /*  readOnly={readOnlyProfile} */
                                  type="text"
                                />
                              </Item>
                            </Grid>

                            <Grid item xs={6}>
                              <Item
                                sx={{
                                  backgroundColor: "#121417",
                                  boxShadow:
                                    "-1px 1px 0px 1px RGBA(30,32,36,0.7)",
                                     mr: 4,
                                }}
                              >
                                    <Typography
                              variant="h6"
                              align="center"
                              sx={{ mb: 1, color: "#cfd8dc" }}
                            >
                              Apellido:
                            </Typography>
                                <FormText
                                  control={control}
                                  errors={errors}
                                  tieneLabel={false}
                                  register={register}
                                  textColor="#cfd8dc"
                                  name="apellido"
                                  labelText="Apellido"
                                  rulesBol={true}
                                  text="Apellido"
                                  type="text"
                                  /*  readOnly={readOnlyProfile} */
                                />
                              </Item>
                            </Grid>

                            <Grid item xs={6}>
                              <Item
                                sx={{
                                  backgroundColor: "#121417",
                                  boxShadow:
                                    "1px 1px 0px 1px RGBA(30,32,36,0.7)",
                                     mr: 4,
                                }}
                              >
                                    <Typography
                              variant="h6"
                              align="center"
                              sx={{ mb: 1, color: "#cfd8dc" }}
                            >
                              Fecha de Nacimiento:
                            </Typography>
                                <FormDate
                                disableFuturo={true}
                                  control={control}
                                  errors={errors}
                                  tieneLabel={false}
                                  register={register}
                                  textColor="#cfd8dc"
                                  name="nacimiento"
                                  labelText="Fecha de Nacimiento"
                                  rulesBol={true}
                                  text="Fecha de Nacimiento"
                                  type="date"
                                  /*  readOnly={readOnlyProfile} */
                                />
                              </Item>
                            </Grid>

                            <Grid item xs={6}>
                              <Item
                                sx={{
                                  backgroundColor: "#121417",
                                  boxShadow:
                                    "-1px 1px 0px 1px RGBA(30,32,36,0.7)",
                                     mr: 4,
                                }}
                              >
                                    <Typography
                              variant="h6"
                              align="center"
                              sx={{ mb: 1, color: "#cfd8dc" }}
                            >
                              Nacionalidad:
                            </Typography>
                                <FormAutocomplete
                                  control={control}
                                  errors={errors}
                                  tieneLabel={false}
                                  register={register}
                                  name="nacionalidad_id"
                                  rulesBol={true}
                                  textColor="#cfd8dc"
                                  labelText="Nacionalidad"
                                  text="Nacionalidad"
                                  opciones={nations?.nations}
                                  /*  readOnly={readOnlyProfile} */
                                />
                              </Item>
                            </Grid>
                            <Grid item xs={12}>
                              <Item
                                sx={{
                                  backgroundColor: "#121417",
                                  boxShadow:
                                    "-1px 1px 0px 1px RGBA(30,32,36,0.7)",
                                     mr: 4,
                                }}
                              >
                                    <Typography
                              variant="h6"
                              align="center"
                              sx={{ mb: 1, color: "#cfd8dc" }}
                            >
                              Equipo Favorito:
                            </Typography>
                                <FormText
                                  control={control}
                                  errors={errors}
                                  tieneLabel={false}
                                  register={register}
                                  textColor="#cfd8dc"
                                  name="equipoFavorito"
                                  labelText="Equipo Favorito"
                                  text="Equipo Favorito"
                                  type="text"
                                  /*  readOnly={readOnlyProfile} */
                                />
                              </Item>
                            </Grid>
                            <Grid item xs={12}>
                              <Item
                                sx={{
                                  backgroundColor: "#121417",
                                  boxShadow:
                                    "-1px 1px 0px 1px RGBA(30,32,36,0.7)",
                                     mr: 4,
                                }}
                              >
                                    <Typography
                              variant="h6"
                              align="center"
                              sx={{ mb: 1, color: "#cfd8dc" }}
                            >
                              Biografía:
                            </Typography>
                                <FormTextArea
                                  control={control}
                                  errors={errors}
                                  tieneLabel={false}
                                  register={register}
                                  textColor="#cfd8dc"
                                  name="biografia"
                                  labelText="Biografía"
                                  text="Biografía"
                                  bgcolor="#121417"
                                  /*  readOnly={readOnlyProfile} */
                                />
                              </Item>
                            </Grid>

                            <Grid item xs={12} sx={{display:"flex",justifyContent:"center", mr: 4,}}>
                            <ButtonProgress label="Guardar" onClick={handleSubmit(handleProfile)} />
                            {/*   <Button
                                onClick={handleSubmit(handleProfile)}
                                sx={{ fontSize: "73px", color: "#cfd8dc" }}
                              >
                                <SaveIcon sx={{ fontSize: "53px" }} />
                              </Button> */}
                            </Grid>
                          </>
                        </Grid>
                      </form>
                      </Slide>         
                </TabPanel>
              </Box>
            </Box>
          </Item>
        </Box>
      </Container>
    </div>
  );
}
