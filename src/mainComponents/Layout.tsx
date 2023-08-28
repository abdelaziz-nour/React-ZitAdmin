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
import { theme } from "../themes";

const Layout = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [currentDirection, setCurrentDirection] = useState("ltr");
  const { t, i18n } = useTranslation();

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
        direction='row'
        justifyContent="center"
        spacing={0}
        bgcolor={theme.palette.background.default}
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
