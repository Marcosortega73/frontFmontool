import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import PoliticasPrivacidad from "../../politicas/PoliticasPrivacidad";
import TerminosCondiciones from "../../politicas/TerminosCondiciones";

export const FormCheck = ({
  control,
  register,
  errors,
  name,
  rulesBol,
  variant,
  text,
  labelText,
}) => {
  const [openTerminos, setOpenTerminos] = React.useState(false);
  const [openPrivacidad, setOpenPrivacidad] = React.useState(false);
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                {...field}
                error={!!errors[name]}
                helperText={errors[name] && `${text} es un Campo Requerido`}
              />
            }
            label={
              <Box sx={{ color: "white" }}>
                He leído y acepto los{" "}
                <Button
                  onClick={() => setOpenTerminos(true)}
                  color="primary"
                  sx={{
                    backgroundColor: "#cca50051",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#cca500",
                    },
                  }}
                  size="small"
                  variant="text"
                >
                  términos y condiciones
                </Button>{" "}
                y la{" "}
                <Button
                onClick={()=>setOpenPrivacidad(true)}
                  sx={{
                    backgroundColor: "#cca50051",
                    color: "white",
                    mt: 1,
                    "&:hover": {
                      backgroundColor: "#cca500",
                    },
                  }}
                  size="small"
                  variant="text"
                >
                  política de privacidad
                </Button>
              </Box>
              
            }
          />
          
        )}
      />
     { errors[name] && <span style={{color:"red"}}>Aceptar las politicas y terminos es requerido para registrarce</span>}
      <TerminosCondiciones open={openTerminos} setOpen={setOpenTerminos} />
      <PoliticasPrivacidad open={openPrivacidad} setOpen={setOpenPrivacidad} />
    </>
  );
};
