import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
} from "@mui/material";
import StoreCard from "../components/StoreCard";
import { useTranslation } from "react-i18next";
import { MAIN_GAP, MAIN_PADDING, SMALL_SCREEN_CONTENT_WIDTH } from "../redux/app/constants";
import SearchField from "../components/SearchField";
import { useGetStoresQuery } from "../redux/features/apiSlice";
import AddStoreDialog from "../components/AddStoreDialog";
import DeleteStoreDialog from "../components/DeleteStoreDialog";
import { lightTheme } from "../themes";
import { useState } from "react";

const StoresPage = () => {
  /**
   * --------------------------------------------------------------------------------------------------
   * i18t
   */
  const { t } = useTranslation();

  /**
   * --------------------------------------------------------------------------------------------------
   * Api Queries
   */
  const { data: stores, isLoading } = useGetStoresQuery();

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
  const filteredStores = stores?.data.filter((store) =>
    store.Name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /**
   * --------------------------------------------------------------------------------------------------
   * Handlers
   */
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const storeChunks = xs
    ? filteredStores
      ? Array.from(
          { length: Math.ceil(filteredStores.length / 1) },
          (_, index) => filteredStores.slice(index * 1, index * 1 + 1)
        )
      : []
    : filteredStores
    ? Array.from({ length: Math.ceil(filteredStores.length / 4) }, (_, index) =>
        filteredStores.slice(index * 4, index * 4 + 4)
      )
    : [];
  return (
    <Box
      display="flex"
      flexDirection="column"
      height={"100vh"}
      width={xs ? SMALL_SCREEN_CONTENT_WIDTH: "100vw"}
      sx={{
        overflowX: "hidden",
      }}
    >
      <Box height="20%">
        <Typography variant="h3" p={MAIN_PADDING}>
          {t("stores")}
        </Typography>
        <Box
          p={MAIN_PADDING}
          display="flex"
          gap={MAIN_GAP}
          justifyContent="space-between"
          flexDirection={xs ? "column" : "row"}
        >
          <SearchField
            value={searchQuery}
            onChange={handleSearchChange}
            width={xs && "100%"}
          />
          <Box display="flex" gap={MAIN_GAP} >
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
            <Box
              display="flex"
              gap={MAIN_GAP}
              key={rowIndex}
              sx={{mt:xs?'2rem':0}}
              p={MAIN_PADDING}
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
