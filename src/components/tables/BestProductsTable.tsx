import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  BORDER_RADIUS,
  BestProductsTableProps,
  HOST,
  MAIN_PADDING,
} from "../../redux/app/constants";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";

const BestProductsTable = ({ products }: BestProductsTableProps) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const isExpanded = (productId: string) => expandedId === productId;
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleExpand = (productId: string) => {
    if (expandedId === productId) {
      setExpandedId(null);
    } else {
      setExpandedId(productId);
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: "70vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="left">
                <Typography fontWeight="bold">{t("image")}</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography fontWeight="bold">{t("id")}</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography fontWeight="bold">{t("name")}</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography fontWeight="bold">{t("store")}</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography fontWeight="bold">{t("price")}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography fontWeight="bold">{t("orderTimes")}</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => (
                <React.Fragment key={product.id}>
                  <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => handleExpand(product.id)}
                      >
                        {isExpanded(product.id) ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </TableCell>
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
                    <TableCell align="left">{product.Store}</TableCell>
                    <TableCell align="left">{product.Price}</TableCell>
                    <TableCell align="center">{product.OrdersCount}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={6}
                    >
                      <Collapse
                        in={isExpanded(product.id)}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box sx={{ margin: 1 }}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            component="div"
                            fontWeight="bold"
                          >
                            {t("description")}
                          </Typography>
                          <Typography>{product.Description}</Typography>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
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
          overflow:'hidden'
        }}
      />
    </Paper>
  );
};

export default BestProductsTable;
