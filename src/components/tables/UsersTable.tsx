import {
  Chip,
  alpha,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";
import { useEffect, useState } from "react";
import FilterMenu from "../menus/UsersFilterMenu";
import { useTranslation } from "react-i18next";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import {
  UsersExportOptions,
  UserData,
  UsersTableProps,
  StatusFilterForm,
} from "../../redux/app/constants";
import ExportMenu from "../menus/UsersExportMenu";
import Amiri from "../../../fonts/Amiri-Regular.ttf";

interface HeadCell {
  disablePadding: boolean;
  id: keyof UserData;
  label: any;
}
interface EnhancedTableToolbarProps {
  numSelected: number;
}
const UsersTable = ({ users, searchQuery }: UsersTableProps) => {
  /**
   * --------------------------------------------------------------------------------------------------
   * i18n
   */
  const { t } = useTranslation();

  /**
   * --------------------------------------------------------------------------------------------------
   * State
   */
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof UserData>("id");
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredRows, setFilteredRows] = useState<UserData[]>([]);
  const [filterData, setFilterData] = useState<StatusFilterForm>({
    status: "all",
  });

  /**
   * --------------------------------------------------------------------------------------------------
   * Locals + Functions
   */
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
  type Order = "asc" | "desc";
  const isSelected = (productName: string) =>
    selected.indexOf(productName) !== -1;
  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): (
    a: { [key in Key]: number | string | boolean },
    b: { [key in Key]: number | string | boolean }
  ) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  const headCells: readonly HeadCell[] = [
    {
      id: "id",
      disablePadding: true,
      label: <Typography>{t("username")}</Typography>,
    },
    {
      id: "Email",
      disablePadding: false,
      label: <Typography>{t("email")}</Typography>,
    },
    {
      id: "Store",
      disablePadding: false,
      label: <Typography>{t("store")}</Typography>,
    },
    {
      id: "StoreID",
      disablePadding: false,
      label: <Typography>{t("storeId")}</Typography>,
    },
    {
      id: "StoreDeletion",
      disablePadding: false,
      label: <Typography>{t("status")}</Typography>,
    },
  ];
  interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (
      event: React.MouseEvent<unknown>,
      property: keyof UserData
    ) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
  }
  function EnhancedTableHead(props: EnhancedTableProps) {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;
    const createSortHandler =
      (property: keyof UserData) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              style={{ color: "gray" }}
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={"left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  function stableSort<T>(
    array: readonly T[],
    comparator: (a: T, b: T) => number
  ) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
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
            {t("users")}
          </Typography>
        )}
        <Box justifyContent="end" mr={1} gap={1} display="flex">
          <FilterMenu handleFilter={handleFilter} />
          <ExportMenu handleExport={handleExport} />
        </Box>
      </Toolbar>
    );
  }

  /**
   * --------------------------------------------------------------------------------------------------
   * Handlers
   */
  const handleFilter = (formData: StatusFilterForm) => {
    setFilterData(formData);
  };
  const handleExport = (formData: UsersExportOptions, exportType: string) => {
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
  const handleCSVExport = (exportOptions: UsersExportOptions) => {
    if (selected.length === 0) {
      return;
    }

    // Create a CSV header row based on export options
    const headerColumns = [];
    if (exportOptions.username) {
      headerColumns.push("Username");
    }
    if (exportOptions.email) {
      headerColumns.push("Email");
    }
    if (exportOptions.store) {
      headerColumns.push("Store");
    }
    if (exportOptions.storeId) {
      headerColumns.push("Store ID");
    }
    if (exportOptions.status) {
      headerColumns.push("Status");
    }

    const header = headerColumns.join(",");

    // Create a CSV data row for each selected row
    const csvData = selected.map((userName) => {
      // Find the corresponding user based on the UserName
      const user = users.find((p) => p.UserName === userName);

      // Format the user data as a CSV row based on export options
      const rowData = [];
      if (exportOptions.username) {
        rowData.push(user?.UserName);
      }
      if (exportOptions.email) {
        rowData.push(user?.Email);
      }
      if (exportOptions.store) {
        rowData.push(user?.Store);
      }
      if (exportOptions.storeId) {
        rowData.push(user?.StoreID);
      }
      if (exportOptions.status) {
        rowData.push(user?.StoreDeletion === false ? "Active" : "Banned");
      }
      return rowData.join(",");
    });
    // Combine the header and data rows
    const csvContent = [header, ...csvData].join("\n");
    // Create a Blob object with the CSV data
    const blob = new Blob([new TextEncoder().encode(csvContent)], {
      type: "text/csv;charset=utf-8",
    });
    // Create a temporary URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create an <a> element to trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = "Users-Report.csv";

    // Programmatically trigger a click event on the <a> element
    a.click();

    // Release the temporary URL and clean up
    window.URL.revokeObjectURL(url);
  };
  const handlePDFExport = (exportOptions: UsersExportOptions) => {
    if (selected.length === 0) {
      // Show an alert or message to inform the user that no rows are selected
      return;
    }

    // Create a new jsPDF instance
    const doc = new jsPDF();
    const amiri = "Amiri";
    doc.addFont(Amiri, amiri, "normal");
    doc.setFont(amiri);


    // Define an array to store the columns and an array for the rows
    const columns = [];
    const rows: any[] = [];

    // Define the columns based on export options
    if (exportOptions.username) {
      columns.push({ header: "Username", dataKey: "UserName" });
    }
    if (exportOptions.email) {
      columns.push({ header: "Email", dataKey: "Email" });
    }
    if (exportOptions.store) {
      columns.push({ header: "Store", dataKey: "Store" });
    }
    if (exportOptions.storeId) {
      columns.push({ header: "Store ID", dataKey: "StoreID" });
    }
    if (exportOptions.status) {
      columns.push({ header: "Status", dataKey: "Status" });
    }

    // Create a filtered array of users based on the selected user names
    const selectedUsers = users.filter((user) =>
      selected.includes(user.UserName)
    );

    // Define rows for the table based on the selected users
    selectedUsers.forEach((user) => {
      const rowData: any = {};

      // Define the data for each column based on export options
      if (exportOptions.username) {
        rowData["UserName"] = user?.UserName;
      }
      if (exportOptions.email) {
        rowData["Email"] = user?.Email;
      }
      if (exportOptions.store) {
        rowData["Store"] = user?.Store;
      }
      if (exportOptions.storeId) {
        rowData["StoreID"] = user?.StoreID;
      }
      if (exportOptions.status) {
        rowData["Status"] = user?.StoreDeletion === false ? "Active" : "Banned";
      }

      rows.push(rowData);
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

    // Add a header on the center top of the PDF sheet
    const headerText = "Zit Report"; // Replace with your desired header text
    const pageWidth = doc.internal.pageSize.getWidth();
    const fontSize = 12; // Adjust the font size as needed
    const textWidth =
      (doc.getStringUnitWidth(headerText) * fontSize) /
      doc.internal.scaleFactor;
    const xPosition = (pageWidth - textWidth) / 2;
    const yPosition = 15; // Adjust the Y position as needed

    doc.text(headerText, xPosition, yPosition);

    // Add a title for the table
    const tableTitle = `${formattedDate} ${formattedTime}\n\nUsers Report`;
    doc.text(tableTitle, 10, yPosition + 10); // Adjust the Y position for the title

    // Add a table to the PDF document
    autoTable(doc, {
      columns: columns,
      body: rows, // Table data
      startY: yPosition + 30,
      styles: {
        font: amiri,
      },
      headStyles: {
        fillColor: [0, 128, 128],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
    });

    // Save or download the PDF
    doc.save("data.pdf");
  };
  const handleXLSXExport = (exportOptions: UsersExportOptions) => {
    if (selected.length === 0) {
      // Show an alert or message to inform the user that no rows are selected
      return;
    }

    // Create a worksheet with the data
    const ws = XLSX.utils.json_to_sheet(
      selected.map((UserName) => {
        // Find the corresponding user based on the UserName
        const user = users.find((p) => p.UserName === UserName);

        // Create an object to store the row data
        const rowData: any = {};

        // Format the row data based on export options
        if (exportOptions.username) {
          rowData["Username"] = user?.UserName;
        }
        if (exportOptions.email) {
          rowData["Email"] = user?.Email;
        }
        if (exportOptions.store) {
          rowData["Store"] = user?.Store;
        }
        if (exportOptions.storeId) {
          rowData["Store ID"] = user?.StoreID;
        }
        if (exportOptions.status) {
          rowData["Status"] =
            user?.StoreDeletion === false ? "Active" : "Banned";
        }

        return rowData;
      })
    );

    // Create a new workbook and add the worksheet to it
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "User Data");

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
    a.download = "exported_data.xlsx";

    // Programmatically trigger a click event on the <a> element
    a.click();

    // Release the temporary URL and clean up
    window.URL.revokeObjectURL(url);
  };
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof UserData
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = users.map((n) => n.UserName);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const handleClick = (
    event: React.MouseEvent<unknown>,
    productName: string
  ) => {
    const selectedIndex = selected.indexOf(productName);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, productName);
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
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  /**
   * --------------------------------------------------------------------------------------------------
   * useEffects
   */
  useEffect(() => {
    let filteredData: UserData[] = [...users];

    // Filter based on the status
    if (filterData.status !== "all") {
      if (filterData.status == "active") {
        filteredData = filteredData.filter(
          (row) => row.StoreDeletion === false && row.StoreID !== "None"
        );
      } else {
        filteredData = filteredData.filter((row) => row.StoreDeletion === true);
      }
    }

    // Filter based on the search query
    if (searchQuery) {
      filteredData = filteredData.filter((row) =>
        row.UserName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredRows(
      stableSort(filteredData, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      )
    );
  }, [filterData, order, orderBy, page, rowsPerPage, searchQuery]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%" }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={filteredRows.length}
            />
            <TableBody>
              {filteredRows.map((row, index) => {
                const isItemSelected = isSelected(row.UserName);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    key={row.id}
                    hover
                    onClick={(event) => handleClick(event, row.UserName)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer", borderColor: "red" }}
                  >
                    <TableCell padding="checkbox" sx={{ border: "none" }}>
                      <Checkbox
                        style={{ color: "gray" }}
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      sx={{ border: "none" }}
                    >
                      {<Typography>{row.UserName}</Typography>}
                    </TableCell>

                    <TableCell sx={{ border: "none" }} align="left">
                      {<Typography>{row.Email}</Typography>}
                    </TableCell>
                    <TableCell sx={{ border: "none" }} align="left">
                      {
                        <Typography>
                          {row.StoreID !== "None" && row.Store}
                        </Typography>
                      }
                    </TableCell>
                    <TableCell sx={{ border: "none" }} align="left">
                      {
                        <Typography>
                          {row.StoreID !== "None" && row.StoreID}
                        </Typography>
                      }
                    </TableCell>
                    <TableCell sx={{ border: "none" }}>
                      {row.StoreID !== "None" && (
                        <Chip
                          label={
                            <Typography
                              color={StatusTextColor(row.StoreDeletion)}
                            >
                              {row.StoreDeletion === false
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
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
              {/* Add empty rows logic here */}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
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
    </Box>
  );
};

export default UsersTable;
