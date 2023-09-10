import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useGetStoreOrdersMutation } from "../redux/features/apiSlice";
import { Box, Typography, CircularProgress } from "@mui/material";
import SearchField from "../components/SearchField";
import OrdersTable from "../components/tables/OrdersTable";
import { MAIN_PADDING, MAIN_GAP ,xs} from "../redux/app/constants";
const StoreOrdersPage = () => {
  const { t } = useTranslation();
  const { storeId, storeName } = useParams();
  const [getStoreOrders, { data: storeOrders, isLoading }] =
    useGetStoreOrdersMutation();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const filteredOrders = storeOrders?.data.filter((order) =>
    order.id?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  useEffect(() => {
    if (storeId) {
      const requestBody = { Store: storeId };
      getStoreOrders(requestBody);
    }
  }, [getStoreOrders, storeId]);

  const total = storeOrders?.data[storeOrders.data.length - 1].Total;

  return (
    <Box
      p={MAIN_PADDING}
      display="flex"
      flexDirection="column"
      gap={MAIN_GAP}
      height="100vh"
      width={xs ?"75vw":"100vw"}
    >
      <Box height="20%" display="flex" flexDirection="column" gap={MAIN_GAP}>
        <Typography variant="h3" textAlign="center">
          {storeName}
        </Typography>
        <Box display="flex" gap={MAIN_GAP} justifyContent="space-between">
          <SearchField value={searchQuery} onChange={handleSearchChange} />
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
          <OrdersTable orders={filteredOrders || []} storeColumn={false} searchQuery={searchQuery} />
        </Box>
      )}
    </Box>
  );
};

export default StoreOrdersPage;
