import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TransitionRight(props) {
    return <Slide {...props} direction="right" />;
  }

export default function SnackBarComponent(props) {

  const {open,message,severity} = props.options
  const [transition, setTransition] = React.useState(undefined);

  const [openSnack, setOpenSnack] = React.useState(false);

  React.useEffect(() => {
    setOpenSnack(open);
    setTransition(() => TransitionRight);
    }
    , [open]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar 
      open={openSnack} 
      autoHideDuration={6000} 
      onClose={handleClose}
      TransitionComponent={transition}
      key={transition ? transition.name : ''}
      >

        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}