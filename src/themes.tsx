import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode:'light',
    primary: {
      main: "#2081C3",
    },
    background: {
      default: "#F5F5F5",
      paper: "#FFFFFF",
      
    },
    secondary: {
      main: "#9B8579",
    },
  },
  typography: {
    fontFamily: "Montserrat",
    
  },
});

export const darkTheme = createTheme({
  palette: {
    mode:'dark',
    background: {
      paper: "#041C32",
    },
  },
  typography: {
    fontFamily: "Montserrat",
  },
});
