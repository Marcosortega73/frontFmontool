import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import uploadsService from "../../../../services/api/uploads/uploadsService";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Divider, Grid,  TextField, Typography } from "@mui/material";

//Array con campos del modelo jugadores
import jugadoresModelData from "../../../../utils/models/jugadoresModel.json";
import { Box } from "@mui/system";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  border: "1px solid #1A2027",
  color: theme.palette.text.secondary,
}));

export default function DialogExcel({ openExcel, setOpenExcel }) {
  const { handleSubmit, register } = useForm();

  const handleClose = () => {
    setOpenExcel(false);
  };

  const onSubmit = async (formValue) => {
    console.log(formValue.file[0]);

    let formData = new FormData();

    formData.append("file", formValue.file[0]);

    console.log(formData);

    Swal.fire({
      title: "¿Estas seguro?",
      text: "Se subira el archivo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, subir!",
      cancelButtonText: "No, cancelar!",
    }).then((result) => {
      if (result.value) {
        uploadsService
          .uploadJugadoresService(formData)
          .then((res) => {
            console.log("CONSOLA DE RES", res);

            if (res.status === 200) {
              Swal.fire(
                "Subido!",
                "El archivo se subio correctamente",
                "success"
              );
              setOpenExcel(false);
            } else {
              Swal.fire(
                "Error!",
                "El archivo no se subio correctamente",
                "error"
              );
              setOpenExcel(false);
            }
          })
          .catch((err) => {
            console.log("CONSOLA DE ERR", err);
            Swal.fire(
              "Error!",
              "El archivo no se subio correctamente",
              "error"
            );
            setOpenExcel(false);
          });
      } else {
        setOpenExcel(false);
      }
    });

    setOpenExcel(false);
  };

  return (
    <div>
      <Dialog open={openExcel} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Subir Base de Datos de Jugadores</DialogTitle>
          <DialogContent>
           <Divider />
              <Typography variant="h6"  sx={{my:3}}>
                Subir Excel de jugadores para importar a la base de datos de la
                aplicación. La tabla debe contener los siguientes campos:
              </Typography>

           <Divider />
    
                <Grid container spacing={2} sx={{my:3}}>

                {jugadoresModelData.map((item, index) => {
                  return (
                      <Grid item key={index} xs={4}>
                        <Item>
                          <Typography variant="span" >
                            {item}
                          </Typography>
                        </Item>
                      </Grid>      
                  );
                })}
                  </Grid>
              <Divider/>
            <Box sx={{mt:4, display:"flex", justifyContent:"center"}}>
            <TextField {...register("file", { required: true })} type="file" sx={{m:1}} />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="outlined" >
              {" "}
              Enviar{" "}
            </Button>
            <Button variant="outlined"  onClick={handleClose}>Cerrar</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
