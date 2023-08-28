
import { Box, Typography } from "@mui/material";

const Footer = () => {
  document.dir = "ltr";

  return (
    <Box
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
    >
      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",
          fontSize: "0.65rem",
          padding: "0.25rem",
          color: "text.primary",
          backgroundImage: "transparent",
        }}
      >
        © 2023 Zoal IT. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
