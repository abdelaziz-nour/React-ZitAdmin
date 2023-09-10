import React, { useState, useEffect } from "react";
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
import Checkbox from "@mui/material/Checkbox";
import {
  OrdersTableProps,
  OrdersExportOptions,
  StatusFilterForm,
  OrderData,
} from "../../redux/app/constants";
import { useTranslation } from "react-i18next";
import { Box, Button, Chip, Toolbar, alpha } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addOrderItems } from "../../redux/features/orderedItemsSlice";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import ExportMenu from "../menus/OrdersExportOptions";
import FilterMenu from "../menus/OrdersFilterMenu";
import Amiri from "../../../fonts/Amiri-Regular.ttf";

interface EnhancedTableToolbarProps {
  numSelected: number;
}

const OrdersTable = ({
  orders,
  storeColumn,
  searchQuery,
}: OrdersTableProps) => {
  /**
   * --------------------------------------------------------------------------------------------------
   * I18n
   */
  const { t } = useTranslation();

  /**
   * --------------------------------------------------------------------------------------------------
   * Hooks
   */
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**
   * --------------------------------------------------------------------------------------------------
   * State
   */
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [filteredRows, setFilteredRows] = useState<OrderData[]>([]);
  const [filterStatus, setFilterStatus] = useState<StatusFilterForm>({
    status: "all",
  });

  /**
   * --------------------------------------------------------------------------------------------------
   * Locals and functions
   */
  const isExpanded = (orderId: string) => expandedId === orderId;
  const isSelected = (orderId: string) => selected.indexOf(orderId) !== -1;
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
  function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected } = props;

    return (
      <Toolbar
        sx={{
          height: "6rem",
          justifyContent: "space-between",
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography variant="h6" id="tableTitle" component="div">
            {numSelected} {t("selected")}
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle" component="div">
            {t("orders")}
          </Typography>
        )}
        <Box justifyContent="end" mr={1} gap={1} display="flex">
          <FilterMenu handleFilter={handleFilter} />
          <ExportMenu handleExport={handleExport} storeColumn={storeColumn} />
        </Box>
      </Toolbar>
    );
  }

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

  const handleExpand = (
    orderId: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    // Prevent the click event from propagating to the row
    event.stopPropagation();

    if (expandedId === orderId) {
      setExpandedId(null);
    } else {
      setExpandedId(orderId);
    }
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = orders.map((order) => order.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (orderId: string) => {
    const selectedIndex = selected.indexOf(orderId);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, orderId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleOrderedItemsButtonClick = (orderId: string) => {
    const clickedOrder = orders.find((order) => order.id === orderId);
    if (clickedOrder) {
      dispatch(addOrderItems(clickedOrder.OrderItems));
      navigate("/orderItems");
    }
  };

  const handleFilter = (formData: StatusFilterForm) => {
    setFilterStatus(formData);
  };

  const handleExport = (formData: OrdersExportOptions, exportType: string) => {
    console.log(formData, exportType);
    switch (exportType) {
      case "PDF":
        handlePDFExport(formData);
        break;
      case "XLS":
        handleXLSXExport(formData);
        break;
      case "CSV":
        handleCSVExport(formData);
        break;
    }
  };

  const handleCSVExport = (exportOptions: OrdersExportOptions) => {
    if (selected.length === 0) {
      return;
    }

    // Create a CSV header row based on export options for orders
    const orderHeaderColumns = [];
    if (exportOptions.id) {
      orderHeaderColumns.push("Order ID");
    }
    if (exportOptions.orderedBy) {
      orderHeaderColumns.push("Ordered By");
    }
    if (exportOptions.orderDate) {
      orderHeaderColumns.push("Order Date");
    }
    if (exportOptions.status) {
      orderHeaderColumns.push("Status");
    }
    if (exportOptions.total) {
      orderHeaderColumns.push("Total");
    }
    const orderHeader = orderHeaderColumns.join(",");

    // Create a CSV header row for ordered items
    const orderedItemsHeader =
      exportOptions.orderedItems && "Product Name,Price,Quantity,Subtotal";

    const csvData = selected.map((id) => {
      const order = orders.find((p) => p.id === id);

      // Format the order data as a CSV row based on export options for orders
      const orderRowData = [];
      if (exportOptions.id) {
        orderRowData.push(order?.id || ""); // Use an empty string as a placeholder for undefined values
      }
      if (exportOptions.orderedBy) {
        orderRowData.push(order?.CreatedBy || ""); // Use an empty string as a placeholder for undefined values
      }
      if (exportOptions.orderDate) {
        orderRowData.push(order?.CreatedOn || ""); // Use an empty string as a placeholder for undefined values
      }
      if (exportOptions.status) {
        orderRowData.push(order?.Status || ""); // Use an empty string as a placeholder for undefined values
      }
      if (exportOptions.total) {
        // Calculate the total as the sum of selected rows' subtotals
        const selectedSubtotals = order?.OrderItems.filter((item) =>
          selected.includes(order?.id)
        )
          .map((item) => item.Subtotal)
          .reduce((acc, subtotal) => acc + subtotal, 0);

        orderRowData.push(selectedSubtotals?.toString() || ""); // Use an empty string as a placeholder for undefined values
      }

      // Format the ordered items as CSV rows
      const orderedItemRows = order?.OrderItems.map((item) => {
        return `${item.ProductName},${item.Price},${item.Quantity},${item.Subtotal}`;
      });

      // Combine order and ordered item data into a single array
      const rowData = [orderRowData.join(",")];
      if (exportOptions.orderedItems) {
        rowData.push(orderedItemRows?.join("\n") || ""); // Use an empty string as a placeholder for undefined values
      }

      return rowData.join("\n");
    });

    // Combine the headers and data rows
    const csvContent = exportOptions.orderedItems
      ? [orderHeader, orderedItemsHeader, ...csvData].join("\n\n")
      : [orderHeader, ...csvData].join("\n");

    // Use Papaparse to create a Blob object with the CSV data
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });

    // Create a temporary URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create an <a> element to trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = "Orders-Report.csv";

    // Programmatically trigger a click event on the <a> element
    a.click();

    // Release the temporary URL and clean up
    window.URL.revokeObjectURL(url);
  };

  const handlePDFExport = (exportOptions: OrdersExportOptions) => {
    if (selected.length === 0) {
      return;
    }

    // Create a new jsPDF instance
    const doc = new jsPDF();
    const amiri = "Amiri";
    doc.addFont(Amiri, amiri, "normal");
    doc.setFont(amiri);
    // Define the columns based on export options for orders
    const columns = [];
    if (exportOptions.id) {
      columns.push("Order ID");
    }
    if (storeColumn && exportOptions.store) {
      columns.push("Store");
    }
    if (exportOptions.orderedBy) {
      columns.push("Ordered By");
    }
    if (exportOptions.orderDate) {
      columns.push("Order Date");
    }
    if (exportOptions.status) {
      columns.push("Status");
    }
    if (exportOptions.total) {
      columns.push("Total");
    }

    // Create a filtered array of orders based on the selected order ids
    const selectedOrders = orders.filter((order) =>
      selected.includes(order.id)
    );

    // Define rows for the table based on the selected orders
    const rows: any = [];

    selectedOrders.forEach((order) => {
      // Format the order data as rows
      const rowData = [];
      if (exportOptions.id) {
        rowData.push(order?.id || "");
      }
      if (storeColumn && exportOptions.store) {
        rowData.push(order?.Store || "");
      }
      if (exportOptions.orderedBy) {
        rowData.push(order?.CreatedBy || "");
      }
      if (exportOptions.orderDate) {
        rowData.push(order?.CreatedOn || "");
      }
      if (exportOptions.status) {
        rowData.push(order?.Status || "");
      }
      if (exportOptions.total) {
        // Calculate the total as the sum of selected rows' subtotals
        const selectedSubtotals = order?.OrderItems.filter((item) =>
          selected.includes(order.id)
        )
          .map((item) => item.Subtotal)
          .reduce((acc, subtotal) => acc + subtotal, 0);

        rowData.push(selectedSubtotals?.toString() || "");
      }

      rows.push(rowData);

      // Format the ordered items as rows
      if (exportOptions.orderedItems) {
        const orderedItemRows = order?.OrderItems.map((item) => {
          return [
            item.ProductName || "",
            item.Price || "",
            item.Quantity || "",
            item.Subtotal || "",
          ];
        });

        // Push the header row with a blue background color
        rows.push([
          {
            content: "Product Name",
            styles: {
              fillColor: [0, 125, 125], // Blue background color
              textColor: [255, 255, 255], // White text color
            },
          },
          {
            content: "Price",
            styles: {
              fillColor: [0, 125, 125], // Blue background color
              textColor: [255, 255, 255], // White text color
            },
          },
          {
            content: "Quantity",
            styles: {
              fillColor: [0, 125, 125], // Blue background color
              textColor: [255, 255, 255], // White text color
            },
          },
          {
            content: "Subtotal",
            styles: {
              fillColor: [0, 125, 125], // Blue background color
              textColor: [255, 255, 255], // White text color
            },
          },
          {
            content: "",
            styles: {
              fillColor: [0, 125, 125], // Blue background color
              textColor: [255, 255, 255], // White text color
            },
          },
          storeColumn&&{
            content: "",
            styles: {
              fillColor: [0, 125, 125], // Blue background color
              textColor: [255, 255, 255], // White text color
            },
          },
        ]);
        rows.push(...orderedItemRows);

        // Add an empty row at the end of each ordered items section
        rows.push([""]); // Add an empty row
      }
    });

    // Define the date and time
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const formattedTime = currentDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    // Add a title for the table
    const tableTitle = `${formattedDate} ${formattedTime}\n\nOrders Report`;
    const totalSum = rows
      .map((row: any) => parseFloat(row[row.length - 1]) || 0) // Extract the last column (totals) and convert to numbers
      .reduce((acc: any, total: any) => acc + total, 0); // Calculate the sum
    const totalSumRow = ["Total Sum", "", "", "", `${totalSum.toFixed(2)} SDG`]; // Adjust column count as needed
    rows.push(totalSumRow);
    // Set up the y-coordinate for the table
    let yPosition = 15;

    // Add the title to the PDF
    doc.text(tableTitle, 10, yPosition);
    yPosition += 20; // Adjust the Y position for the title

    // Add the table to the PDF
    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: yPosition,
      styles: {
        font: amiri,
      },
      headStyles: {
        fillColor: [0, 125, 125],
      },
    });

    // Save or download the PDF
    doc.save("Orders-Report.pdf");
  };

  const handleXLSXExport = (exportOptions: OrdersExportOptions) => {
    if (selected.length === 0) {
      // Show an alert or message to inform the user that no rows are selected
      return;
    }

    // Create a data array for XLSX export
    const data = selected.map((id) => {
      const order = orders.find((p) => p.id === id);

      // Create an object to store the row data
      const rowData: any = {};

      // Add columns based on export options
      if (exportOptions.id) {
        rowData["ID"] = order?.id;
      }
      if (exportOptions.orderedBy) {
        rowData["Ordered By"] = order?.CreatedBy;
      }
      if (exportOptions.orderDate) {
        rowData["Order Date"] = order?.CreatedOn;
      }
      if (exportOptions.status) {
        rowData["Status"] = order?.Status;
      }
      if (exportOptions.orderedItems) {
        // Add the subtable (ordered items) as a nested object
        rowData["Ordered Items"] = order?.OrderItems.map((item) => ({
          Name: item.ProductName,
          Price: item.Price,
          Quantity: item.Quantity,
        }));
      }

      return rowData;
    });

    // Create a worksheet with the data
    const ws = XLSX.utils.json_to_sheet(data, { header: [] });

    // Create a new workbook and add the worksheet to it
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Orders Report");

    // Generate an ArrayBuffer containing the XLSX data
    const arrayBuffer = XLSX.write(wb, { type: "array" });

    // Convert ArrayBuffer to Blob
    const blob = new Blob([arrayBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Create a temporary URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create an <a> element to trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders-report.xlsx";

    // Programmatically trigger a click event on the <a> element
    a.click();

    // Release the temporary URL and clean up
    window.URL.revokeObjectURL(url);
  };

  /**
   * --------------------------------------------------------------------------------------------------
   * UseEffects
   */

  useEffect(() => {
    let filteredData: OrderData[] = [...orders];

    // Filter based on the status
    if (filterStatus.status !== "all") {
      if (filterStatus) {
        filteredData = filteredData.filter(
          (row) => row.Status === filterStatus.status
        );
      }
    }

    // Filter based on the search query
    if (searchQuery) {
      filteredData = filteredData.filter((row) =>
        row.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
      console.log(filteredData);
    }

    setFilteredRows(
      filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  }, [filterStatus, page, rowsPerPage, searchQuery]);

  return (
    <Paper>
      <EnhancedTableToolbar numSelected={selected.length} />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selected.length > 0 && selected.length < orders.length
                  }
                  checked={selected.length === orders.length}
                  onChange={handleSelectAllClick}
                  inputProps={{ "aria-label": "select all orders" }}
                />
              </TableCell>
              <TableCell>{t("id")}</TableCell>
              {storeColumn && <TableCell>{t("store")}</TableCell>}
              <TableCell>{t("orderedBy")}</TableCell>
              <TableCell>{t("orderDate")}</TableCell>
              <TableCell>{t("status")}</TableCell>
              <TableCell></TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order) => {
                const isItemSelected = isSelected(order.id);
                const labelId = `enhanced-table-checkbox-${order.id}`;

                return (
                  <React.Fragment key={order.id}>
                    <TableRow
                      hover
                      onClick={() => handleClick(order.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell>{order.id}</TableCell>
                      {storeColumn && <TableCell>{order.Store}</TableCell>}
                      <TableCell>{order.CreatedBy}</TableCell>
                      <TableCell>{order.CreatedOn}</TableCell>
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
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          onClick={() =>
                            handleOrderedItemsButtonClick(order.id)
                          }
                        >
                          {t("details")}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={(event) => handleExpand(order.id, event)}
                        >
                          {isExpanded(order.id) ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={8}
                      >
                        <Collapse
                          in={isExpanded(order.id)}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box margin={1}>
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
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredRows.length}
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

export default OrdersTable;
