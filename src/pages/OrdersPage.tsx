import React, { useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { MAIN_GAP, MAIN_PADDING } from "../redux/app/constants";
import SearchField from "../components/SearchField";
import { useGetOrdersQuery } from "../redux/features/apiSlice";
import OrdersTable from "../components/tables/OrdersTable";

const OrdersPage: React.FC = () => {
  const { t } = useTranslation();
  const { data: orders, isLoading } = useGetOrdersQuery();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const filteredOrders = orders?.data.filter((order) =>
    order.id?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const total = orders?.data[orders.data.length - 1].Total;
  return (
    <Box
      p={MAIN_PADDING}
      display="flex"
      flexDirection="column"
      gap={MAIN_GAP}
      height="100vh"
      width="100vw"
    >
      <Box height="20%" display="flex" flexDirection="column" gap={MAIN_GAP}>
        <Typography variant="h3">{t("orders")}</Typography>
        <Box display="flex" gap={MAIN_GAP} justifyContent="space-between">
          <SearchField value={searchQuery} onChange={handleSearchChange} />
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
          <OrdersTable orders={filteredOrders || []} />
        </Box>
      )}
    </Box>
  );
};

export default OrdersPage;
