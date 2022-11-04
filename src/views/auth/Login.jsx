import {
    CardContent,
    Container,
    FormControl,
    Grid,
    Toolbar,
  } from "@mui/material";
  import { Box } from "@mui/system";
  import { useState,useEffect   } from "react";
  import { useForm } from "react-hook-form";
  import Button from "@mui/material/Button";
  import { useDispatch } from "react-redux";
  import { useNavigate } from "react-router-dom";
  
  import { login } from "../../redux/authSlice";
  import { clearMessage } from "../../redux/message";
  import { FormText } from "../../components/forms/imputs/FormText";
  import backgroundLogin from "../../assets/images/generales/login-bg.jpg";
  import logo from "../../assets/images/entherprise/logoSuperliga.png";
  import Chip from '@mui/material/Chip';

  



  import "./auth.css";
import { Img } from "../../styles-components/Layout";
import Swal from "sweetalert2";
import {useSelector} from "react-redux";


  const Login = (props) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const {
        handleSubmit,
        control,
        register,
        formState: { errors },
      } = useForm({
        defaultValues: {
          email: "",
          password: "",
        },
      });

      useEffect(() => {
        dispatch(clearMessage());
      }, [dispatch]);

      const onSubmit = async (formValue) => {
       
        setLoading(true);
        await dispatch(login(formValue))
        .unwrap()
          .then(() => {   
            navigate( user?.rol === "ADMIN"?"/panelAdministracion/dashboard":'/profile');
          })
          .catch(() => {
            setLoading(false);
            Swal.fire({
              title: "Error",
              text: "Usuario o contraseña incorrectos",
              icon: "error",
              confirmButtonText: "Ok"
            });
            
            navigate("/login");



          }); 
      
      };
    
    return (
        <>
        <Toolbar />
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
            <Chip  label="Vuelta a los Entrenamientos" color="primary"  />      
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
                    <Grid item xs={12} sx={{mb:"20px"}}>
                    
                   
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
                    <Grid item xs={12} sx={{mb:"20px"}}>
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
        </Container>
      </>
    );
  };
  
  export default Login;