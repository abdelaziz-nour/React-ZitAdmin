import { useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { MAIN_GAP, MAIN_PADDING,xs } from "../redux/app/constants";
import SearchField from "../components/SearchField";
import { useGetBestSellersQuery } from "../redux/features/apiSlice";
import BestSellersTable from "../components/tables/BestSellersTable";

const BestSellersPage = () => {
  const { t } = useTranslation();
  const { data: sellers, isLoading } = useGetBestSellersQuery();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const filteredSellers = sellers?.data.filter((seller) =>
    seller.Name?.toLowerCase().includes(searchQuery.toLowerCase())
  );
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
      width={xs?"75vw":"100vw"}
    >
      <Box height="20%" display="flex" flexDirection="column" gap={MAIN_GAP}>
        <Typography variant="h3">{t("bestSellers")}</Typography>
        <SearchField value={searchQuery} onChange={handleSearchChange} />
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
