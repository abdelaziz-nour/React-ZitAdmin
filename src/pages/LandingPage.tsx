import { useTranslation } from "react-i18next";
import ViewArea from "../mainComponents/ViewArea";
import { Box, Typography } from "@mui/material";
import logo from "../assets/images/logo.png";

const LandingPage = () => {
  const { t } = useTranslation();
  return (
    <ViewArea>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography variant="h4" fontWeight="bold">
          {t("welcomeBack")}
        </Typography>
        <Box
          sx={{
            my: "10rem",
            height: "20vh",
            width: "20vh",
            backgroundImage: `url(${logo})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            alignSelf: "center",
          }}
        ></Box>

        <Typography>{t("pleaseSelectATab")}</Typography>
      </Box>
    </ViewArea>
  );
};

export default LandingPage;
