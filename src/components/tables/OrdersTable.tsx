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
import { OrdersTableProps } from "../../redux/app/constants";
import { useTranslation } from "react-i18next";
import { Box, Button, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addOrderItems } from "../../redux/features/orderedItemsSlice";

const OrdersTable = ({ orders }: OrdersTableProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const isExpanded = (orderId: string) => expandedId === orderId;

  function StatusTextColor(status: string) {
    switch (status) {
      case "Preparing":
        return "blue";
      case "Delivered":
        return "green";
      case "OnDelivery":
        return "darkOrange";
      case "Canceled":
        return "red";
      default:
        return "";
    }
  }
  function StatusBackgroundColor(status: string) {
    switch (status) {
      case "Preparing":
        return "#ADD8E6";
      case "Delivered":
        return "#E7F8F0";
      case "OnDelivery":
        return "#FEF4E6";
      case "Canceled":
        return "#FEECEB";
      default:
        return "";
    }
  }
  const handleOrderedItemsButtonClick = (orderId: string) => {
    const clickedOrder = orders.find((order) => order.id === orderId);
    if (clickedOrder) {
        dispatch(addOrderItems(clickedOrder.OrderItems))
      navigate("/orderItems");
    }
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleExpand = (orderId: string) => {
    if (expandedId === orderId) {
      setExpandedId(null);
    } else {
      setExpandedId(orderId);
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
                <Typography fontWeight="bold">{t("id")}</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography fontWeight="bold">{t("store")}</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography fontWeight="bold">{t("orderedBy")}</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography fontWeight="bold">{t("orderDate")}</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography fontWeight="bold">{t("status")}</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography fontWeight="bold">{t("")}</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order) => (
                <React.Fragment key={order.id}>
                  <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => handleExpand(order.id)}
                      >
                        {isExpanded(order.id) ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell align="left">{order.id}</TableCell>
                    <TableCell align="left">{order.Store}</TableCell>
                    <TableCell align="left">{order.CreatedBy}</TableCell>
                    <TableCell align="left">{order.CreatedOn}</TableCell>
                    <TableCell>
                      <Chip
                        label={
                          <Typography color={StatusTextColor(order.Status)}>
                            {t(order.Status)}
                          </Typography>
                        }
                        sx={{
                          bgcolor: `${StatusBackgroundColor(order.Status)}`,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => handleOrderedItemsButtonClick(order.id)} 
                      >
                        <Typography>{t("details")}</Typography>
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={6}
                    >
                      <Collapse
                        in={isExpanded(order.id)}
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
                            {t("locationAndDetails")}
                          </Typography>
                          <Typography>{order.Location}</Typography>
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
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default OrdersTable;
