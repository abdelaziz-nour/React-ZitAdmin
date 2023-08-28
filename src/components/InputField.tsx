import {
  styled,
  InputBase,
  alpha,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { theme } from "../themes";

const InputField = ({
  text,
  withLabel,
  bgColor,
  value,
  onChange
}: {
  text: string;
  withLabel?: boolean;
  bgColor?: string;
  value?: string;
  onChange?: (event: any) => void;

}) => {
  const { t } = useTranslation();

   const BootstrapInput = bgColor
    ? styled(InputBase)(({ theme }) => ({
        "label + &": {
          marginTop: theme.spacing(3),
        },
        "& .MuiInputBase-input": {
          borderRadius: 10,
          position: "relative",
          backgroundColor: bgColor,
          border: "1px solid",
          borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
          width: "100%",
          padding: "10px 12px",
          transition: theme.transitions.create([
            "border-color",
            "background-color",
            "box-shadow",
          ]),
          fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(","),
          "&:focus": {
            boxShadow: `${alpha(
              theme.palette.primary.main,
              0.25
            )} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
          },
        },
      }))
    : styled(InputBase)(({ theme }) => ({
        "label + &": {
          marginTop: theme.spacing(3),
        },
        "& .MuiInputBase-input": {
          borderRadius: 10,
          position: "relative",
          backgroundColor:
            theme.palette.mode === "light" ? "#ffffff" : "#1A2027",
          border: "1px solid",
          borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
          width: "100%",
          padding: "10px 12px",
          transition: theme.transitions.create([
            "border-color",
            "background-color",
            "box-shadow",
          ]),
          fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(","),
          "&:focus": {
            boxShadow: `${alpha(
              theme.palette.primary.main,
              0.25
            )} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
          },
        },
      }));
  return (
    <FormControl variant="standard" fullWidth>
      {withLabel ?? (
        <InputLabel shrink htmlFor="bootstrap-input" sx={{width:'100%'}}>
          <Typography variant="h6" fontWeight="bold" color={theme.palette.text.primary}>
            {t(text)}
          </Typography>
        </InputLabel>
      )}
      {value ? (
        <BootstrapInput
          placeholder={`Enter ${text}`}
          id="bootstrap-input"
          type={text.includes("password") ? "password" : "text"}
          value={value}
          onChange={onChange} 

        />
      ) : (
        <BootstrapInput
          placeholder={`Enter ${text}`}
          id="bootstrap-input"
          type={text.includes("Password") ? "password" : "text"}
          onChange={onChange} 
        />
      )}
    </FormControl>
  );
};

export default InputField;
