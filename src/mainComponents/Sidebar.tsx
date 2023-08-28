import React from "react";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import {  DashboardRounded } from "@mui/icons-material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useLocation, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/authSlice";
import logo from "../assets/images/logo.png";
import usersIcon from "../assets/icons/users-icon.png";
import storesIcon from "../assets/icons/stores-icon.png";
import productsIcon from "../assets/icons/products-icon.png";
import ordersIcon from "../assets/icons/orders-icon.png";
import sellersIcon from "../assets/icons/sellers-icons.png";
import products2Icon from "../assets/icons/products2-icon.png";
import { SIDEBAR_WIDTH } from "../redux/app/constants";

type Props = {
  icon: React.ReactElement;
  text: string;
  to: string;
};

const CListItem = ({ icon, text, to }: Props) => {
  const {  i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutuser = async () => {
    dispatch(logout());
    console.log("logout");
    navigate("/");
  };

  const handleClick = () => {
    switch (to) {
      case "logout":
        logoutuser();
        return;
      case "switchLanguage":
        i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
        return;
      default:
        navigate(to);
    }
  };

  return (
    <>
      <Tooltip />
      <ListItem
        sx={{
          paddingX: 0,
        }}
      >
        <ListItemButton
          onClick={handleClick}
          sx={{
            display:'flex',
            color: "text.primary",
            opacity: location.pathname
              .toLowerCase()
              .includes(to.slice(1, to.length - 1))
              ? 0.85
              : 1,
            height: "2rem",
            "&:hover": {
              backgroundColor: `${"background.default"}`,
              color: "text.primary",
            },
          }}
        >
          <Stack
            direction= "row"
            spacing={0}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            {icon}
            <ListItemText
              primary={text}
              sx={{
                paddingX: 1,
              }}
            />
          </Stack>
        </ListItemButton>
      </ListItem>
    </>
  );
};

const Sidebar = () => {
  const { t, i18n } = useTranslation();
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: SIDEBAR_WIDTH,
        ">.css-1218q3a-MuiPaper-root-MuiDrawer-paper": { position: "relative" },
      }}
    >
      <Paper
        sx={{
          height: "100vh",
          width: SIDEBAR_WIDTH,
          overflowY: "hidden",
        }}
      >
        <List
          sx={{
            marginX: 0,
            paddingX: 0,
            width: SIDEBAR_WIDTH,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              height: "7rem",
              width: "7rem",
              backgroundImage: `url(${logo})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              alignSelf: "center",
            }}
          ></Box>
          <Divider />
          <CListItem
            icon={<DashboardRounded sx={{ color: "primary.main" }} />}
            text={t("dashboard")}
            to={"/dashboard"}
            key="dashboard"
          />
          <CListItem
            icon={
              <Box
                sx={{
                  height: "2rem",
                  width: "2rem",
                  backgroundImage: `url(${usersIcon})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  alignSelf: "center",
                }}
              ></Box>
            }
            text={t("users")}
            to={"/users"}
            key="users"
          />

          <CListItem
            icon={
              <Box
                sx={{
                  height: "2rem",
                  width: "2rem",
                  backgroundImage: `url(${storesIcon})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  alignSelf: "center",
                }}
              ></Box>
            }
            text={t("stores")}
            to={"/stores"}
            key="stores"
          />
          <CListItem
            icon={
              <Box
                sx={{
                  height: "2rem",
                  width: "2rem",
                  backgroundImage: `url(${productsIcon})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  alignSelf: "center",
                }}
              ></Box>
            }
            text={t("products")}
            to={"/products"}
            key="products"
          />
          <CListItem
            icon={
              <Box
                sx={{
                  height: "2rem",
                  width: "2rem",
                  backgroundImage: `url(${ordersIcon})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  alignSelf: "center",
                }}
              ></Box>
            }
            text={t("orders")}
            to={"/orders"}
            key="orders"
          />
          <CListItem
            icon={
              <Box
                sx={{
                  height: "2rem",
                  width: "2rem",
                  backgroundImage: `url(${sellersIcon})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  alignSelf: "center",
                }}
              ></Box>
            }
            text={t("bestSellers")}
            to={"/best-sellers"}
            key="bestSellers"
          />
          <CListItem
            icon={
              <Box
                sx={{
                  height: "2rem",
                  width: "2rem",
                  backgroundImage: `url(${products2Icon})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  alignSelf: "center",
                }}
              ></Box>
            }
            text={t("bestProducts")}
            to={"/best-products"}
            key="bestProducts"
          />

          <CListItem
            icon={
              i18n.language === "ar" ? (
                <Typography
                  sx={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    marginX: "0.25rem",
                    color: "primary.main",
                  }}
                >
                  E
                </Typography>
              ) : (
                <Typography
                  sx={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    marginX: "0.25rem",
                    color: "primary.main",
                  }}
                >
                  ع
                </Typography>
              )
            }
            text={t("language")}
            to={"switchLanguage"}
            key="switchLanguage"
          />
          {/* <CListItem
            icon={<BrightnessLowRounded sx={{ color: "primary.main" }} />}
            text={t("darkMode")}
            to={"switchDarkMode"}
            key="switchDarkMode"
          /> */}
          <CListItem
            icon={<LogoutRoundedIcon sx={{ color: "red" }} />}
            text={t("logout")}
            to={"logout"}
            key="logout"
          />
        </List>
      </Paper>
    </Drawer>
  );
};

export default Sidebar;
