import {
  CardContent,
  Container,
  FormControl,
  Grid,
  Typography,
} from "@mui/material";

import Box from "@mui/material/Box";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import { FormCheck } from "../../components/forms/imputs/FormCheck";
import { FormText } from "../../components/forms/imputs/FormText";

import AuthService from "../../services/api/auth/authService";
import UserPendingService from "../../services/api/auth/userPending";
import SnackBarComponent from "../../components/common/SnackBarComponent";
import BackDropComponent from "../../components/common/BackDropComponent";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import backgroundLogin from "../../assets/images/generales/login-bg.jpg";
import logo from "../../assets/images/entherprise/logoSuperliga.png";
import Chip from '@mui/material/Chip';
import { Img } from "../../styles-components/Layout";
import "./auth.css";
//DATA

const Register = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [openSnackAlert, setOpenSnackAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const [backDrop, setBackDrop] = useState(false);
  const navigate = useNavigate();

//   const [severityAlert, setSeverityAlert] = useState("");
//   const [messageAlert, setMessageAlert] = useState("");
//   const [titleAlert, setTitleAlert] = useState("");



  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      checkbox: false,
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);

    setOpenSnackAlert({
        open: false,
        message: "",
        severity: "",
    })
    
    console.log(data);
    setBackDrop(true);
    //POST DE REGISTER
    await UserPendingService.registerUserPendingService(data)
      .then((res) => {
        console.log(res, "ressadsa");
        setBackDrop(false);

        if (res.status === 200) {

        Swal.fire({
            title: "Usuario registrado correctamente",
            text: "Quedara sujeto a aprovacion por parte de un administrador, cuando se confirme le enviaremos un correo",
            icon: "success",
            confirmButtonText: "Aceptar",
        }).then((result) => {
            if (result.value) {
                navigate("/");

            }
        }
        )
        }
        else{
          console.log("RESSS",res)
            Swal.fire({
                title: "Error",
                text: "El usuario no se pudo registrar",
                icon: "error",
                confirmButtonText: "Aceptar",
            }
            ) 
            navigate("/register");
         }
            
         setLoading(false);    
      })
      .catch((err ) => {
        console.log("EERROR en el servidor", err);
        setBackDrop(false);
        setOpenSnackAlert({
            message: "Error al registrar usuario",
            severity: "error",
           })
           navigate("/register");
        setLoading(false);
      });
  };

  //simulando una espera

  return (
    <>
         <Container
          fixed
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundImage: `url(${backgroundLogin})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
          className="container-login"
        >
          <Box
            elevation={4}
            sx={{
              bgcolor: "#546e7a40 ",
              height: "80%",
              width: "50%",
              borderRadius: "15px",
              boxShadow: "1px 2px 5px 3px rgba(0,0,0,0.75)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid #ccc",
            }}
          >
            <div style={{marginTop:7}}>
            <Chip  label="Convierte en Manager" color="primary"  />      
            </div>
            <CardContent sx={{height:"100%",   display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-around", }}>
              <FormControl>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid
                    container
                    rowSpacing={4}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-between",

                      
                    }}
                  >
                    <Grid xs={12} sx={{mb:"20px"}}>
                    
                   
                      <FormText
                        control={control}
                        errors={errors}
                        register={register}
                        name="email"
                        rulesBol={true}
                        variant="outlined"
                        labelText="Ingrese su email"
                        type="email"
                        text="Email:"
                      />
                    </Grid>
                    <Grid xs={12} sx={{mb:"20px"}}>
                      <FormText
                        type="password"
                        control={control}
                        errors={errors}
                        register={register}
                        name="password"
                        rulesBol="true"
                        variant="outlined"
                        labelText="Ingrese su Password"
                        color="#212121"
                        text="Password:"
                      />
                    </Grid>
                    <Grid >
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
                        {loading ? "Cargando..." : "Enviar"}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
            </FormControl>
          </CardContent>
        </Box>
        <Box sx={{width:"100%",height:"100%", display:"flex",flexDirection:"column", justifyContent:"end", alignItems:"end"}}>
              <div>
              <Img src={logo} alt="logo" />
              </div>
          </Box>
        <BackDropComponent open={backDrop} />
        {openSnackAlert.open && 
        <SnackBarComponent options={openSnackAlert}/>
        }
      </Container>
    </>
  );
};

export default Register;
