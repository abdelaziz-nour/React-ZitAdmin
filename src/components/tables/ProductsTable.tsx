import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  BORDER_RADIUS,
  HOST,
  MAIN_PADDING,
  ProductsTableProps,
} from "../../redux/app/constants";

interface Column {
  id: "id" | "Name" | "Store" | "Price" | "Image";
  label: any;
  minWidth?: number;
}
export default function ProductsTable({ products }: ProductsTableProps) {
  /**
   * --------------------------------------------------------------------------------------------------
   * i18n
   */
  const { t } = useTranslation();

  /**
   * --------------------------------------------------------------------------------------------------
   * State
   */
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /**
   * --------------------------------------------------------------------------------------------------
   * Locals
   */
  const columns: readonly Column[] = [
    {
      id: "Image",
      label: <Typography>{t("image")}</Typography>,
    },
    {
      id: "id",
      label: <Typography>{t("id")}</Typography>,
      minWidth: 170,
    },
    {
      id: "Name",
      label: <Typography>{t("name")}</Typography>,
      minWidth: 170,
    },
    {
      id: "Store",
      label: <Typography>{t("storeName")}</Typography>,
      minWidth: 170,
    },
    {
      id: "Price",
      label: <Typography>{t("price")}</Typography>,
      minWidth: 170,
    },
  ];

  /**
   * --------------------------------------------------------------------------------------------------
   * Handlers
   */
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      let value = row[column.id];
                      if (column.id === "Image") {
                        return (
                          <TableCell key={column.id}>
                            <Box
                              p={MAIN_PADDING}
                              sx={{
                                maxHeight: "2rem",
                                maxWidth: "2rem",
                                backgroundImage: `url(${HOST}${row.Image})`,
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                alignSelf: "center",
                                borderRadius: BORDER_RADIUS,
                                bgcolor: "red",
                              }}
                            ></Box>
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell key={column.id}>
                          {value !== "None" && (
                            <Typography>{value.toString()}</Typography>
                          )}
                        </TableCell>
                      );
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
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          overflow: "hidden",
        }}
      />
    </Paper>
  );
}
