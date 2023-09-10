import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { BIG_GAP, MAIN_GAP, MAIN_PADDING } from "../redux/app/constants";
import usersIcon from "../assets/icons/users-icon.png";
import storesIcon from "../assets/icons/stores-icon.png";
import productsIcon from "../assets/icons/products-icon.png";
import ordersIcon from "../assets/icons/orders-icon.png";
import sellersIcon from "../assets/icons/sellers-icons.png";
import products2Icon from "../assets/icons/products2-icon.png";
import ListTile from "../components/ListTile";
import { useNavigate } from "react-router-dom";
import { theme } from "../themes";

const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));


  return (
    
    <Box height="100vh" width="100vw">
      <Box height="20%">
        <Typography variant="h3" p={MAIN_PADDING}>
          {t("dashboard")}
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" height="80%" gap={xs?MAIN_GAP:BIG_GAP} p={xs?MAIN_PADDING:0}>
        <Box
          display="flex"
          gap={MAIN_GAP}
          justifyContent="space-around"
          flexDirection={xs ? "column" : "row"}
        >
          <Box width={xs ? "100%" : "33%"} onClick={() => navigate("/users")}>
            <ListTile
              image={`url(${usersIcon})`}
              title="users"
              subtitle="manageUsersAndTheirStores"
            />
          </Box>
          <Box width={xs ? "100%" : "33%"} onClick={() => navigate("/stores")}>
            <ListTile
              image={`url(${storesIcon})`}
              title="stores"
              subtitle="displayAllTheStores"
            />
          </Box>
        </Box>
        {/* SECOND ROW */}
        <Box
          display="flex"
          gap={MAIN_GAP}
          justifyContent="space-around"
          flexDirection={xs ? "column" : "row"}
        >
          <Box width={xs ? "100%" : "33%"} onClick={() => navigate("/products")}>
            <ListTile
              image={`url(${productsIcon})`}
              title="products"
              subtitle="showsAllTheProductsInTheSystem"
            />
          </Box>
          <Box width={xs ? "100%" : "33%"} onClick={() => navigate("/orders")}>
            <ListTile
              image={`url(${ordersIcon})`}
              title="orders"
              subtitle="displayAllTheUsersOrders"
            />
          </Box>
        </Box>
        <Box display="flex" gap={MAIN_GAP} justifyContent="space-around" 
          flexDirection={xs ? "column" : "row"}
          >
          <Box width={xs ? "100%" : "33%"} onClick={() => navigate("/best-sellers")}>
            <ListTile
              image={`url(${sellersIcon})`}
              title="bestSellers"
              subtitle="theMostOrderedStoresInThePast30Days"
            />
          </Box>
          <Box width={xs ? "100%" : "33%"} onClick={() => navigate("/best-products")}>
            <ListTile
              image={`url(${products2Icon})`}
              title="bestProducts"
              subtitle="theMostOrderedProductsInThePast30Days"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
