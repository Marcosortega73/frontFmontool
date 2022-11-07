import { Box } from '@mui/material'
import React from 'react'
import TableLigasClasificacionComponent from '../../client/torneos-y-competencias/base-de-datos/component/TableLigasClasificacionComponent'


const ContenedorLigas = ({torneo}) => {
    const [equipos, setEquipos] = React.useState([])
    const [progress, setProgress] = React.useState(false)
    
    React.useEffect(() => {
        setProgress(true)
        setEquipos(torneo?.Equipos)
        setProgress(false)
    }, [torneo])

  return (
    <Box sx={{ width:"100%", height: "100%" }}><TableLigasClasificacionComponentSmall equipos={equipos} /></Box>
  )
}

export default ContenedorLigas