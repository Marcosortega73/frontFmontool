import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import clientServices from "../../../../services/api/managerProfile/managerProfile";
import { styled } from "@mui/material/styles";

import { useForm } from "react-hook-form";
import { FormText } from "../../../../components/forms/imputs/FormText";
import { useNavigate } from "react-router-dom";

import "./styles.css";
import Swal from "sweetalert2";

import { useDispatch } from "react-redux";
import { logout } from "../../../../redux/authSlice";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: theme.spacing(1),
  borderRadius: "5px",
  textAlign: "center",
  width: "50%",
  color: theme.palette.text.secondary,
}));

const ChangeEmail = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const dispatch = useDispatch();

  console.log(token);
  const [validate, setValidate] = React.useState(false);

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      emailConfirm: "",
    },
  });

  const validateMail = async () => {
    const response = await clientServices.verifyCodeMail(token);
    console.log("Response en el change", response);

    if (response?.data?.success) {
      setValidate(true);
    }

    return response;
  };

  React.useEffect(() => {
    validateMail();
  }, []);

  const onSubmit = async (formValue) => {
    console.log("DATOSDEL FORM", formValue);
    const response = await clientServices.changeEmail(formValue);
    console.log(response);
    Swal.fire({
      title: "Email cambiado",
      text: "Se ha cambiado el email correctamente",
      icon: "success",
      confirmButtonText: "Ok",
    })
      .then((result) => {
        console.log("RESULT", result);
        if (result.isConfirmed) {
          dispatch(logout())
            .unwrap()
            .then(() => {
              navigate("/login", { replace: true });
            })
            .catch(() => {
              console.log("Error");
            });
          navigate("/login");
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: "Ha ocurrido un error",
          icon: "error",
          confirmButtonText: "Ok",
        });

        console.log(error);
      });
  };

  return (
    <>
      <Container
        className="bgImage"
        sx={{
          height: "82vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {validate ? (
          <>
            <Item sx={{ backgroundColor: "RGBA(207,216,220,0.8)" }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Typography
                  sx={{
                    ml: 2,
                    mb: 2,
                    flex: 1,
                    fontWeight: 900,
                    color: "black",
                  }}
                  variant="h6"
                  component="div"
                >
                  Ingresa su nuevo correo electrónico
                </Typography>
                <Grid item sx={{ mb: 2 }}>
                  <FormText
                    control={control}
                    errors={errors}
                    register={register}
                    name="email"
                    tieneLabel={true}
                    labelPosition="start"
                    rulesBol={true}
                    text="Ingrese su nuevo email"
                    labelText="Ingrese su nuevo email"
                    type="email"
                  />
                </Grid>
                <Grid item>
                  <FormText
                    control={control}
                    errors={errors}
                    register={register}
                    name="emailConfirm"
                    tieneLabel={true}
                    labelPosition="start"
                    rulesBol={true}
                    text="Confirme su nuevo email"
                    labelText="Confirme su nuevo email"
                    type="email"
                  />
                </Grid>

                <Box sx={{ display: "flex", mt: 2, justifyContent: "end" }}>
                  <Button>Cancel</Button>
                  <Button variant="contained" type="submit">
                    Listo
                  </Button>
                </Box>
              </form>
            </Item>
          </>
        ) : (
          <h1>Correo no validado</h1>
        )}
      </Container>
    </>
  );
};

export default ChangeEmail;
