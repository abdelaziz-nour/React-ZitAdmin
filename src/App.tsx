import { ThemeProvider } from "@emotion/react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./mainComponents/Layout";
import { darkTheme, lightTheme } from "./themes";
import UnAuthorizedPage from "./pages/UnAuthorizedPage";
import Login from "./pages/Login";
import RequireAuth from "./mainComponents/RequireAuth";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import UsersPage from "./pages/UsersPage";
import StoresPage from "./pages/StoresPage";
import ProductsPage from "./pages/ProductsPage";
import OrdersPage from "./pages/OrdersPage";
import OrderedItemsPage from "./pages/OrderedItemsPage";
import BestSellersPage from "./pages/BestSellersPage";
import BestProductsPage from "./pages/BestProductsPage";
import StoreProductsPage from "./pages/StoreProductsPage";
import StoreOrdersPage from "./pages/StoreOrdersPage";
import PopsWay from "./pages/PopsWay";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/app/store";
import { useEffect, useMemo, useState } from "react";
import { CssBaseline, PaletteMode, createTheme } from "@mui/material";
import { logout } from "./redux/features/authSlice";

function App() {
  /**
   * --------------------------------------------------------------------------------------------------
   * Auto Logout Logic
   */
  const InactivityTimeout = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
  const AutoLogoutTimeout = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  const dispatch = useDispatch();
  let inactivityTimer: NodeJS.Timeout;
  let autoLogoutTimer: NodeJS.Timeout;

  // Function to reset the inactivity timer
  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      // Log out the user after 3 hours of inactivity
      dispatch(logout());
    }, InactivityTimeout);
  };
  // Function to log out the user after 24 hours
  const autoLogout = () => {
    clearTimeout(autoLogoutTimer);
    autoLogoutTimer = setTimeout(() => {
      dispatch(logout());
    }, AutoLogoutTimeout);
  };
  const handleUserInteraction = () => {
    resetInactivityTimer();
    autoLogout();
  };
  document.addEventListener("mousedown", handleUserInteraction);
  document.addEventListener("keydown", handleUserInteraction);
  resetInactivityTimer();
  autoLogout();
  
  /**
   * --------------------------------------------------------------------------------------------------
   * State
   */
  const [mode, setMode] = useState<PaletteMode>("light");
  /**
   * --------------------------------------------------------------------------------------------------
   * Hooks
   */
  const theme = useMemo(() => {
    return createTheme(mode === "dark" ? darkTheme : lightTheme);
  }, [mode]);

  /**
   * --------------------------------------------------------------------------------------------------
   * Storage
   */
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  /**
   * --------------------------------------------------------------------------------------------------
   * useEffects
   */
  useEffect(() => {
    darkMode ? setMode("dark") : setMode("light");
  }, [darkMode]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/*PROTECTED ROUTES*/}
              <Route element={<RequireAuth />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/stores" element={<StoresPage />} />
                <Route
                  path="/store-products/:storeId/:storeName"
                  element={<StoreProductsPage />}
                />
                <Route
                  path="/store-orders/:storeId/:storeName"
                  element={<StoreOrdersPage />}
                />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/orderItems" element={<OrderedItemsPage />} />
                <Route path="/best-sellers" element={<BestSellersPage />} />
                <Route path="/best-products" element={<BestProductsPage />} />
                <Route path="/pops" element={<PopsWay />} />
              </Route>

              <Route path="unauthorized" element={<UnAuthorizedPage />} />

              {/*PUBLIC*/}
              <Route path="/login" element={<Login />} />

              {/*CATCH ALL*/}
              <Route path="*" element={<UnAuthorizedPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
