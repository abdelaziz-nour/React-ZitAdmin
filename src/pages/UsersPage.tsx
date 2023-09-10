import { Box, CircularProgress, Typography, useMediaQuery } from "@mui/material";
import UsersTable from "../components/tables/UsersTable";
import { useTranslation } from "react-i18next";
import { MAIN_GAP, MAIN_PADDING } from "../redux/app/constants";
import SearchField from "../components/SearchField";
import { useGetUsersQuery } from "../redux/features/apiSlice";
import { useState } from "react";
import { theme } from "../themes";

const UsersPage = () => {
  const { t } = useTranslation();
  const { data: users, isLoading } = useGetUsersQuery();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));

  const [searchQuery, setSearchQuery] = useState("");
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
      <Box height="20%" display="flex" flexDirection="column" gap={MAIN_GAP}
          >
        <Typography variant="h3"
        
        >{t("users")}</Typography>
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
        <UsersTable users={users?.data || []}searchQuery={searchQuery} />
      )}
    </Box>
  );
};

export default UsersPage;
