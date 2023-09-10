import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { MAIN_GAP, MAIN_PADDING } from "../redux/app/constants";
import SearchField from "../components/SearchField";
import { useSelector } from "react-redux";
import { RootState } from "../redux/app/store";
import OrderedItemsTable from "../components/tables/OrderedItemsTable";

const OrderedItemsPage = () => {
  const { t } = useTranslation();
  const items = useSelector((state: RootState) => state.orderItems.items);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const filteredItems = items?.filter((item) =>
    item.id?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const subtotalSum = items.reduce((sum, item) => sum + item.Subtotal, 0);

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
        <Typography variant="h3">{t("orderItems")}</Typography>
        <Box display="flex" gap={MAIN_GAP} justifyContent="space-between">
          <SearchField value={searchQuery} onChange={handleSearchChange} />
          <Box>
            <Typography fontWeight="bold" variant="h6">
              {t("theTotal")}
            </Typography>
            <Typography variant="h6">
              {subtotalSum} {t("SDG")}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box>
        <OrderedItemsTable orderedItems={filteredItems || []} />
      </Box>
    </Box>
  );
};

export default OrderedItemsPage;
