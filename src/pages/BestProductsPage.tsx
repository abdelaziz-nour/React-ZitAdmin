import { useState } from "react";
import { Box, CircularProgress, Typography, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import { MAIN_GAP, MAIN_PADDING } from "../redux/app/constants";
import SearchField from "../components/SearchField";
import { useGetBestProductsQuery } from "../redux/features/apiSlice";
import BestProductsTable from "../components/tables/BestProductsTable";
import { theme } from "../themes";

const BestProductsPage = () => {
  const xs = useMediaQuery(theme.breakpoints.down("sm"));

  const { t } = useTranslation();
  const { data: products, isLoading } = useGetBestProductsQuery();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const filteredProducts = products?.data.filter((product) =>
    product.Name?.toLowerCase().includes(searchQuery.toLowerCase())
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
        <Typography variant="h3">{t("bestProducts")}</Typography>
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
          <BestProductsTable products={filteredProducts || []} />
        </Box>
      )}
    </Box>
  );
};

export default BestProductsPage;
