import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#1e2024",
            light: "#cfd8dc",
            dark: "#121417",
            contrastText: "#fff"
        },
        secondary: {
            main: "#cca500",
            light: "rgba(204, 165, 0, 0.64)",
            dark: "#546e7a",
            contrastText: "#546e7a"
        },
        error: {
            main: "#f44336",
            light: "#e57373",
            dark: "#d32f2f",
            contrastText: "#fff"
        },
        currentColor: {
            main: "#cca500",
            light: "#546e7a",
            dark: "#f5f5f5",
            contrastText: "#fff"
        }
    
    
    },
})



export const customThemeBox = {

    marginTop:'50px',
    bgcolor: "#cca500", 
    height: "100%", 
    width: "50%",
    borderRadius:"15px",
    boxShadow:"1px 2px 5px 3px rgba(0,0,0,0.75)"
  
  }
 export default theme;