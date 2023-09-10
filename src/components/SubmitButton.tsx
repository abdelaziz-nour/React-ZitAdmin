import { Button, Typography } from "@mui/material";
import { t } from "i18next";
/**
 * Props
 */
interface SubmitButtonProps {
  text: string;
  onClick?: () => void;
  bgColor?: string | "primary";
  type?: "button" | "submit" | "reset";
}

const SubmitButton = ({ text, onClick, bgColor,type }: SubmitButtonProps) => {
  /**
   * --------------------------------------------------------------------------------------------------
   * Handlers
   */
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Button
      variant="contained"
      sx={{ width: "100%", backgroundColor: bgColor, padding: 1.5 }}
      onClick={handleClick}
      type={type}
    >
      <Typography>{t(text)}</Typography>
    </Button>
  );
};

export default SubmitButton;
