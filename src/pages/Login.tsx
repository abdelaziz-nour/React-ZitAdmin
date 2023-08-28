import { useState } from "react";
import "../css/login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../redux/features/apiSlice";
import { setToken } from "../redux/features/authSlice";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();

  const { t } = useTranslation();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const credentials = { username, password };
      const response = await login(credentials);

      if ("data" in response && response.data.success) {
        const token = response.data.data.token;
        dispatch(setToken(token));
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
    <Box height="100vh" width='100vw'>
      <meta charSet="utf-8" />
      <title>ZIT: Sign in</title>
      <div className="login-root">
        <div
          className="box-root flex-flex flex-direction--column"
          style={{ minHeight: "100vh", flexGrow: 1 }}
        >
          <div className="loginbackground box-background--white padding-top--64">
            <div className="loginbackground-gridContainer">
              <div
                className="box-root flex-flex"
                style={{ gridArea: "top / start / 8 / end" }}
              >
                <div
                  className="box-root"
                  style={{
                    backgroundImage:
                      "linear-gradient(white 0%, rgb(247, 250, 252) 33%)",
                    flexGrow: 1,
                  }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "4 / 2 / auto / 5" }}
              >
                <div
                  className="box-root box-divider--light-all-2 animationLeftRight tans3s"
                  style={{ flexGrow: 1 }}
                />
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "6 / start / auto / 2" }}
              >
                <div
                  className="box-root box-background--blue800"
                  style={{ flexGrow: 1 }}
                />
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "7 / start / auto / 4" }}
              >
                <div
                  className="box-root box-background--blue animationLeftRight"
                  style={{ flexGrow: 1 }}
                />
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "8 / 4 / auto / 6" }}
              >
                <div
                  className="box-root box-background--gray100 animationLeftRight tans3s"
                  style={{ flexGrow: 1 }}
                />
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "2 / 15 / auto / end" }}
              >
                <div
                  className="box-root box-background--cyan200 animationRightLeft tans4s"
                  style={{ flexGrow: 1 }}
                />
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "3 / 14 / auto / end" }}
              >
                <div
                  className="box-root box-background--blue animationRightLeft"
                  style={{ flexGrow: 1 }}
                />
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "4 / 17 / auto / 20" }}
              >
                <div
                  className="box-root box-background--gray100 animationRightLeft tans4s"
                  style={{ flexGrow: 1 }}
                />
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "5 / 14 / auto / 17" }}
              >
                <div
                  className="box-root box-divider--light-all-2 animationRightLeft tans3s"
                  style={{ flexGrow: 1 }}
                />
              </div>
            </div>
          </div>
          <div
            className="box-root padding-top--24 flex-flex flex-direction--column"
            style={{ flexGrow: 1, zIndex: 9 }}
          >
            <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
              <h1>
                <a href="http://blog.stackfindover.com/" rel="dofollow">
                  Zoal IT
                </a>
              </h1>
            </div>
            <div className="formbg-outer">
              <div className="formbg">
                <div className="formbg-inner padding-horizontal--48">
                  <span className="padding-bottom--15">
                    <Typography fontWeight='bold'>{t("signInToYourAccount")}</Typography>
                  </span>
                  <form id="stripe-login">
                    <div className="field padding-bottom--24">
                      <label htmlFor="username">
                        <Typography fontWeight='bold'>{t("username")}</Typography>
                      </label>
                      <input
                        type="username"
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="field padding-bottom--24">
                      <div className="grid--50-50">
                        <label htmlFor="password">
                          <Typography fontWeight='bold'>{t("password")}</Typography>
                        </label>
                        <div className="reset-pass">
                        </div>
                      </div>
                      <input
                        type="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="field field-checkbox padding-bottom--24 flex-flex align-center">
                      <label htmlFor="checkbox"></label>
                    </div>
                    {isLoading ? (
                      <div className="container">
                        <div className="divider" aria-hidden="true"></div>
                        <p className="loading-text" aria-label="Loading">
                          <span className="letter" aria-hidden="true">
                            L
                          </span>
                          <span className="letter" aria-hidden="true">
                            o
                          </span>
                          <span className="letter" aria-hidden="true">
                            a
                          </span>
                          <span className="letter" aria-hidden="true">
                            d
                          </span>
                          <span className="letter" aria-hidden="true">
                            i
                          </span>
                          <span className="letter" aria-hidden="true">
                            n
                          </span>
                          <span className="letter" aria-hidden="true">
                            g
                          </span>
                        </p>
                      </div>
                    ) : (
                      <div className="field padding-bottom--24">
                        <input
                        
                          type="submit"
                          value={t("login")}
                          onClick={handleLogin}
                        />
                      </div>
                    )}
                  </form>
                </div>
              </div>
              <div className="footer-link padding-top--24">
                <div className="listing padding-top--24 padding-bottom--24 flex-flex center-center">
                  <span>
                    <a href="#">©ZOALIT</a>
                  </span>
                  <span>
                    <a href="#">
                      <Typography fontWeight='bold'>{t("contact")}</Typography>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Login;
