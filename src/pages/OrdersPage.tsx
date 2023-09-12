import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  MAIN_GAP,
  MAIN_PADDING,
  SMALL_SCREEN_CONTENT_WIDTH,
} from "../redux/app/constants";
import SearchField from "../components/SearchField";
import { useGetOrdersQuery } from "../redux/features/apiSlice";
import OrdersTable from "../components/tables/OrdersTable";
import { lightTheme } from "../themes";

const OrdersPage: React.FC = () => {
  /**
   * --------------------------------------------------------------------------------------------------
   * i18n
   */
  const { t } = useTranslation();

  /**
   * --------------------------------------------------------------------------------------------------
   * State
   */
  const [searchQuery, setSearchQuery] = useState<string>("");

  /**
   * --------------------------------------------------------------------------------------------------
   * RTK Queries
   */
  const { data: orders, isLoading } = useGetOrdersQuery();

  /**
   * --------------------------------------------------------------------------------------------------
   * Locals
   */
  const total = orders?.data[orders.data.length - 1].Total;
  const xs = useMediaQuery(lightTheme.breakpoints.down("sm"));
  const filteredOrders = orders?.data.filter((order) =>
    order.id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /**
   * --------------------------------------------------------------------------------------------------
   * Handlers
   */
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Box
      p={MAIN_PADDING}
      display="flex"
      flexDirection="column"
      gap={MAIN_GAP}
      height="100vh"
      width={xs ? SMALL_SCREEN_CONTENT_WIDTH : "100vw"}
      sx={{
        overflowX: "hidden",
      }}
    >
      <Box height="20%" display="flex" flexDirection="column" gap={MAIN_GAP}>
        <Typography variant="h3">{t("orders")}</Typography>
        <Box
          display="flex"
          gap={MAIN_GAP}
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <SearchField
            value={searchQuery}
            onChange={handleSearchChange}
            width={xs && "100%"}
          />
          <Box>
            <Typography fontWeight="bold" variant="h6">
              {t("totalZITOrders")}
            </Typography>
            <Typography variant="h6">
              {total} {t("SDG")}
            </Typography>
          </Box>
        </Box>
      </Box>

      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="60vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <OrdersTable
            orders={filteredOrders || []}
            searchQuery={searchQuery}
            storeColumn={true}
          />
        </Box>
      )}
    </Box>
  );
};

export default OrdersPage;
