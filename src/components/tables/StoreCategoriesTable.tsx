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
import {
  BORDER_RADIUS,
  HOST,
  MAIN_PADDING,
  StoreCategoriesTableProps,
} from "../../redux/app/constants";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";

const StoreCategoriesTable = ({ categories }: StoreCategoriesTableProps) => {
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
                <Typography fontWeight="bold">{t("image")}</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography fontWeight="bold">{t("id")}</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography fontWeight="bold">{t("name")}</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => (
                <React.Fragment key={product.id}>
                  <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                    <TableCell>
                      <Box
                        p={MAIN_PADDING}
                        sx={{
                          maxHeight: "2rem",
                          maxWidth: "2rem",
                          backgroundImage: `url(${HOST}${product.Image})`,
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          alignSelf: "center",
                          borderRadius: BORDER_RADIUS,
                          bgcolor: "red",
                        }}
                      ></Box>
                    </TableCell>
                    <TableCell align="left">{product.id}</TableCell>
                    <TableCell align="left">{product.Name}</TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={categories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          overflow:'hidden'
        }}
      />
    </Paper>
  );
};

export default StoreCategoriesTable;
