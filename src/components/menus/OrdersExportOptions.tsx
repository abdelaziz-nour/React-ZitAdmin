import {
  styled,
  alpha,
  Typography,
  Stack,
  Box,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { Launch } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import SubmitButton from "../SubmitButton";
import { BIG_GAP, OrdersExportOptions } from "../../redux/app/constants";

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

interface ExportMenuProps {
  handleExport: (formData: OrdersExportOptions, exportType: string) => void;
  storeColumn: boolean;
}

const OrdersExportOptionsMenu = ({ handleExport,storeColumn }: ExportMenuProps) => {
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
  const [exportType, setExportType] = useState("PDF");
  const [exportOptions] = useState<OrdersExportOptions>(storeColumn?{
    id: true,
    orderedBy: true,
    orderDate: true,
    status: true,
    total: true,
    orderedItems: true,
    store:true
  }:{
    id: true,
    orderedBy: true,
    orderDate: true,
    status: true,
    total: true,
    orderedItems: true,
  });
  const [temporaryExportOptions, setTemporaryExportOptions] =
    useState<OrdersExportOptions>(exportOptions);

  /**
   * --------------------------------------------------------------------------------------------------
   * Handlers
   */
  const handleSelectChange = (event: SelectChangeEvent) => {
    setExportType(event.target.value);
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleExportSubmit = () => {
    handleExport(temporaryExportOptions, exportType);
  };
  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setTemporaryExportOptions((prevData) => ({
      ...prevData,
      [name]: checked,
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
        startIcon={<Launch color="primary" />}
      >
        <Typography>{t("export")}</Typography>
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
            <Stack gap={BIG_GAP} width="20rem" m={2}>
              <Typography variant="h5" fontWeight="bold">
                {t("exportOptions")}
              </Typography>
              <Typography variant="body2">{t("options")}</Typography>
              <Box display="flex">
                <Box
                  display="flex"
                  height="100px"
                  width="50%"
                  flexDirection="column"
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked
                        name="id"
                        onChange={handleCheckBox}
                        value={exportOptions.id}
                      />
                    }
                    label={<Typography variant="body1">{t("id")}</Typography>}
                  />
                  {storeColumn&&<FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked
                        name="store"
                        onChange={handleCheckBox}
                        value={exportOptions.store}
                      />
                    }
                    label={
                      <Typography variant="body1">{t("store")}</Typography>
                    }
                  />}
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked
                        name="orderedBy"
                        onChange={handleCheckBox}
                        value={exportOptions.orderedBy}
                      />
                    }
                    label={
                      <Typography variant="body1">{t("orderedBy")}</Typography>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked
                        name="orderDate"
                        onChange={handleCheckBox}
                        value={exportOptions.orderDate}
                      />
                    }
                    label={
                      <Typography variant="body1">{t("orderDate")}</Typography>
                    }
                  />
                </Box>
                <Box
                  display="flex"
                  height="100px"
                  width="50%"
                  flexDirection="column"
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked
                        name="status"
                        onChange={handleCheckBox}
                        value={exportOptions.status}
                      />
                    }
                    label={
                      <Typography variant="body1">{t("status")}</Typography>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked
                        name="orderedItems"
                        onChange={handleCheckBox}
                        value={exportOptions.orderedItems}
                      />
                    }
                    label={
                      <Typography variant="body1">
                        {t("orderedItems")}
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked
                        name="total"
                        onChange={handleCheckBox}
                        value={exportOptions.total}
                      />
                    }
                    label={
                      <Typography variant="body1">{t("total")}</Typography>
                    }
                  />
                </Box>
              </Box>
              {storeColumn&&<Box height='2rem'></Box>}
              <Divider />
              <FormControl>
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
                  <Typography variant="h5" fontWeight="bold">
                    {t("chooseFormat")}
                  </Typography>
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={exportType}
                  onChange={handleSelectChange}
                  autoWidth
                  placeholder="All"
                  sx={{
                    mt: "-2rem",
                  }}
                >
                  <MenuItem value={"PDF"}>.PDF (default)</MenuItem>
                  <MenuItem value={"CSV"}>.CSV</MenuItem>
                  <MenuItem value={"XLS"}>.XLSX</MenuItem>
                </Select>
              </FormControl>

              <SubmitButton text="export" onClick={handleExportSubmit} />
            </Stack>
          </Box>
        </MenuItem>
      </StyledMenu>
    </div>
  );
};

export default OrdersExportOptionsMenu;
