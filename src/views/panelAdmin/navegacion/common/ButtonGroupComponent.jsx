import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import Badge from "@mui/material/Badge";
import { Chip, Divider, Grid, Stack, TextField, Tooltip, Typography } from "@mui/material";
import SplitButton from "./SplitButtonComponent";

export default function ButtonGroupComponent({
  userStates,
  administradoresLength,
  managersCount,
  handleFilter,
  countUserTotal,
  setShowFilter,
  countUserPending
}) {

  //  TODO:AGREGAR BOTON QUE ESTA ACTIVADO, con icono

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        my: 1,
        "& > *": {
          m: 1,
        },
      }}
    >
      <Stack
        spacing={3}
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
       
      >
        <Stack
          direction="column"
          divider={<Divider orientation="horizontal" flexItem />}
          spacing={2}
          sx={{
            p:2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
          }}
          >
            <Tooltip title="Usuarios totales">
        <Button
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              borderRadius: "0.5rem",
              display: "flex",
              justifyContent: "space-evenly",
              "&:hover": {
                backgroundColor: "#546e7a",
                color: "white",
              },
            }}
            onClick={() => { setShowFilter(false) }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            > 
              <div>Total</div>
              <Chip
                sx={{ ml: 1, backgroundColor: "white" }}
                label={countUserTotal}
                size="small"
              />
            </div>
          </Button>
          </Tooltip>
          </Stack>

        <Stack
          direction="column"
          divider={<Divider orientation="horizontal" flexItem />}
          spacing={2}
          sx={{
            p:2,
            "&:hover": {
              backgroundColor: "#dcedc8",
              borderRadius: "0.5rem",

            }
          }}
        >
          <Tooltip title="Usuarios pendientes">
          <Button
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              borderRadius: "0.5rem",
              display: "flex",
              justifyContent: "space-evenly",
              "&:hover": {
                backgroundColor: "#546e7a",
                color: "white",
              },
            }}
            onClick={() => { handleFilter(null,"USER") }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <div>Pendientes</div>
              <Chip
                sx={{ ml: 1, backgroundColor: "white" }}
                label={countUserPending}
                size="small"
              />
            </div>
          </Button>
          </Tooltip>
          {userStates.map(
            (value, index) =>
              value.rol === "USER" && (
                <Tooltip title={`Usuarios ${value.nombre}`}>
                <Button
                  sx={{
                    backgroundColor: value.color,
                    color: "white",
                    borderRadius: "0.5rem",
                    display: "flex",
                    justifyContent: "space-evenly",
                    "&:hover": {
                      backgroundColor: "#546e7a",
                      color: "white",
                    },
                  }}
                  key={index}
                  onClick={() => 
                    handleFilter(value.id)
                  }
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <div>{value.nombre}</div>
                    <Chip
                      sx={{ ml: 1, backgroundColor: "white" }}
                      label={
                        value.UserPendings.length && value.UserPendings.length
                      }
                      size="small"
                    />
                  </div>
                </Button>
                </Tooltip>
              )
          )}
        </Stack>
        <Stack
          direction="column"
          divider={<Divider orientation="horizontal" flexItem />}
          spacing={2}
          sx={{
            p:2,
            "&:hover": {
              backgroundColor: "#dcedc8",
              borderRadius: "0.5rem",

            }
          }}
        >
          <Tooltip title="Usuarios Managers">
          <Button
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              borderRadius: "0.5rem",
              display: "flex",
              justifyContent: "space-evenly",
              "&:hover": {
                backgroundColor: "#546e7a",
                color: "white",
              },
            }}
            onClick={() => { handleFilter(null,"MANAGER") }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <div>Managers</div>
              <Chip
                sx={{ ml: 1, backgroundColor: "white" }}
                label={managersCount}
                size="small"
              />
            </div>
          </Button>
          </Tooltip>

          {userStates.map(
            (value, index) =>
              value.rol === "MANAGER" && (

                <Tooltip title={`Usuarios ${value.nombre}`}>
                <Button
                  sx={{
                    backgroundColor: value.color,
                    color: "white",
                    borderRadius: "0.5rem",
                    display: "flex",
                    justifyContent: "space-evenly",
                    "&:hover": {
                      backgroundColor: "#546e7a",
                      color: "white",
                    },
                  }}
                  key={index}
                  onClick={() => handleFilter(value.id)}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <div>{value.nombre}</div>
                    <Chip
                      sx={{ ml: 1, backgroundColor: "white" }}
                      label={
                        value.UserPendings.length && value.UserPendings.length
                      }
                      size="small"
                    />
                  </div>
                </Button>
                </Tooltip>
              )
          )}
        </Stack>
  
        <Stack
          direction="column"
          divider={<Divider orientation="horizontal" flexItem />}
          spacing={2}
          sx={{
            p:2,
            "&:hover": {
              backgroundColor: "#dcedc8",
              borderRadius: "0.5rem",

            }
          }}
        >
          <Tooltip title="Usuarios Administradores">
          <Button
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              borderRadius: "0.5rem",
              display: "flex",
              justifyContent: "space-evenly",
              "&:hover": {
                backgroundColor: "#546e7a",
                color: "white",
              },
            }}
            onClick={() => { handleFilter(null,"ADMIN") }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <div>Administradores</div>
              <Chip
                sx={{ ml: 1, backgroundColor: "white" }}
                label={((administradoresLength === 0) ? 0 : (administradoresLength-1))}
                size="small"
              />
            </div>
          </Button>
          </Tooltip>
          {userStates.map(
            (value, index) =>
              value.rol === "ADMIN" && (
                <Tooltip title={`Usuarios ${value.nombre}`}>
                <Button
                  sx={{
                    backgroundColor: value.color,
                    color: "white",
                    borderRadius: "0.5rem",
                    display: "flex",
                    justifyContent: "space-evenly",
                    "&:hover": {
                      backgroundColor: "#546e7a",
                      color: "white",
                    },
                  }}
                  key={index}
                  onClick={() => handleFilter(value.id)}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <div>{value.nombre}</div>
                    <Chip
                      sx={{ ml: 1, backgroundColor: "white" }}
                      label={
                        value.UserPendings.length && value.UserPendings.length
                      }
                      size="small"
                    />
                  </div>
                </Button>
                </Tooltip>
              )
          )}
        </Stack>

      </Stack>
    </Box>
  );
}
