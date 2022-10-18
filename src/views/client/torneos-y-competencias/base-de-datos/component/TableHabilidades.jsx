import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Chip, Toolbar } from '@mui/material';



export default function TableHabilidades({rows,type}) {
  return (
  <>
      <Paper sx={{display:"flex",justifyContent:"center",backgroundColor:"#1e2024",color:"white"}}>
      <div>{type}</div>
        </Paper>
    <TableContainer component={Paper}>
      <Table sx={{ width:"100%" }} aria-label="simple table">
        <TableBody>
          {rows.map((row,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
            >
              <TableCell sx={{py:1}} component="th" scope="row">
                {row.nombre}
              </TableCell>
              <TableCell sx={{
                py:1,
                color:row.valor>15?"green":(row.valor>10 &row.valor<16)?"orange":"gray",
                fontWeight:"bold"
            
            }} align="right">{row.valor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}