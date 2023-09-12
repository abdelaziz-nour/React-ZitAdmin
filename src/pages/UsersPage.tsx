import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
} from "@mui/material";
import UsersTable from "../components/tables/UsersTable";
import { useTranslation } from "react-i18next";
import { MAIN_GAP, MAIN_PADDING, SMALL_SCREEN_CONTENT_WIDTH } from "../redux/app/constants";
import SearchField from "../components/SearchField";
import { useGetUsersQuery } from "../redux/features/apiSlice";
import { useState } from "react";
import { lightTheme } from "../themes";

const UsersPage = () => {
  /**
   * --------------------------------------------------------------------------------------------------
   * i18t
   */
  const { t } = useTranslation();

  /**
   * --------------------------------------------------------------------------------------------------
   * Api Queries
   */
  const { data: users, isLoading } = useGetUsersQuery();

  /**
   * --------------------------------------------------------------------------------------------------
   * Locals
   */
  const xs = useMediaQuery(lightTheme.breakpoints.down("sm"));

  /**
   * --------------------------------------------------------------------------------------------------
   * State
   */
  const [searchQuery, setSearchQuery] = useState("");

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
        <Typography variant="h3">{t("users")}</Typography>
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
        <UsersTable users={users?.data || []} searchQuery={searchQuery} />
      )}
    </Box>
  );
};

export default UsersPage;
