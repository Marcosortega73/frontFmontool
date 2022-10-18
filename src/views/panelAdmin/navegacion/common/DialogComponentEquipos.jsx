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
import equiposServices from "../../../../services/api/equipos/equiposServices";


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

export default function DialogComponentEquipos(props) {
  const { open, setOpen, setLoading, equipo, setEquiposSelect, managers, torneos, action } = props;
  const { nations } = useSelector((state) => state.regiones);

  console.log("equipo Llegando al hijo ahora", equipo);
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
      nacionalidad:0,
      manager_id: 0,
      torneo_id: 0,
    },
  });


  React.useEffect(() => {
    if (action === "edit") {
      setValue("id", equipo.id);
      setValue("nombre", equipo.nombre);
      setValue("nacionalidad", equipo.nacionalidad);
      setValue("manager", equipo.equipo);
      setValue("torneo", equipo.altura);
    }
    else if (action === "create") {
      setValue("id", 0);
      setValue("nombre", "");
      setValue("nacionalidad", []);
      setValue("manager", 0);
      setValue("torneo", 0);
    }

  }, [equipo, setValue, action]);
    

  const onSubmit = (formValue) => {
    console.log(formValue);
    if(action==="create"){
      equiposServices.createEquiposService(formValue);
    }
   else if(action==="edit"){
    equiposServices.updateEquiposService(formValue);
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
                 {action === "create"?"Nuevo equipo": "Editar equipo"}
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
                  Ver {equipo&&equipo.nombre}
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
                      text="ID equipo"
                      labelText="ID equipo"
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
                      name="nombre"
                      labelText="Nombre"
                      rulesBol={true}
                      text="Nombre"
                      type="text"
                      vmodel={equipo&&equipo.nombre}
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

              {/*   <Grid  xl={4} lg={4} md={4} xs={6}>
                <Item>                
                    <FormSelect
                      control={control}
                      errors={errors}
                      register={register}
                      name="manager"
                      rulesBol={true}
                      labelText="manager"
                      text="manager"
                      opcion={equipos}
                    />
                  </Item>
                </Grid> */}
           {/*      <Grid  xl={4} lg={4} md={4} xs={6} >
                  <Item>
                    <FormText
                      control={control}
                      errors={errors}
                      register={register}
                      name="altura"
                      rulesBol={true}
                      text="Altura - Cm"
                      labelText="Altura - Cm"
                      type="number"
                    />
                  </Item>
                </Grid> */}
               
              </Grid>
              <Grid xl={4} lg={4} md={4} xs={6} sx={{mt:2}}>
                  <Item>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      endIcon={<SaveIcon />}
                      sx={{
                        width: "100%",
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
                      Manager:
                    <Chip sx={{mt:1}} color="primary" label={equipo.manager?equipo.manager:'Sin entrenador'} />
                    </Typography>
                    </Item>
                </Grid> 
                <Grid  xl={4} lg={4} md={4} xs={6}>
                  <Item >
                    <Typography variant="h6" gutterBottom sx={{display:"flex", flexDirection:"column", alignItems:"center"}} >
                      Nacionalidad:
                    <Chip sx={{mt:1}} color="primary"  label={equipo.nacionalidad} />
                    </Typography>
                    </Item>
                </Grid>
                <Grid  xl={4} lg={4} md={4} xs={6}>
                  <Item>
                    <Typography variant="h6" gutterBottom sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                      Torneo:
                    <Chip sx={{mt:1}} color="primary" label={equipo.torneo?equipo.torneo:'Sin Torneo'} />
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
