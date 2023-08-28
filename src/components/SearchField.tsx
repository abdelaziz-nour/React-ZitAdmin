import React from "react"; 
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";

interface SearchFieldProps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchField: React.FC<SearchFieldProps> = ({ value, onChange }) => { 
  const {t} = useTranslation()
  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: '33%' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={t("search")}
        inputProps={{ "aria-label": "search google maps" }}
        value={value} 
        onChange={onChange} 
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchField;
