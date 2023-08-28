import { KeyboardArrowRight } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import {
  BORDER_RADIUS,
  BOX_SHADOW,
  SMALL_PADDING,
  MAIN_GAP,
  ListTileData,
} from "../redux/app/constants";
import { theme } from "../themes";
import { useTranslation } from "react-i18next";

const ListTile = ({ image, title, subtitle }: ListTileData) => {
  const { t } = useTranslation();
  
  return (
    <Stack
      sx={{
        cursor: "pointer",
        ":hover": {
          transform: "scale(1.125)",
          borderColor: "rgba(255, 255, 255, 0.9)",
          transition: "all 0.3s ease",
        },
      }}
    >
      <Box
        display="flex"
        height="5rem"
        bgcolor={theme.palette.background.paper}
        borderRadius={BORDER_RADIUS}
        boxShadow={BOX_SHADOW}
        justifyContent="space-between"
        p={SMALL_PADDING}
      >
        <Box display="flex" gap={MAIN_GAP}>
          <Box
            width="25%"
            sx={{
              height: "5rem",
              width: "5rem",
              backgroundImage: `${image}`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              alignSelf: "center",
            }}
          ></Box>
          <Box gap={MAIN_GAP}>
            <Box height="50%" alignItems="center" display="flex">
              <Typography fontWeight="bold">{t(`${title}`)}</Typography>
            </Box>
            <Box height="50%">
              <Typography>{t(`${subtitle}`)}</Typography>
            </Box>
          </Box>
        </Box>
        <Box
          width="20%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <KeyboardArrowRight sx={{ height: "2rem", width: "2rem" }} />
        </Box>
      </Box>
    </Stack>
  );
};

export default ListTile;
