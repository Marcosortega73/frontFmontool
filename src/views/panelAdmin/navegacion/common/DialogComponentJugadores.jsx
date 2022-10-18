import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { styled } from "@mui/material/styles";

import Paper from "@mui/material/Paper";
import SaveIcon from "@mui/icons-material/Save";
import { useSelector } from "react-redux";
import Chip from '@mui/material/Chip';

//CONSTRUCCION DEL FORM
import { useForm } from "react-hook-form";
import { FormText } from "../../../../components/forms/imputs/FormText";
import { FormSelect } from "../../../../components/forms/imputs/FormSelect";
import { Container, Grid, Typography, Avatar} from "@mui/material";
import jugadoresServices from "../../../../services/api/jugadores/jugadoresService";


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

export default function DialogComponentJugadores(props) {
  const { open, setOpen, setLoading, equipos,jugador,action } = props;
  const { nations } = useSelector((state) => state.regiones);

  console.log("jugador Llegando al hijo", jugador);
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
      nacionalidad:[],
      equipo: 0,
      altura: 0,
      peso: 0,
      ca: 0,
      cp: 0,
      valor: 0,
    },
  });


  React.useEffect(() => {
    if (jugador) {
    if (action === "edit") {
      setValue("id", jugador.id);
      setValue("nombre", jugador.nombre);
      setValue("nacionalidad", jugador.nacionalidad);
      setValue("equipo", jugador.equipo);
      setValue("altura", jugador.altura);
      setValue("peso", jugador.peso);
      setValue("ca", jugador.ca);
      setValue("cp", jugador.cp);
      setValue("valor", jugador.valor);
    }
    else if (action === "create") {
      setValue("id", 0);
      setValue("nombre", "");
      setValue("nacionalidad", []);
      setValue("equipo", 0);
      setValue("altura", 0);
      setValue("peso", 0);
      setValue("ca", 0);
      setValue("cp", 0);
      setValue("valor", 0);
    }
  }

  }, [jugador, setValue, action]);
    

  const onSubmit = (formValue) => {
    console.log(formValue);
    if(action==="create"){
      jugadoresServices.createJugadorService(formValue);
    }
   else if(action==="edit"){
      jugadoresServices.updateJugadorService(formValue);
    }
     setOpen(false);  
     setLoading(true);     
  };

  return (
    <div>
    
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        TransitionComponent={Transition}
      >
        <Container sx={{ mt:3 }}>
            {action === "create" || action ==="edit"  ? 
            (<>
              <div style={{ display:"flex", flexDirection:"column",alignItems:"center", paddingBottom:"25px"}}>  
               <div style={{marginBottom:"15px"}}> 
               <Avatar></Avatar>
               </div>
               <div style={{
                border:"solid 2px #1A2027",
                borderRadius:"5px",
                padding:"10px",

              }}>
                <Typography variant="h5"  align="center" sx={{
             
                
                }}>
                 {action === "create"?"Nuevo Jugador": "Editar Jugador"}
                </Typography>
               </div>
               </div>
               </>) 
            
             : action === "ver"&& <>
             <div style={{ display:"flex", flexDirection:"column",alignItems:"center", paddingBottom:"25px"}}>  
              <div style={{marginBottom:"15px"}}> 
              <Avatar></Avatar>
              </div>
              <div>
                <Typography variant="h5" gutterBottom align="center" sx={{mb:5}}>
                  Ver {jugador&&jugador.nombre}
                </Typography>
              </div>
              </div>
              </>
            }
        { action === "create" || action === "edit" ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3} sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                pl: "25px",
                pb: "25px",
                mt:2
              }}>
                <Grid  xl={4} lg={4} md={4} xs={6} >
                  <Item>
                    <FormText
                      control={control}
                      errors={errors}
                      register={register}
                      name="id"
                      rulesBol={true}
                      text="ID Jugador"
                      labelText="ID Jugador"
                      tieneLabel = {true}
                      type="number"
                      readOnly={true}

                    />
                  </Item>
                </Grid>
                <Grid  xl={4} lg={4} md={4} xs={6}>
                  <Item>
                    <FormText
                      control={control}
                      errors={errors}
                      register={register}
                      name="nombre"
                      labelText="Nombre"
                      rulesBol={true}
                      tieneLabel = {true}
                      text="Nombre"
                      type="text"
                      vmodel={jugador&&jugador.nombre}
                    />
                  </Item>
                </Grid>
                <Grid  xl={4} lg={4} md={4} xs={6} >
                  <Item>
                 
                    <FormSelect
                      control={control}
                      errors={errors}
                      register={register}
                      name="nacionalidad"
                      rulesBol={true}
                      labelText="Nacionalidad"
                      text="Nacionalidad"
                      opcion={nations.nations}
                    />
                  </Item>
                </Grid>

                <Grid  xl={4} lg={4} md={4} xs={6}>
                <Item>                
                    <FormSelect
                      control={control}
                      errors={errors}
                      register={register}
                      name="equipo"
                      rulesBol={true}
                      labelText="Equipo"
                      text="Equipo"
                      opcion={equipos}
                    />
                  </Item>
                </Grid>
                <Grid  xl={4} lg={4} md={4} xs={6} >
                  <Item>
                    <FormText
                      control={control}
                      errors={errors}
                      register={register}
                      name="altura"
                      tieneLabel = {true}
                      rulesBol={true}
                      text="Altura - Cm"
                      labelText="Altura - Cm"
                      type="number"
                    />
                  </Item>
                </Grid>
                <Grid  xl={4} lg={4} md={4} xs={6} >
                  <Item>               
                    <FormText
                      control={control}
                      errors={errors}
                      register={register}
                      name="peso"
                      tieneLabel = {true}
                      rulesBol={true}
                      text="Peso - Kg"
                      labelText="Peso - Kg"
                      type="number"
                    />
                  </Item>
                </Grid>
                <Grid  xl={4} lg={4} md={4} xs={6} >
                  <Item>
                    <FormText
                      control={control}
                      errors={errors}
                      tieneLabel = {true}
                      register={register}
                      name="ca"
                      rulesBol={true}
                      text="Calidad Actual"
                      labelText="Calidad Actual"
                      type="number"
                    />
                  </Item>
                </Grid>
                <Grid  xl={4} lg={4} md={4} xs={6} >
                  <Item>
                    <FormText
                      control={control}
                      errors={errors}
                      register={register}
                      tieneLabel = {true}
                      name="cp"
                      rulesBol={true}
                      text="Calidad Potencial"
                      labelText="Calidad Potencial"
                      type="number"
                    />
                  </Item>
                </Grid>
                <Grid  xl={4} lg={4} md={4} xs={6}>
                  <Item>
                    <FormText
                      control={control}
                      errors={errors}
                      register={register}
                      name="valor"
                      tieneLabel = {true}
                      rulesBol={true}
                      text="Valor - €"
                      labelText="Valor - €"
                      type="number"
                    />
                  </Item>
                </Grid>
          
              </Grid>
              <Grid xl={4} lg={4} md={4} xs={6} sx={{mt:2}}>
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
            </form>
           ):( 
            
          action === "ver" && (
              
              <Grid container spacing={3} sx={{
                display:"flex", 
                justifyContent:"center",
                pl: "25px",
                pb: "25px",
              }}>
                
                <Grid  xl={4} lg={4} md={4} xs={6}>
                  <Item>
                  <Typography variant="h6" gutterBottom sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                      Equipo:
                    <Chip sx={{mt:1}} color="primary" label={jugador?.equipo} />
                    </Typography>
                    </Item>
                </Grid> 
                <Grid  xl={4} lg={4} md={4} xs={6}>
                  <Item >
                    <Typography variant="h6" gutterBottom sx={{display:"flex", flexDirection:"column", alignItems:"center"}} >
                      Nacionalidad:
                    <Chip sx={{mt:1}} color="primary"  label={jugador?.nacionalidad} />
                    </Typography>
                    </Item>
                </Grid>
                <Grid  xl={4} lg={4} md={4} xs={6}>
                  <Item>
                    <Typography variant="h6" gutterBottom sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                      Altura:
                    <Chip sx={{mt:1}} color="primary" label={jugador?.altura+" cm"} />
                    </Typography>
                    </Item>
                    </Grid>
                <Grid  xl={4} lg={4} md={4} xs={6}>
                  <Item>
                    <Typography variant="h6" gutterBottom sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                      Peso:
                    <Chip sx={{mt:1}} color="primary" label={jugador?.peso + " kg"} />
                    </Typography>
                    </Item>
                    </Grid>
                <Grid  xl={4} lg={4} md={4} xs={6}>
                  <Item>
                    <Typography variant="h6" gutterBottom sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                      Calidad Actual:
                    <Chip sx={{mt:1}} color="primary" label={jugador?.ca} />
                    </Typography>
                    </Item>
                    </Grid>
                <Grid  xl={4} lg={4} md={4} xs={6}>
                  <Item>
                    <Typography variant="h6" gutterBottom sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                      Calidad Potencial:
                    <Chip sx={{mt:1}} color="primary" label={jugador?.cp} />
                    </Typography>
                    </Item>
                    </Grid>
                <Grid  xl={4} lg={4} md={4} xs={6} >
                  <Item>
                    <Typography variant="h6" gutterBottom sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                      Valor:
                    <Chip sx={{mt:1}} color="primary" label={"€ "+jugador?.valor} />
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
