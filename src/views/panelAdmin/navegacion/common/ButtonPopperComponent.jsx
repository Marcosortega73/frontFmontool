import * as React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Popper from "@mui/material/Popper";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import { IconButton, Stack, Tooltip } from "@mui/material";
import SwipeUpIcon from "@mui/icons-material/SwipeUp";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ButtonPopperComponent({handleJugadorSelect,handleDelete,id,row}) {
  return (
    <PopupState variant="popper" popupId="demo-popup-popper">
      {(popupState) => (
        <div>
          <IconButton variant="contained" {...bindToggle(popupState)}>
            <SwipeUpIcon />
          </IconButton>
          <Popper {...bindPopper(popupState)} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper sx={{backgroundColor:"primary.main"}}>
                  <Stack direction="row" spacing={1}>
                    <Tooltip title="Ver jugador">
                    <IconButton variant="contained" color="info" onClick={()=>{handleJugadorSelect(row,"ver")}}>
                      <VisibilityIcon />
                    </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar jugador">
                    <IconButton variant="contained" color="secondary" onClick={()=>{handleJugadorSelect(row,"edit")}}>
                      <EditIcon />
                    </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar jugador">
                    <IconButton variant="contained" color="error" onClick={()=>{handleDelete(id)}}>
                      <DeleteIcon />
                    </IconButton>
                    </Tooltip>
                  </Stack>
                </Paper>
              </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState>
  );
}
