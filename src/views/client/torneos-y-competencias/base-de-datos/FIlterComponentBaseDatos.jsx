import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Grid, Stack, TextField } from '@mui/material';

export default function FIlterComponentBaseDatos() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >  <FilterAltIcon />
          <Typography sx={{textAlign:"center"}} align="center" >Buscar Jugadores</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Grid container spacing={3}>
                <Grid item xs={4}>
              
                        <TextField
                            id="outlined-basic"
                            label="Nombre"
                            variant="outlined"
                            fullWidth
                        />
                </Grid>
                <Grid item xs={4}>
                        <TextField
                            id="outlined-basic"
                            label="Equipo"
                            variant="outlined"
                            fullWidth
                        />
                </Grid>
                <Grid item xs={4}>
                        <TextField
                            id="outlined-basic"
                            label="Valor"
                            variant="outlined"
                            fullWidth
                        />
                </Grid>
                <Grid item xs={4}>

                        <TextField
                            id="outlined-basic"
                            label="Posicion"
                            variant="outlined"
                            fullWidth
                        />
                </Grid>
                <Grid item xs={4}>
                        <TextField
                            id="outlined-basic"
                            label="Calidad Actual"
                            variant="outlined"
                            fullWidth
                        />
                </Grid>
              </Grid>  
        </AccordionDetails>
      </Accordion>
    </div>
  );
}