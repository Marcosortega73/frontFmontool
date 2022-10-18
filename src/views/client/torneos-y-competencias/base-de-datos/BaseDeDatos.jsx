import { Container } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import jugadoresServices from '../../../../services/api/jugadores/jugadoresService'
import DialogJugadorDetails from './DialogJugadorDetails'
import FIlterComponentBaseDatos from './FIlterComponentBaseDatos'
import TableJugadores from './TableJugadores'

const BaseDeDatos = () => {
    const [jugadores , setJugadores] = React.useState([])

    const [openDialog, setOpenDialog] = React.useState(false)
    const [jugadorSelect, setJugadorSelect] = React.useState({})

   const getJugadores = async () => {
        const response = await jugadoresServices.getJugadoresService()
        setJugadores(response)
    }
    
    React.useEffect(() => {
        getJugadores()
    }
    , [])

    console.log("Mirando Jugadores en el Cliente",jugadores)


  return (
    <>
    <Container sx={{mt:3}}>
    <Box>
         <FIlterComponentBaseDatos />
    </Box>
    <Box>
        <TableJugadores jugadores={jugadores} setOpen={setOpenDialog} setJugadorSelect={setJugadorSelect} />
    </Box>

    <DialogJugadorDetails open={openDialog} setOpen={setOpenDialog} jugador={jugadorSelect} /> 
    </Container> 
    </>
  )
}

export default BaseDeDatos