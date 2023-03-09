import React, { Fragment } from "react";
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
import Suspendido from "../../../../assets/images/iconos/prohibido.png";
import { CircularProgress, LinearProgress } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  border: "1px solid #e5e5e5",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  border: "5px solid #ffff",
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
    setLoading(true);
    getSancionados();
  }, [equipo_id, torneo]);

  React.useEffect(() => {
    if (cantfechas) {
      arrFechas();
    }
  }, [cantfechas]);

  return (
    <Paper style={{ width: "100%" }}>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "173px",
          }}
        >
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <TableContainer sx={{ maxHeight: 573 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ width: "7px" }}>N°</StyledTableCell>
                <StyledTableCell sx={{ width: "50%" }}>Nombre</StyledTableCell>
                {/* columna dinamicas de acuerdo a las fechas*/}
                {fechas.map((fecha, index) => {
                  return (
                    <StyledTableCell key={index} align="center">
                      {fecha?.fecha}
                    </StyledTableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {sancionados.map((row, idx) => (
                <StyledTableRow key={idx}>
                  <StyledTableCell component="th" scope="row" align="left">
                    {idx + 1}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row" align="left">
                    {row.nombre}
                  </StyledTableCell>
                  {/* columna dinamicas de acuerdo a las fechas*/}

                  {fechas.map((fecha, index) => {
                    return (
                      <StyledTableCell key={index} align="center" sx={{}}>
                        {row.sanciones.length > 0 ? (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            {row.sanciones.map((sancion, indexs) => {
                              return (
                                <Fragment key={indexs}>
                                  {sancion.Fixture.num_fecha === fecha?.fecha &&
                                    (sancion.estadistica_id === 3 ? (
                                      <div>
                                        <img
                                          width={33}
                                          height={33}
                                          src={TarjetaRoja}
                                          alt="roja"
                                        />
                                      </div>
                                    ) : sancion.estadistica_id === 4 ? (
                                      <div>
                                        <img
                                          width={33}
                                          height={33}
                                          src={TarjetaAmarilla}
                                          alt="roja"
                                        />
                                      </div>
                                    ) : sancion.estadistica_id === 5 ? (
                                      <div>
                                        <img
                                          width={33}
                                          height={33}
                                          src={LesionNaranja}
                                          alt="roja"
                                        />
                                      </div>
                                    ) : sancion.estadistica_id === 6 ? (
                                      <div>
                                        <img
                                          width={33}
                                          height={33}
                                          src={LesionRoja}
                                          alt="roja"
                                        />
                                      </div>
                                    ) : (
                                      sancion.estadistica_id === 8 && (
                                        <div>
                                          <img
                                            width={33}
                                            height={33}
                                            src={Suspendido}
                                            alt="roja"
                                          />
                                        </div>
                                      )
                                    ))}
                                </Fragment>
                              );
                            })}
                          </div>
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
      )}
    </Paper>
  );
};

export default TablaSancionados;
