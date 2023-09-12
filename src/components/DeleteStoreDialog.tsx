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
import { Delete } from "@mui/icons-material";
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
  useDeleteStoreMutation,
  useGetUsersQuery,
} from "../redux/features/apiSlice";
import { useState } from "react";
import { MAIN_GAP, UserData } from "../redux/app/constants";
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

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 10,
    position: "relative",
    border: "1px solid",
    width: "100%",
    padding: "10px 12px",
  },
}));
export default function DeleteStoreDialog() {
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
  const [deleteStore, { isLoading }] = useDeleteStoreMutation();

  /**
   * --------------------------------------------------------------------------------------------------
   * State
   */
  const [open, setOpen] = useState(false);
  const [storeName, setStoreName] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserData>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  /**
   * --------------------------------------------------------------------------------------------------
   * Locals
   */
  const filteredUsers =
    usersData?.data.filter(
      (user: UserData) => user.Store !== "None" && user.StoreDeletion !== true
    ) || [];

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
  const handleDeleteStore = async (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedUser?.Store && storeName && selectedUser?.Store === storeName) {
      try {
        const requestBody = {
          Store: selectedUser?.StoreID,
        };

        const response = await deleteStore(requestBody);
        if ("data" in response && response.data.success) {
          setSuccessMessage(t("storeDeletedSuccessfully"));
          setOpen(false);
        }
      } catch (error) {
        console.error("Add store error:", error);
        setErrorMessage(t("anErrorOccurredWhileDeletingTheStore"));
      }
    } else {
      if (!selectedUser) {
        setErrorMessage(t("pleaseProvideTheStore"));
      }
      if (selectedUser?.Store !== storeName) {
        setErrorMessage(t("storeNameNotMatched"));
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
        sx={{ bgcolor: "red" }}
        startIcon={
          <Box color="white" display="flex" alignItems="center">
            <Delete />
          </Box>
        }
      >
        <Typography>{t("deleteStore")}</Typography>
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <Typography fontWeight="bold">{t("DeleteStore")}</Typography>
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
            {t("allZITStoresAppearsHerePleaseSelectAStoreToDelete")}
          </Typography>
          <Box display="flex" flexDirection="column" gap={MAIN_GAP}>
            <Typography fontWeight="bold">{t("selectStore")}</Typography>
            <StyledAutocomplete
              options={filteredUsers}
              getOptionLabel={(option: unknown) => (option as UserData).Store}
              onChange={(event, newValue) =>
                setSelectedUser(newValue as UserData)
              }
              renderInput={(params) => (
                <TextField placeholder={t("chooseAStore")} {...params} />
              )}
            />

            <FormControl variant="standard" fullWidth>
              <InputLabel
                shrink
                htmlFor="bootstrap-input"
                sx={{ width: "100%" }}
              >
                <Typography fontWeight="bold">{t("storeName")}</Typography>
              </InputLabel>

              <BootstrapInput
                placeholder={t("enterStoreName")}
                id="bootstrap-input"
                onChange={(e) => setStoreName(e.target.value)}
              />
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress />
            </Box>
          ) : (
            <Button
              autoFocus
              onClick={handleDeleteStore}
              variant="contained"
              sx={{ bgcolor: "red" }}
            >
              <Typography>{t("delete")}</Typography>
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
