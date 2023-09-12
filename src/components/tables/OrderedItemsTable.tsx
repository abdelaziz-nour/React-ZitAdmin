import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { OrderedItemsPageProps } from "../../redux/app/constants";
import { useTranslation } from "react-i18next";

const OrderedItemsTable = ({ orderedItems }: OrderedItemsPageProps) => {
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
      <TableContainer sx={{ maxHeight: "70vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <Typography fontWeight="bold">{t("id")}</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography fontWeight="bold">{t("productName")}</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography fontWeight="bold">{t("quantity")}</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography fontWeight="bold">{t("price")}</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography fontWeight="bold">{t("subtotal")}</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderedItems
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order) => (
                <React.Fragment key={order.id}>
                  <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                    <TableCell align="left">{order.id}</TableCell>
                    <TableCell align="left">{order.ProductName}</TableCell>
                    <TableCell align="left">{order.Quantity}</TableCell>
                    <TableCell align="left">{order.Price}</TableCell>
                    <TableCell align="left">{order.Subtotal}</TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={orderedItems.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default OrderedItemsTable;
