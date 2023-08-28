import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import { theme } from "../../themes";
import { Chip, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { UsersTableProps } from "../../redux/app/constants"; 

export default function UsersTable({ users }: UsersTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { t } = useTranslation();

  interface Column {
    id: "UserName" | "Email" | "Store" | "StoreID" | "StoreDeletion";
    label: any;
    minWidth?: number;
  }

  const columns: readonly Column[] = [
    {
      id: "UserName",
      label: <Typography>{t("username")}</Typography>,
      minWidth: 170,
    },
    {
      id: "Email",
      label: <Typography>{t("email")}</Typography>,
      minWidth: 100,
    },
    {
      id: "Store",
      label: <Typography>{t("storeName")}</Typography>,
      minWidth: 170,
    },
    {
      id: "StoreID",
      label: <Typography>{t("storeId")}</Typography>,
      minWidth: 170,
    },
    {
      id: "StoreDeletion",
      label: <Typography>{t("status")}</Typography>,
      minWidth: 170,
    },
  ];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function StatusTextColor(status: boolean) {
    switch (status) {
      case false:
        return "green";
      case true:
        return "red";
      default:
        return "";
    }
  }
  function StatusBackgroundColor(status: boolean) {
    switch (status) {
      case false:
        return "#E7F8F0";
      case true:
        return "#FEECEB";
      default:
        return "default";
    }
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  sx={{
                    bgcolor: theme.palette.primary.light,
                    color: theme.palette.text.secondary,
                  }}
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.Email}>
                    {columns.map((column) => {
                      let value = row[column.id];
                      if (
                        column.id === "StoreDeletion" &&
                        row.StoreID === "None"
                      ) {
                        value = "None";
                      }
                      if (
                        column.id === "StoreDeletion" &&
                        row.Store !== "None"
                      ) {
                        return (
                          <TableCell key={column.id}>
                            <Chip
                              label={
                                <Typography
                                  color={StatusTextColor(row.StoreDeletion)}
                                >
                                  {row.StoreDeletion === false &&
                                  row.Store !== "None"
                                    ? t("active")
                                    : t("banned")}
                                </Typography>
                              }
                              sx={{
                                bgcolor: `${StatusBackgroundColor(
                                  row.StoreDeletion
                                )}`,
                              }}
                            />
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell key={column.id}>
                            {value !== "None" && (
                              <Typography>{value.toString()}</Typography>
                            )}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
