import { Box, Button, Typography, useTheme } from "@mui/material";
import {
  BORDER_RADIUS,
  BOX_SHADOW,
  HOST,
  MAIN_GAP,
  MAIN_PADDING,
} from "../redux/app/constants";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
interface StoreCardProps {
  storeName: string;
  owner: string;
  image: string;
  storeId: string;
}
const StoreCard = ({ storeName, owner, image, storeId }: StoreCardProps) => {
  /**
   * --------------------------------------------------------------------------------------------------
   * i18n
   */
  const { t } = useTranslation();

  /**
   * --------------------------------------------------------------------------------------------------
   * Hooks
   */
  const navigate = useNavigate();
  const theme = useTheme();
  
  return (
    <Box
      p={MAIN_PADDING}
      display="flex"
      flexDirection="column"
      alignItems="center"
      bgcolor={theme.palette.background.paper}
      borderRadius={BORDER_RADIUS}
      boxShadow={BOX_SHADOW}
      gap={MAIN_GAP}
    >
      <Box
        p={MAIN_PADDING}
        height="50%"
        sx={{
          height: "10rem",
          width: "10rem",
          backgroundImage: `url(${HOST}${image})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          alignSelf: "center",
          borderRadius: BORDER_RADIUS,
        }}
      ></Box>
      <Box
        height="25%"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box height="50%">
          <Typography variant="h6">{storeName}</Typography>
        </Box>
        <Box height="50%">
          <Typography variant="h6">{owner}</Typography>
        </Box>
      </Box>
      <Box height="25%" display="flex" alignItems="center" gap={MAIN_GAP}>
        <Box width="50%">
          <Button
            variant="contained"
            onClick={() => navigate(`/store-orders/${storeId}/${storeName}`)}
          >
            <Typography>{t("orders")}</Typography>
          </Button>
        </Box>
        <Box width="50%">
          <Button
            variant="outlined"
            onClick={() => navigate(`/store-products/${storeId}/${storeName}`)}
          >
            <Typography>{t("products")}</Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default StoreCard;
