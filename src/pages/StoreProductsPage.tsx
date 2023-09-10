import { useParams } from "react-router-dom";
import {
  useGetStoreCategoriesMutation,
  useGetStoreProductsMutation,
} from "../redux/features/apiSlice";
import { useEffect, useState } from "react";
import { Box, CircularProgress, Tab, Tabs, Typography } from "@mui/material";
import { MAIN_PADDING, MAIN_GAP,xs } from "../redux/app/constants";
import { useTranslation } from "react-i18next";
import StoreProductsTable from "../components/tables/StoreProductsTable";
import SearchField from "../components/SearchField";
import StoreCategoriesTable from "../components/tables/StoreCategoriesTable";
import shoppingBagIcon from "../assets/icons/shopping-bag-icon.png";
import categoryIcon from "../assets/icons/category-icon.png";

const StoreProductsPage = () => {
  const { t } = useTranslation();
  const { storeId, storeName } = useParams();

  const [getStoreProducts, { data: storeProducts, isLoading }] =
    useGetStoreProductsMutation();

  const [getStoreCategories, { data: storeCategories }] =
    useGetStoreCategoriesMutation();

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [productSearchQuery, setProductSearchQuery] = useState("");
  const filteredProducts = storeProducts?.data.filter((product) =>
    product.Name.toLowerCase().includes(productSearchQuery.toLowerCase())
  );
  const handleProductSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProductSearchQuery(event.target.value);
  };

  const [categorySearchQuery, setCategorySearchQuery] = useState("");
  const filteredCategories = storeCategories?.data.filter((category) =>
    category.Name.toLowerCase().includes(categorySearchQuery.toLowerCase())
  );
  const handleCategorySearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCategorySearchQuery(event.target.value);
  };

  useEffect(() => {
    if (storeId) {
      const requestBody = { Store: storeId };
      getStoreProducts(requestBody);
      getStoreCategories(requestBody);
    }
  }, [getStoreProducts, getStoreCategories, storeId]);


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
        <Typography variant="h3" textAlign="center">
          {t(`${storeName}`)}
        </Typography>
      </Box>

      <Box>
        <Tabs value={value} onChange={handleChange} variant="fullWidth">
          <Tab
            icon={
              <Box
                sx={{
                  height: "2rem",
                  width: "2rem",
                  backgroundImage: `url(${shoppingBagIcon})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  alignSelf: "center",
                }}
              ></Box>
            }
            iconPosition="start"
            label={
              <Typography fontWeight="bold" variant="h6">
                {t("products")}
              </Typography>
            }
            sx={{
              color: value === 0 ? "primary.main" : "gray",
            }}
          />
          <Tab
            icon={
              <Box
                sx={{
                  height: "1.5rem",
                  width: "1.5rem",
                  backgroundImage: `url(${categoryIcon})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  alignSelf: "center",
                }}
              ></Box>
            }
            iconPosition="start"
            label={
              <Typography fontWeight="bold" variant="h6">
                {t("categories")}
              </Typography>
            }
            sx={{
              color: value === 1 ? "primary.main" : "gray",
            }}
          />
        </Tabs>
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
          {value === 0 && (
            <Box display="flex" flexDirection="column" gap={MAIN_GAP}>
              <SearchField
                value={productSearchQuery}
                onChange={handleProductSearchChange}
              />
              <StoreProductsTable products={filteredProducts || []} />
            </Box>
          )}
          {value === 1 && (
            <Box display="flex" flexDirection="column" gap={MAIN_GAP}>
              <SearchField
                value={categorySearchQuery}
                onChange={handleCategorySearchChange}
              />
              <StoreCategoriesTable categories={filteredCategories || []} />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default StoreProductsPage;

