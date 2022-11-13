import * as React from "react";
import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Paper,
  styled,
  TableContainer,
  Toolbar,
  Typography,
} from "@mui/material";
import userPendingService from "../../../services/api/auth/userPending";
import usersAdminService from "../../../services/api/entity/userAdminService";
import usersManagersService from "../../../services/api/managers/usersManagerService";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { GridActionsCellItem } from "@mui/x-data-grid-pro";

import DialogManagerComponent from "./common/DialogManagerComponent";
import equiposServices from "../../../services/api/equipos/equiposServices";
import ButtonGroupComponent from "./common/ButtonGroupComponent";
import userStatesService from "../../../services/api/entity/userStates";
import translate from "../../../utils/translate/dataGridToolbar.json";
//Date-Format
import { format } from "date-fns";

//import sweetalert2 from "sweetalert2";
import Swal from "sweetalert2";

const statusChip = (props) => {
  const { value } = props;
  console.log(value, "STATUS");
  return (
    <Chip
      label={value.nombre}
      sx={{ backgroundColor: value.color, fontWeight: 700, color: "white" }}
    />
  );
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: theme.spacing(1),
  borderRadius: "5px",
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Managers({ valor }) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [managerId, setManagerId] = React.useState(null);
  const [usersPending, setUsersPending] = useState([]);
  const [loadingPending, setLoadingPending] = useState(null);
  const [usersAdmin, setUsersAdmin] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [userStates, setUserStates] = useState([]);
  const [userManager, setUserManager] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [countUserTotal, setCountUserTotal] = useState(0);
  const [countUserPending, setCountUserPending] = useState(0);

  const columns = [
    { field: "id", headerName: "#", width: 70,
    description: "Id del Usuario", 
    headerAlign: "center",
    headerClassName: "headerClass", align: "center",},
    { field: "email", headerName: "Email", flex: 1, headerAlign: "center",
    headerClassName: "headerClass", align: "center", },
    { field: "rol", headerName: "Rol", minWidth: 100, headerAlign: "center",
    headerClassName: "headerClass", align: "center", },
    {
      field: "UserState",
      headerName: "Estado",
      minWidth: 200,
      renderCell: (props) => {
        return statusChip(props);
      },
      headerAlign: "center",
      headerClassName: "headerClass",
      align: "center",
    },
    {
      field: "createdAt",
      headerName: "Fecha de creación",
      type: "date",
      minWidth: 200,
      renderCell: (props) => {
        return <Typography variant="body2">{format(
          new Date(props.value),
          "dd/MM/yyyy"
        )}</Typography>;
      },
      headerAlign: "center",
      headerClassName: "headerClass",
      align: "center",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      disableReorder: true,
      getActions: (params) => [
        <GridActionsCellItem
          onClick={() => {
            handleManagerEdit(params);
          }}
          icon={<EditIcon />}
          label="Edit"
        />,
        <GridActionsCellItem
          onClick={() => {
            handleManagerRechazar(params);
          }}
          icon={<DeleteIcon />}
          label="Delete"
        />,
      ],
      headerAlign: "center",
      headerClassName: "headerClass",
      align: "center",
    },
  ];

  const getUsersPending = async () => {
    const response = await userPendingService.getUsersPendingService();
    setUsersPending(response.data);
    setCountUserTotal(response.data.length);
  };
  const getLengthUsersPending = async () => {
    const response = await userPendingService.getUsersPendingService();
    const count = response.data.filter((user) => user.rol === "USER");
    setCountUserPending(count.length);
  };

  const getUserAdminService = async () => {
    const response = await usersAdminService.getUsersAdminService();
    setUsersAdmin(response.data);
  };

  const getUserManagerService = async () => {
    const response = await usersManagersService.getManagersService();
    setUserManager(response.data);
  };



  const handleManagerEdit = async (user) => {
    setManagerId(user);
    setOpenDialog(true);
  };
  //get userStates
  const getUserStates = async () => {
    const response = await userStatesService.getUserStatesService();
    setUserStates(response.data);
    console.log("userStates", response.data);
  };

  const handleFilter = async (state = null, rol = null) => {
    if (state === null) {
      const response = await userPendingService.getFilterUserpendingService(
        rol
      );
      setUsersPending(response.data);
    } else {
      const response = await userPendingService.getFilterUserpendingService(
        parseInt(state)
      );
      setUsersPending(response.data);
    }
    setShowFilter(true);
  };

  useEffect(() => {
    setLoadingPending(true);
    if (!showFilter) {
      getUsersPending();
    }
    getUserAdminService();

    getUserStates();
    getUserManagerService();
    getLengthUsersPending();
    setLoadingPending(false);
  }, [loadingPending, showFilter]);

  //handleManagerRechazar
  const handleManagerRechazar = async (user) => {
    console.log("USER RECHAZAR", user.row);
    setLoadingPending(true);
    Swal.fire({
      title: "¿Estas seguro de rechazar este usuario?",
      text: "Una vez rechazado, no podrá volver a aceptarlo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, rechazarlo",
      cancelButtonText: "Cancelar",
    })
      .then((result) => {
        if (result.value) {
          console.log(result);
          userPendingService.rechazarUserPendingService(user.row);
          getUsersPending();
          Swal.fire("Rechazado", "El usuario ha sido rechazado", "success");
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Error", "No se pudo rechazar el usuario", "error");
        setLoadingPending(false);
      });
    setLoadingPending(false);
  };

  console.log("usersPending", usersPending);
  console.log("usersAdmin", usersAdmin);

  return (
    <>
      <Box
        sx={{
          overflow: "hidden",
        }}
      >
        <Item sx={{m:5}}>
        <Toolbar
            variant="dense"
            sx={{
              backgroundColor: "secondary.main",
              px: 0,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                height: "100%",
                px: 32,
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, pr: 3, textAlign: "start", fontWeight: 700 }}
              >
                Usuarios
              </Typography>
            </div>
          </Toolbar>
          <Grid
            container
            spacing={3}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <ButtonGroupComponent
              managersCount={userManager.length}
              userStates={userStates}
              administradoresLength={usersAdmin.length}
              handleFilter={handleFilter}
              setShowFilter={setShowFilter}
              countUserTotal={countUserTotal}
              countUserPending={countUserPending}
            />
          </Grid>

          <TableContainer>
            <DataGrid
              columns={columns}
              rows={usersPending}
              loading={loadingPending}
              autoHeight

              initialState={{
                filter: {
                  filterModel: {
                    items: [
                      {
                        columnField: "quantity",
                        operatorValue: ">",
                        value: 10000,
                      },
                    ],
                  },
                },
                sorting: {
                  sortModel: [{ field: "desk", sort: "asc" }],
                },
                
              }}
              components={{ Toolbar: GridToolbar }}
              componentsProps={{
                toolbar: {
                  showQuickFilter: true,
                },
              }}
              localeText={translate}
              className = "tableClasificacion"
              rowHeight={53}
              headerHeight={43}
            />
          </TableContainer>
          <DialogManagerComponent
            open={openDialog}
            userStates={userStates}
            setOpen={setOpenDialog}
            updateUser={getUsersPending}
            managerId={managerId}
            setLoadingPending={setLoadingPending}
          />
        </Item>
      </Box>
    </>
  );
}
