import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useGetStoreOrdersMutation } from "../redux/features/apiSlice";
import {
  Box,
  Typography,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import SearchField from "../components/SearchField";
import OrdersTable from "../components/tables/OrdersTable";
import { MAIN_PADDING, MAIN_GAP, SMALL_SCREEN_CONTENT_WIDTH } from "../redux/app/constants";
import { lightTheme } from "../themes";
const StoreOrdersPage = () => {
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
  const [getStoreOrders, { data: storeOrders, isLoading }] =
    useGetStoreOrdersMutation();

  /**
   * --------------------------------------------------------------------------------------------------
   * Locals
   */
  const xs = useMediaQuery(lightTheme.breakpoints.down("sm"));
  const { storeId, storeName } = useParams();
  const total = storeOrders?.data[storeOrders.data.length - 1].Total;
  const filteredOrders = storeOrders?.data.filter((order) =>
    order.id?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  /**
   * --------------------------------------------------------------------------------------------------
   * Handlers
   */
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  /**
   * --------------------------------------------------------------------------------------------------
   * useEffects
   */

  useEffect(() => {
    if (storeId) {
      const requestBody = { Store: storeId };
      getStoreOrders(requestBody);
    }
  }, [getStoreOrders, storeId]);

  return (
    <Box
      p={MAIN_PADDING}
      display="flex"
      flexDirection="column"
      gap={MAIN_GAP}
      height="100vh"
      width={xs ? SMALL_SCREEN_CONTENT_WIDTH : "100vw"}
    >
      <Box height="20%" display="flex" flexDirection="column" gap={MAIN_GAP}>
        <Typography variant="h3" textAlign="center">
          {storeName}
        </Typography>
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
              {t("totalStoreOrders")}
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
            storeColumn={false}
            searchQuery={searchQuery}
          />
        </Box>
      )}
    </Box>
  );
};

export default StoreOrdersPage;
