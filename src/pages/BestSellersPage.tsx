import { useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { MAIN_GAP, MAIN_PADDING, SMALL_SCREEN_CONTENT_WIDTH } from "../redux/app/constants";
import SearchField from "../components/SearchField";
import { useGetBestSellersQuery } from "../redux/features/apiSlice";
import BestSellersTable from "../components/tables/BestSellersTable";
import { lightTheme } from "../themes";

const BestSellersPage = () => {
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
   * Hooks
   */
  const xs = useMediaQuery(lightTheme.breakpoints.down("sm"));

  /**
   * --------------------------------------------------------------------------------------------------
   * RTK Queries
   */
  const { data: sellers, isLoading } = useGetBestSellersQuery();

  /**
   * --------------------------------------------------------------------------------------------------
   * Locals
   */
  const filteredSellers = sellers?.data.filter((seller) =>
    seller.Name?.toLowerCase().includes(searchQuery.toLowerCase())
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
        <Typography variant="h3">{t("bestSellers")}</Typography>
        <SearchField
          value={searchQuery}
          onChange={handleSearchChange}
          width={xs && "100%"}
        />
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
          <BestSellersTable sellers={filteredSellers || []} />
        </Box>
      )}
    </Box>
  );
};

export default BestSellersPage;
