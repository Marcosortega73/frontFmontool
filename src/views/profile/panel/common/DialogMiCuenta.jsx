import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import { useForm } from "react-hook-form";

import { FormText } from "../../../../components/forms/imputs/FormText";

import { FormPassword } from "../../../../components/forms/imputs/FormPassword";
import clientServices from "../../../../services/api/managerProfile/managerProfile";
import Swal from "sweetalert2";
import ButtonProgress from "../../../../components/buttons/ButtonProgress";
import { getUpdatedUser } from "../../../../redux/authSlice";
import { useDispatch } from "react-redux";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: theme.spacing(1),
  borderRadius: "5px",
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function DialogMiCuenta({ open, setOpen, action, user }) {
  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      newPassword: null,
      newPasswordConfirm: null,
    },
  });

  const dispatch = useDispatch();

  React.useEffect(() => {
    setValue("username", user?.username);
    setValue("password",null);
    setValue("newPassword", null);
    setValue("newPasswordConfirm", null);
  }, [user, setValue]);


  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (formValue) => {
    if (action === "changePassword") {
      console.log("Cambiando Pass", formValue);
      if (formValue.newPassword !== formValue.newPasswordConfirm) {
        Swal.fire({
          title: "Error",
          text: "Las contraseñas no coinciden",
          icon: "error",
          confirmButtonText: "Ok",
        });
        return;
      }

      await clientServices
        .changePassword(formValue)
        .then((res) => {
          setOpen(false);
          console.log("res", res);
          if (res.status === 200) {
            Swal.fire({
              title: "Contraseña cambiada",
              text: "La contraseña se ha cambiado correctamente",
              icon: "success",
              confirmButtonText: "Aceptar",
            });
       
          } else {
            
            Swal.fire({
              title: "Error",
              text: "La contraseña actual no es correcta",
              icon: "error",
              confirmButtonText: "Aceptar",
            });
          }
        })
        .catch((error) => {
          console.log("error", error);
          Swal.fire({
            title: "Error",
            text: "Error en El servidor",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        });
    }
    
    else if (action === "changeUsername") {
      console.log("Cambiando Username", formValue);
      await clientServices
        .updateUsername(formValue)
        .then((res) => {
          console.log("res", res);
          if (res.status === 200) {
            setOpen(false);
            Swal.fire({
              title: "Username actualizado",
              text: "El Username se ha cambiado correctamente",
              icon: "success",
              confirmButtonText: "Aceptar",
            }).then((result) => {

              if (result.isConfirmed) {
                dispatch(getUpdatedUser());
              }
            });
            
          } else {
            setOpen(false);
            Swal.fire({
              title: "Error",
              text: "La contraseña  no es correcta",
              icon: "error",
              confirmButtonText: "Aceptar",
            });
          }
        })
        .catch((error) => {
          console.log("error", error);
          setOpen(false);
          Swal.fire({
            title: "Error",
            text: "Error en El servidor",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        });
    }
  };

  const handleEmailChange = async () => {
    console.log("HANDLE MAIL");
    const response = await clientServices
      .sendCodeVerifyMail()
      .then((response) => {
        console.log("Response en el change", response);
        Swal.fire({
          title: "¡Listo!",
          text: "Se ha enviado un correo para verificar tu cuenta",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "¡Error!",
          text: "No se pudo enviar el correo",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      });

    console.log(response);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {action === "changeEmail" ? (
            <>
              (
              <DialogTitle sx={{ textAlign: "center" }}>
                Cambiar Correo Electrónico
              </DialogTitle>
              <DialogContent>
                <DialogContentText sx={{ textAlign: "center" }}>
                  Necesitamos verificar tu antigua dirección de correo
                  electrónico{" "}
                  <span style={{ fontWeight: "900" }}>
                    {user?.manager?.email}
                  </span>{" "}
                  para cambiarla.
                  <br />
                  ¿Has perdido el acceso a tu correo electrónico? Ponte en
                  contacto con tu proveedor de correo electrónico o con un
                  administrador del sitio para recuperar el acceso.
                </DialogContentText>
              </DialogContent>
              <DialogActions
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/*     <Button  variant="contained" onClick={handleEmailChange}>
                Enviar código de verificación
              </Button> */}
                <ButtonProgress onClick={handleEmailChange} />
                <Button onClick={handleClose}>Cancel</Button>
              </DialogActions>
              )
            </>
          ) : action === "changeUsername" ? (
            <>
              (
              <DialogTitle sx={{ textAlign: "center" }}>
                Cambiar tu nomnbre de usuario
              </DialogTitle>
              <DialogContent>
                <DialogContentText sx={{ textAlign: "center" }}>
                  Introduce un nuevo nombre de usuario y tu contraseña existente
                </DialogContentText>
                <Item>
                  <FormText
                    control={control}
                    errors={errors}
                    register={register}
                    name="username"
                    tieneLabel={true}
                    rulesBol={true}
                    text="Nombre de Usuario"
                    labelText="Nombre de Usuario"
                    type="text"
                  />
                </Item>
                <Item>
                  <FormPassword
                    control={control}
                    errors={errors}
                    register={register}
                    name="password"
                    tieneLabel={true}
                    rulesBol={true}
                    text="Contraseña Actual"
                    labelText="Contraseña Actual"
                    type="password"
                  />
                </Item>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" type="submit">
                  Listo
                </Button>
              </DialogActions>
              )
            </>
          ) : (
            <>
              (
              <DialogTitle sx={{ textAlign: "center" }}>
                Actualiza tu contraseña
              </DialogTitle>
              <DialogContent>
                <DialogContentText sx={{ textAlign: "center" }}>
                  Introduce tu contraseña acual y una nueva contraseña.
                </DialogContentText>
                <Item>
                  <FormPassword
                    control={control}
                    errors={errors}
                    register={register}
                    name="password"
                    tieneLabel={true}
                    rulesBol={true}
                    text="Contraseña Actual"
                    labelText="Contraseña Actual"
                    type="password"
                  />
                </Item>
                <Item>
                  <FormPassword
                    control={control}
                    errors={errors}
                    register={register}
                    name="newPassword"
                    tieneLabel={true}
                    rulesBol={true}
                    text="Nueva Contraseña"
                    labelText="Nueva Contraseña"
                    type="password"
                  />
                </Item>
                <Item>
                  <FormPassword
                    control={control}
                    errors={errors}
                    register={register}
                    name="newPasswordConfirm"
                    tieneLabel={true}
                    rulesBol={true}
                    text="Confirmar Contraseña"
                    labelText="Confirmar Contraseña"
                    type="password"
                  />
                </Item>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" type="submit">
                  Listo
                </Button>
              </DialogActions>
              ){" "}
            </>
          )}
        </form>
      </Dialog>
    </div>
  );
}
