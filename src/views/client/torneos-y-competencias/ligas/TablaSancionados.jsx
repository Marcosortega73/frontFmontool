import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import getEstadisticasServices from "../../../../services/api/estadisticas/getEstadisticasService";

import TarjetaRoja from "../../../../assets/images/iconos/tarjeta_roja.png";
import TarjetaAmarilla from "../../../../assets/images/iconos/tarjeta_amarilla.png";
import LesionNaranja from "../../../../assets/images/iconos/lesion_naranja.png";
import LesionRoja from "../../../../assets/images/iconos/lesion_roja.png";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TablaSancionados = ({ equipo_id, torneo }) => {
  console.log("EQUIPOEEOOEOSO", equipo_id);
  console.log("TORNEasdasdasO", torneo);

  const [sancionados, setSancionados] = React.useState([]);
  const [cantfechas, setCantFechas] = React.useState(null);
  const [fechas, setFechas] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const getSancionados = async () => {
    const data = {
      equipo_id: equipo_id,
      torneo_id: torneo?.id,
    };
    const response = await getEstadisticasServices.getSancionadosByTorneoEquipo(
      data
    );
    console.log("SANCIONADOS", response);
    setSancionados(response.sancionados);
    const cantidadFechas = (torneo?.total_de_equipos - 1) * torneo?.rondas;
    setCantFechas(cantidadFechas);
    setLoading(false);
  };

  const arrFechas = async () => {
    //armar array de fechas
    let arr = [];
    for (let i = 1; i <= cantfechas; i++) {
      arr.push({
        fecha: i,
      });
    }
    setFechas(arr);
  };

  React.useEffect(() => {
    getSancionados();
  }, [equipo_id, torneo]);

  React.useEffect(() => {
    if (cantfechas) {
      arrFechas();
    }
  }, [cantfechas]);

  console.log("SANCIONADOS", sancionados);
  console.log("FECHAS", fechas);
  console.log("cantidad de fechas", cantfechas);

  /*  const columns = [
    { field: "nombre", headerName: "Nombre", flex: 1 },
    
  ]; */

  console.log("equipo_idequipo_id", equipo_id);
  console.log("fechas", fechas);
  return (
    <Paper style={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 573 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nombre</StyledTableCell>
              {/* columna dinamicas de acuerdo a las fechas*/}
              {fechas.map((fecha, index) => {
                return (
                  <StyledTableCell key={index} align="center">
                    {fecha.fecha}
                  </StyledTableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {sancionados.map((row, idx) => (
              <StyledTableRow key={row.idx}>
                <StyledTableCell component="th" scope="row" align="left">
                  {row.nombre}
                </StyledTableCell>
                {/* columna dinamicas de acuerdo a las fechas*/}

                {fechas.map((fecha, index) => {
                  return (
                    <StyledTableCell key={index} align="center">
                      {row.sancion.length > 0 ? (
                        row.sancion.map((sancion, indexs) => {
                          return (
                            <div>
                              {
                              sancion.fecha === fecha.fecha &&
                              (sancion.tipo === 3 ? (
                                <div key={indexs}>
                                  <div>
                                    <img
                                      width={33}
                                      height={33}
                                      src={TarjetaRoja}
                                      alt="roja"
                                    />
                                  </div>
                                </div>
                              ) : sancion.tipo === 4 && (
                                  <div key={indexs}>
                                    <div>
                                      <div>
                                        <img
                                          width={33}
                                          height={33}
                                          src={TarjetaAmarilla}
                                          alt="roja"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                ) ? (
                                sancion.tipo === 5 && (
                                  <div key={indexs}>
                                    <div>
                                      <img
                                        width={33}
                                        height={33}
                                        src={LesionNaranja}
                                        alt="roja"
                                      />
                                    </div>
                                  </div>
                                )
                              ) : (
                                sancion.tipo === 6 && (
                                  <div key={indexs}>
                                    <div>
                                      <img
                                        width={33}
                                        height={33}
                                        src={LesionRoja}
                                        alt="roja"
                                      />
                                    </div>
                                  </div>
                                )
                                
                                ))}{" "}
                            </div>
                          );
                        })
                      ) : (
                        <div>-</div>
                      )}
                    </StyledTableCell>
                  );
                })}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TablaSancionados;
