import React from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Controller } from "react-hook-form";
import Chip from "@mui/material/Chip";
import { TextField } from "@mui/material";

const FormTextArea = ({
  type,
  control,
  register,
  errors,
  name,
  rulesBol,
  variant,
  labelText,
  bgcolor,
  mostrar,
  text,
  tieneLabel,
  disabled,
  setValue,
  vmodel,
  readOnly,
  maxWidth,
  textColor,
}) => {
    const [valueBio, setValueBio] = React.useState("");
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{ required: rulesBol }}
        render={({ field }) => (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              {tieneLabel && (
                <div style={{ marginBottom: 5 }}>
                  <Chip label={text} color="primary" />
                </div>
              )}
           
              <TextareaAutosize
                aria-label="minimum height"
                value={field.value}
                onChange={
                    (_,value) => {
                        setValueBio(value);
                        field.onChange(value);
                    }}
                multiline="false"
                {...register(name)}
                style={{ width: "100%", height: 123, padding:"13px",backgroundColor: bgcolor, resize: "none",color:textColor?textColor:"#000" }}
              />
            </div>
          </>
        )}
      />
    </>
  );
};

export default FormTextArea;
