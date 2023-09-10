import {
  styled,
  alpha,
  Typography,
  Stack,
  Box,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FilterAltOutlined from "@mui/icons-material/FilterAltOutlined";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import SubmitButton from "../SubmitButton";
import {theme} from '../../themes'
import { StatusFilterForm } from "../../redux/app/constants";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

interface FilterMenuProps {
  handleFilter: (formData: StatusFilterForm) => void;
}
const UsersFilterMenu = ({ handleFilter }: FilterMenuProps) => {
  /**
   * i18n
   */
  const { t } = useTranslation();

  /**
   * --------------------------------------------------------------------------------------------------
   * State
   */
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [status, setStatus] = useState("all");
  const [formData, setFormData] = useState<StatusFilterForm>({
    status: "all",
  });

  /**
   * --------------------------------------------------------------------------------------------------
   * Handlers
   */
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFilter(formData);
    setAnchorEl(null);
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
       setStatus(event.target.value)
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div>
      <Button
        variant="outlined"
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        disableElevation
        onClick={handleClick}
        startIcon={<FilterAltOutlined  color="primary" />}
      >
        <Typography>{t("filter")}</Typography>
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem disableRipple>
          <Box>
            <form onSubmit={handleFormSubmit}>
              <Stack gap={2} width="20rem">
                <Typography variant="h5" fontWeight="bold">
                  {t("filter")}
                </Typography>
                
                <InputLabel
                  shrink
                  sx={{
                    display: "flex",
                    position: "static",
                    mb: "1rem",
                    ml: "-1rem",
                    left: "0",
                  }}
                >
                  <Typography variant="h5" fontWeight="bold" color={theme.palette.text.primary}>
                    {t("status")}
                  </Typography>
                </InputLabel>
                <Select
                  name="status"
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={status}
                  onChange={handleSelectChange}
                  autoWidth
                  placeholder="All"
                  sx={{
                    mt: "-2rem",
                    mb: "2rem",
                  }}
                >
                  <MenuItem value={"all"}>
                    <Typography variant="body1">{t('all')}</Typography>
                  </MenuItem>
                  <MenuItem value={"active"}>
                    <Typography variant="body1">{t('active')}</Typography>
                  </MenuItem>
                  <MenuItem value={"banned"}>
                    <Typography variant="body1">{t("banned")}</Typography>
                  </MenuItem>
                </Select>               

                <SubmitButton
                  text="applyFilter"
                  type="submit"
                />
              </Stack>
            </form>
          </Box>
        </MenuItem>
      </StyledMenu>
    </div>
  );
};

export default UsersFilterMenu;
