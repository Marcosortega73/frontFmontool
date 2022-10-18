import * as React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import { Box } from "@mui/material";
const columns = [
  {
    id: "nombre",
    label: "Club",
    minWidth: 170,
    align: "left",
  },
  {
    id: "Clasificacion",
    relation: "partidos_jugados",
    label: "PJ",
    width: 3,
    align: "left",
  },
  {
    id: "Clasificacion",
    relation: "partidos_ganados",
    label: "G",
    width: 3,
    align: "left",
  },
  {
    id: "Clasificacion",
    relation: "partidos_empatados",
    label: "E",
    width: 3,
    align: "left",
  },
  {
    id: "Clasificacion",
    relation: "partidos_perdidos",
    label: "P",
    width: 3,
    align: "left",
  },
  {
    id: "Clasificacion",
    relation: "goles_favor",
    label: "GF",
    width: 3,
    align: "left",
  },
  {
    id: "Clasificacion",
    relation: "goles_contra",
    label: "GC",
    width: 3,
    align: "left",
  },
  {
    id: "Clasificacion",
    relation: "diferencia_goles",
    label: "DG",
    width: 3,
    align: "left",
  },
  {
    id: "Clasificacion",
    relation: "puntos",
    label: "PTS",
    width: 3,
    align: "left",
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    '&[aria-sort="ascending"]': {
      backgroundColor: theme.palette.common.white,
      fontWeight: "bold",
    },
    '&[aria-sort="descending"]': {
      backgroundColor: theme.palette.common.white,
      fontWeight: "bold",
    },
  },

  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
function EnhancedTableHead(props) {
  const {
    order,
    orderBy,

    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead sx={{backgroundColor:"primary.main"}}>
      <TableRow>
        <StyledTableCell align={"center"}>POS</StyledTableCell>
        {columns.map((column,index) => (
          <StyledTableCell
            key={index}
            align={column.align}
            style={{ minWidth: column.minWidth }}
            sortDirection={orderBy === column.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === column.id}
              direction={column.Clasificacion&&orderBy === column?.Clasificacion[column?.relation] ? order : "asc"}
              onClick={createSortHandler(column?.id)}
            >
              {column.label}
              {orderBy === column.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default function TableLigasClasificacionComponent({ equipos }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(equipos?.length);

  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("puntos");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  console.log("EQUIPOS TABLE CLASIFICACION", equipos);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{}}>
        <Table stickyHeader aria-label="sticky table" size="small" dense="true" table="true">
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {stableSort(equipos, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{index + 1}</TableCell>
                    {columns.map((column,index) => {
                        const value = row[column.id];
                        return (
                        column?.relation?
                        <TableCell key={index} align={column?.align}>
                            {row?.Clasificacion[column?.relation]}
                        </TableCell>
                        :
                        <TableCell key={index} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>

                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {/*  <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );
}
