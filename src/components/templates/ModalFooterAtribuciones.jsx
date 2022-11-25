import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ModalFooterAtribuciones({ open, setOpen }) {


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} sx={{backgroundColor:"primary.main",color:"#e5e5e5"}}>
          Atribuciones
        </BootstrapDialogTitle>
        <DialogContent dividers>
        <Typography gutterBottom>
            Algunos de los recursos utilizados en este sitio web son de terceros y se encuentran bajo licencia Creative Commons.
            Realizamos las atribuciones correspondientes a cada uno de ellos.
          </Typography>
        <Box
                component="ul"
                aria-labelledby="category-d"
                sx={{ listStyle: "none", color: "#e5e5e5" }}
              >
                <li>
                  <a href="https://www.flaticon.es/" title="iconos">
                    Iconos creados por Flat Icons - Flaticon
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.flaticon.es/iconos-gratis/firma"
                    title="firma iconos"
                  >
                    Firma iconos creados por smalllikeart - Flaticon
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.flaticon.es/iconos-gratis/tarjeta-roja"
                    title="tarjeta roja iconos"
                  >
                    Tarjeta roja iconos creados por Freepik - Flaticon
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.flaticon.es/iconos-gratis/deportes-y-competicion"
                    title="deportes y competición iconos"
                  >
                    Deportes y competición iconos creados por Marz Gallery -
                    Flaticon
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.flaticon.es/iconos-gratis/deportes-y-competicion"
                    title="deportes y competición iconos"
                  >
                    Deportes y competición iconos creados por Marz Gallery -
                    Flaticon
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.flaticon.es/iconos-gratis/prohibido"
                    title="prohibido iconos"
                  >
                    Prohibido iconos creados por Bartama Graphic - Flaticon
                  </a>
                </li>
              </Box>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}