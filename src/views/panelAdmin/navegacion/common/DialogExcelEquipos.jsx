import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import uploadsService from '../../../../services/api/uploads/uploadsService';
export default function DialogExcel({openExcel,setOpenExcel,updateEquipos}) {
    const {
        handleSubmit,
        register,
      } = useForm();


  const handleClose = () => {
    setOpenExcel(false);
  };


  const onSubmit = async (formValue) => {

    console.log(formValue.equipo[0]);

    let formData = new FormData();

    formData.append('equipo', formValue.equipo[0]);

    console.log(formData);

    Swal.fire({
        title: '¿Estas seguro?',
        text: "Se subira el archivo",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, subir!',
        cancelButtonText: 'No, cancelar!',
      }).then((result) => {
        if (result.value) {

            uploadsService.uploadEquiposService(formData)
         .then(res => {
                console.log("CONSOLA DE RES",res);

                if (res.status === 200) {
                    Swal.fire(
                        'Subido!',
                        'El archivo se subio correctamente',
                        'success'
                    )
                    setOpenExcel(false);
                    updateEquipos();
                }
                else {
                    Swal.fire(
                        'Error!',
                        'El archivo no se subio correctamente',
                        'error'
                    )
                    setOpenExcel(false);
                }
            }).catch
            (err => {
                console.log("CONSOLA DE ERR",err);
                Swal.fire(
                    'Error!',
                    'El archivo no se subio correctamente',
                    'error'
                )
                setOpenExcel(false);
            }
            )
           
        }
        else
        {
            setOpenExcel(false);
        }

      });

    setOpenExcel(false);

    }


 

  return (
    <div>
      <Dialog open={openExcel} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div>
            <p>
            Subir Excel de equipos para importar a la base de datos de la aplicación.
            La tabla debe contener los siguientes campos:
            </p>
            <ul>
                <li>id</li>
                <li>nombre</li>
                <li>nacionalidad_id</li>
                <li>manager_id</li>
                <li>torneo_id</li>
            </ul>
            </div>
          </DialogContentText>
        
         <input {...register('equipo', { required: true })} type="file"  />
       
        </DialogContent>
        <DialogActions>
          <Button  type="submit" color="primary"> Enviar </Button>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
