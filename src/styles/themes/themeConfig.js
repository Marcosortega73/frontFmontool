import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#1e2024",
            light: "#343338",
            dark: "#131617",
            contrastText: "#E5e5e5"
        },
        secondary: {
            main: "#cca500",
            light: "rgba(204, 165, 0, 0.64)",
            dark: "#e5e5e5",
            contrastText: "#1e2024",
            
        },
        error: {
            main: "#B00020",
            light: "#e57373",
            dark: "#d32f2f",
            contrastText: "#fff"
        },
        currentColor: {
            main: "#cca500",
            light: "#546e7a",
            dark: "#f5f5f5",
            contrastText: "#fff"
        },

        addColors: {
            main: "#757575",
            light: "#E0E0E0",
    
        },

        customTheme:{
            primary400: "#343338",
            primary200: "#7C7985",
            primary700: "#222729",
            secondary400:"#CCA700",
            secondary200:"#F0C400",
            secondary700:"#B39200",
            acento500:"#757575",
            acento200:"#E5e5e5",
            acento900:"#4D4D4D",


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