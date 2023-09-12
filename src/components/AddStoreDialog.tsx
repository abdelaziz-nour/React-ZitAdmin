import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { Add } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  FormControl,
  InputBase,
  InputLabel,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {
  useAddStoreMutation,
  useGetUsersQuery,
} from "../redux/features/apiSlice";
import { useState } from "react";
import { MAIN_GAP, UserData } from "../redux/app/constants";
import imageIcon from "../assets/icons/image-icon.png";
import CustomizedSnackbar from "./CustomizedSnackbar";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const StyledAutocomplete = styled(Autocomplete)(() => ({
  "& .MuiInputBase-root": {
    borderRadius: "10px",
  },
}));
const HiddenInput = styled("input")({
  display: "none",
});
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 10,
    position: "relative",
    border: "1px solid",
    borderColor: "grey[500]",
    width: "100%",
    padding: "10px 12px",
  },
}));
export default function AddStoreDialog() {
  /**
   * --------------------------------------------------------------------------------------------------
   * i18n
   */
  const { t } = useTranslation();

  /**
   * --------------------------------------------------------------------------------------------------
   * RTK Queries
   */
  const { data: usersData } = useGetUsersQuery();
  const [addStore, { isLoading }] = useAddStoreMutation();

  /**
   * --------------------------------------------------------------------------------------------------
   * State
   */
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [storeName, setStoreName] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserData>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  /**
   * --------------------------------------------------------------------------------------------------
   * Locals
   */
  const filteredUsers =
    usersData?.data.filter((user: UserData) => user.Store === "None") || [];

  /**
   * --------------------------------------------------------------------------------------------------
   * Handlers
   */
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
    } else {
      setSelectedImage(null);
    }
  };
  const handleAddStore = async (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedImage && selectedUser?.Email && storeName) {
      try {
        const requestBody = {
          Image: selectedImage,
          Email: selectedUser?.Email,
          Name: storeName,
        };

        const response = await addStore(requestBody);
        if ("data" in response && response.data.success) {
          setSuccessMessage(t("storeAddedSuccessfully"));

          setOpen(false);
        }
      } catch (error) {
        console.error("Add store error:", error);
        setErrorMessage(t("anErrorOccurredWhileAddingTheStore"));
      }
    } else {
      if (!selectedImage) {
        setErrorMessage(t("pleaseProvideTheImageOfTheStore"));
      }
      if (!selectedUser?.Email) {
        setErrorMessage(t("pleaseProvideTheOwnerOfTheStore"));
      }
      if (!storeName) {
        setErrorMessage(t("pleaseProvideTheNameOfTheStore"));
      }
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        startIcon={
          <Box color="white" display="flex" alignItems="center">
            <Add />
          </Box>
        }
      >
        <Typography>{t("addStore")}</Typography>
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <Typography fontWeight="bold">{t("addStore")}</Typography>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography>
            {t("allZITUsersAppearsHerePleaseSelectAUserToCreateAStore")}
          </Typography>
          <Box display="flex" flexDirection="column" gap={MAIN_GAP}>
            <Typography fontWeight="bold">{t("selectUser")}</Typography>
            <StyledAutocomplete
              options={filteredUsers}
              getOptionLabel={(option: unknown) =>
                (option as UserData).UserName
              }
              onChange={(event, newValue) =>
                setSelectedUser(newValue as UserData)
              }
              renderInput={(params) => (
                <TextField placeholder={t("chooseAUser")} {...params} />
              )}
            />

            <FormControl variant="standard" fullWidth>
              <InputLabel
                shrink
                htmlFor="bootstrap-input"
                sx={{ width: "100%" }}
              >
                <Typography
                  fontWeight="bold"
                >
                  {t("storeName")}
                </Typography>
              </InputLabel>

              <BootstrapInput
                placeholder={t("enterStoreName")}
                id="bootstrap-input"
                onChange={(e) => setStoreName(e.target.value)}
              />
            </FormControl>

            <Typography fontWeight="bold">{t("storeImage")}</Typography>

            <div>
              <label htmlFor="image-input" style={{ display: "contents" }}>
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={
                    <Box
                      sx={{
                        height: "2rem",
                        width: "2rem",
                        backgroundImage: `url(${imageIcon})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        alignSelf: "center",
                      }}
                    ></Box>
                  }
                >
                  <Typography>{t("chooseImage")}</Typography>
                </Button>
              </label>
              <HiddenInput
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                id="image-input"
              />
              {selectedImage && (
                <div>
                  <Typography fontWeight="bold">
                    {t("selectedImage")}
                  </Typography>
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    style={{ maxWidth: "100%", maxHeight: "300px" }}
                  />
                </div>
              )}
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress />
            </Box>
          ) : (
            <Button autoFocus onClick={handleAddStore} variant="contained">
              <Typography>{t("add")}</Typography>
            </Button>
          )}
        </DialogActions>
      </BootstrapDialog>
      <CustomizedSnackbar
        open={errorMessage !== null || successMessage !== null}
        message={errorMessage || successMessage || ""}
        severity={errorMessage ? "error" : "success"}
        onClose={() => {
          setErrorMessage(null);
          setSuccessMessage(null);
        }}
      />
    </div>
  );
}
