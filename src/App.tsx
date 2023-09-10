import { ThemeProvider } from "@emotion/react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "./mainComponents/Layout";
import { theme } from "./themes";
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

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer />
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
