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
import { useGetProductsQuery } from "../redux/features/apiSlice";
import { useState } from "react";
import ProductsTable from "../components/tables/ProductsTable";
import { lightTheme } from "../themes";

const ProductsPage = () => {
  /**
   * --------------------------------------------------------------------------------------------------
   * i18n
   */
  const { t } = useTranslation();

  /**
   * --------------------------------------------------------------------------------------------------
   * State
   */
  const [searchQuery, setSearchQuery] = useState("");

  /**
   * --------------------------------------------------------------------------------------------------
   * RTQ Queries
   */
  const { data: products, isLoading } = useGetProductsQuery();

  /**
   * --------------------------------------------------------------------------------------------------
   * Locals
   */
  const xs = useMediaQuery(lightTheme.breakpoints.down("sm"));
  const filteredProducts = products?.data.filter((product) =>
    product.Name.toLowerCase().includes(searchQuery.toLowerCase())
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
        <Typography variant="h3">{t("products")}</Typography>
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
        <ProductsTable products={filteredProducts || []} />
      )}
    </Box>
  );
};

export default ProductsPage;
