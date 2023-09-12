import { useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  MAIN_GAP,
  MAIN_PADDING,
  SMALL_SCREEN_CONTENT_WIDTH,
} from "../redux/app/constants";
import SearchField from "../components/SearchField";
import { useSelector } from "react-redux";
import { RootState } from "../redux/app/store";
import OrderedItemsTable from "../components/tables/OrderedItemsTable";
import { lightTheme } from "../themes";

const OrderedItemsPage = () => {
  /**
   * --------------------------------------------------------------------------------------------------
   * i18m
   */
  const { t } = useTranslation();

  /**
   * --------------------------------------------------------------------------------------------------
   * Storage
   */
  const items = useSelector((state: RootState) => state.orderItems.items);

  /**
   * --------------------------------------------------------------------------------------------------
   * State
   */
  const [searchQuery, setSearchQuery] = useState<string>("");

  /**
   * --------------------------------------------------------------------------------------------------
   * Locals
   */
  const xs = useMediaQuery(lightTheme.breakpoints.down("sm"));

  /**
   * --------------------------------------------------------------------------------------------------
   * Locals
   */
  const subtotalSum = items.reduce((sum, item) => sum + item.Subtotal, 0);
  const filteredItems = items?.filter((item) =>
    item.id?.toLowerCase().includes(searchQuery.toLowerCase())
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
    >
      <Box height="20%" display="flex" flexDirection="column" gap={MAIN_GAP}>
        <Typography variant="h3">{t("orderItems")}</Typography>
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
