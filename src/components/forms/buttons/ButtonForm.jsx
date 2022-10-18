// import React from "react";
// import LoadingButton from "@mui/lab/LoadingButton";
// import SendIcon from "@mui/icons-material/Send";
// import Box from "@mui/material/Box";
// import { createTheme, ThemeProvider } from "@mui/material/styles";



// export const ButtonForm = ({ size, variant, type, text,loading, color}) => {

//     const theme = createTheme({
//         palette: {
//           primary: {
//             main:color},
//         }
//       });



//   return (
//     <>
//     <ThemeProvider theme={theme}>
//       <Box sx={{ "& > button": { m: 1 } }}>
//         <LoadingButton
//           type={type}
//           size={size}
//           endIcon={<SendIcon />}
//           loading={loading}
//           loadingPosition="end"
//           variant={variant}
//           color="primary"
//         >
//           {text}
//         </LoadingButton>
//       </Box>
//       </ThemeProvider>
//     </>
//   );
// };
