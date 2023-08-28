import { Box, CircularProgress, Typography } from "@mui/material";
import StoreCard from "../components/StoreCard";
import { useTranslation } from "react-i18next";
import { MAIN_GAP, MAIN_PADDING } from "../redux/app/constants";
import SearchField from "../components/SearchField";
import { useGetStoresQuery } from "../redux/features/apiSlice";
import AddStoreDialog from "../components/AddStoreDialog";
import DeleteStoreDialog from "../components/DeleteStoreDialog";

const StoresPage = () => {
  const { t } = useTranslation();
  const { data: stores, isLoading } = useGetStoresQuery();

  const storeChunks = stores
    ? Array.from({ length: Math.ceil(stores.data.length / 4) }, (_, index) =>
        stores.data.slice(index * 4, index * 4 + 4)
      )
    : [];
  return (
    <Box display="flex" flexDirection="column" height="100vh" width="100vw">
      <Box height="20%">
        <Typography
          variant="h3"
          p={MAIN_PADDING}
        >
          {t("stores")}
        </Typography>
        <Box
          p={MAIN_PADDING}
          display="flex"
          gap={MAIN_GAP}
          justifyContent="space-between"
        >
          <SearchField />
          <Box display="flex" gap={MAIN_GAP}>
            <AddStoreDialog /> <DeleteStoreDialog />
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
        storeChunks.map((chunk, rowIndex) => (
          <Box display="flex" gap={MAIN_GAP} key={rowIndex}
          sx={{
          }}
          >
            {chunk.map((store) => (
              <Box
                p={MAIN_PADDING}
                key={store.id}
                display="flex"
                justifyContent="space-between"
                width="25%"
              >
                <StoreCard
                  storeName={store.Name}
                  owner={store.Owner}
                  image={store.Image}
                  storeId={store.id} 
                />
              </Box>
            ))}
          </Box>
        ))
      )}
    </Box>
  );
};

export default StoresPage;
