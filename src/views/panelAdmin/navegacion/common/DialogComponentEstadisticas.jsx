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
} from "@mui/material";
import Swal from "sweetalert2";
import FormDate from "../../../../components/forms/imputs/FormDate";

const Item = styled(Box)(({ theme }) => ({
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

export default function DialogComponentEstadisticas(props) {
  const { open, setOpen, action } = props;

  console.log("action", action);

  const handleClose = () => {
    setOpen(false);
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
         <AppBar sx={{ position: 'relative' }}>
          <Toolbar sx={{display:"flex", justifyContent:"space-between",backgroundColor: "#546e7a",}}>
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
          sx={{ p: 3, backgroundColor: "primary.main",  width: "100%", height: "100%", }}
        >
          <Box sx={{width: "100%", height: "100%"}}>
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
              <Box sx={{height:"100%"}}>
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
                  <EventIcon sx={{ fontSize: 123, color: "secondary.main" }} />
                </Item>
                <Item sx={{ width: "70%",height:"100%" }}>
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
