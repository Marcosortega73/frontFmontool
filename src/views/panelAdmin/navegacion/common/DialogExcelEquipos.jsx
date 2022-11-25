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
import axios from "axios";

import {
  Box,
  Divider,
  Grid,
  Paper,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import downloadsService from "../../../../services/api/downloads/downloadsService";
import DownloadComponent from "../../../../components/forms/download/DownloadComponent";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  border: "1px solid #1A2027",
  color: theme.palette.text.secondary,
}));
export default function DialogExcel({
  openExcel,
  setOpenExcel,
  updateEquipos,
  setLoading,
}) {
  const { handleSubmit, register } = useForm();

  const handleClose = () => {
    setLoading(false);
    setOpenExcel(false);
  };

  const onSubmit = async (formValue) => {
    console.log("formValue",formValue);

    let formData = new FormData();

    formData.append("equipo", formValue.file[0]);

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
        setLoading(true);

        uploadsService
          .uploadEquiposService(formData)
          .then((res) => {
            console.log("CONSOLA DE RES", res);

            if (res.status === 200) {
              Swal.fire(
                "Subido!",
                "El archivo se subio correctamente",
                "success"
              );
              setOpenExcel(false);
              updateEquipos();
              setLoading(false);
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

  const handlePlantilla = async () => {
    //descargar un archivo
    const url = "http://localhost:3030/api/download/download/equipos.xlsx";
    const config = {
      url,
      method: "GET",
      responseType: "blob",
       headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
  }
    try {
      axios.request(config).then((res) => {
        console.log("res", res)
        const url = URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "equipos.xlsx");
          
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Dialog open={openExcel} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle sx={{background:"#757575", color:"#e5e5e5",textAlign:"center"}}>Subir Base de Datos de equipos</DialogTitle>
          <DialogContent>
            <Divider />
            <Typography variant="h6" sx={{ my: 3 }}>
              Para cargar la base de datos de equipos, debe subir un archivo
              excel con los datos de los equipos. Puede descargar la plantilla
              para cargar los datos. Una vez cargados los datos, se actualizaran
              los equipos.
            </Typography>

            <Divider />

            {/* descargar plantilla */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} md={12} sx={{mt:0}}>
                <Item >
                  <Button variant="contained" onClick={handlePlantilla}>
                    Descargar Plantilla
                  </Button>
                </Item>
              </Grid>
            </Grid>
            <Divider sx={{mt:5}} />
            <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
              <TextField
                {...register("file", { required: true })}
                type="file"
                sx={{ m: 1 }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained" color="primary" >
              {" "}
              Enviar{" "}
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Cerrar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
