import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Stack } from "@mui/material";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "../redux/app/store";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { darkTheme, lightTheme } from "../themes";

const Layout = () => {
  /**
   * --------------------------------------------------------------------------------------------------
   * i18n
   */
  const { i18n } = useTranslation();

  /**
   * --------------------------------------------------------------------------------------------------
   * Storage
   */  
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  /**
   * --------------------------------------------------------------------------------------------------
   * State
   */
  const [currentDirection, setCurrentDirection] = useState("ltr");

  /**
   * --------------------------------------------------------------------------------------------------
   * useEffects
   */
  useEffect(() => {
    if (i18n.language === "ar") {
      setCurrentDirection("rtl");
    } else {
      setCurrentDirection("ltr");
    }
  }, [i18n.language]);
  useEffect(() => {
    document.body.setAttribute("dir", currentDirection);
  }, [currentDirection]);

  return (
    <main className="App">
      <Stack
        direction="row"
        justifyContent="center"
        spacing={0}
        bgcolor={
          darkMode
            ? darkTheme.palette.background.default
            : lightTheme.palette.background.default
        }
      >
        {isAuthenticated && <Sidebar />}
        <Outlet />
      </Stack>
      <ToastContainer />
      <Footer />
    </main>
  );
};

export default Layout;
