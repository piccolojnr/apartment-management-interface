import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Toolbar,
  Typography,
  Box,
  TextField,
  Checkbox,
  Stack,
  Tooltip,
  IconButton,
} from "@mui/material";
import Iconify from "../iconify";

import { Device, FilterProps } from "@/types/table";
import {
  CustomTableToolbarProps,
  ReusableTableProps,
} from "@sections/views/types";
const getNestedValue = (obj: any, path: string) => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};
const ReusableTable: React.FC<ReusableTableProps> = ({
  columns,
  data,
  onClickRow,
  CustomTollbarIcons,
  title = "Table",
  filters,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>(data);
  const [selected, setSelected] = useState<any[]>([]);

  const [filter, setFilter] = useState<FilterProps<Device>>({
    id: "all",
    name: "All",
  });

  useEffect(() => {
    if (filter && filter.id !== "all" && filter.field) {
      setFilteredData(
        data.filter(
          (d) => getNestedValue(d, filter.field ?? "") === filter.value
        )
      );
    } else setFilteredData(data);
  }, [filter, data]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      setFilteredData(
        data.filter((row) =>
          columns.some((column) =>
            row[column.field]?.toString().toLowerCase().includes(lowerCaseQuery)
          )
        )
      );
    } else {
      setFilteredData(data);
    }
  };
  const handleClick = (event: any, item: any) => {
    const selectedIndex = selected.indexOf(item);
    let newSelected: any[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, item);
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

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      setSelected(filteredData);
      return;
    }
    setSelected([]);
  };

  const isSelected = (item: any) => selected.indexOf(item) !== -1;

  return (
    <>
      {/* sms modal */}

      <CustomTableToolbar
        title={title}
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        selected={selected}
        CustomTollbarIcons={CustomTollbarIcons}
        filter={filter}
        filters={filters}
        setFilter={setFilter}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  disableRipple
                  indeterminate={
                    selected.length > 0 && selected.length < filteredData.length
                  }
                  checked={selected.length === filteredData.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  sx={{
                    p: 1,
                    textWrap: "nowrap",
                    // overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                  align={column.align || "left"}
                >
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow
                hover
                tabIndex={-1}
                role="checkbox"
                selected={isSelected(row)}
                key={row.id}
                onClick={() => onClickRow && onClickRow(row)}
                sx={{
                  cursor: onClickRow ? "pointer" : "default",
                }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    disableRipple
                    checked={isSelected(row)}
                    onClick={(event) => handleClick(event, row)}
                  />
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.field}
                    sx={{ p: 1, overflow: "hidden" }}
                    align={column.align || "left"}
                  >
                    {column.renderCell
                      ? column.renderCell(row[column.field], row)
                      : row[column.field]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

function CustomTableToolbar({
  title,
  searchQuery,
  handleSearch,
  selected,
  CustomTollbarIcons,
  filters,
}: CustomTableToolbarProps) {
  return (
    <Toolbar
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        p: (theme) => theme.spacing(0, 1, 0, 0),
        ...(selected.length > 0 && {
          color: "primary.main",
          bgcolor: "primary.lighter",
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          borderTopLeftRadius: (theme) => theme.shape.borderRadius,
          borderTopRightRadius: (theme) => theme.shape.borderRadius,
        }),
      }}
    >
      {selected.length > 0 ? (
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent={"space-between"}
          sx={{ width: "100%" }}
        >
          <Typography component="div" variant="subtitle1">
            {selected.length} selected
          </Typography>
          <Stack direction="row">
            {CustomTollbarIcons &&
              CustomTollbarIcons.map((Icon, index) => (
                <Icon selected={selected} key={index} />
              ))}
          </Stack>
        </Stack>
      ) : (
        <>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Iconify
              icon="eva:search-fill"
              sx={{ color: "text.disabled", width: 20, height: 20 }}
            />
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              sx={{ marginLeft: 1 }}
            />
          </Box>
          {filters && (
            <Tooltip title="Filter list">
              <IconButton onClick={() => {}}>
                <Iconify icon="ic:round-filter-list" />
              </IconButton>
            </Tooltip>
          )}
        </>
      )}
      {filters && (
        <></>
        // <FiltersPopover
        //   open={open}
        //   filters={filters}
        //   handleClose={handleClose}
        //   setFilter={setFilter}
        //   filter={filter}
        // />
      )}
    </Toolbar>
  );
}

export default ReusableTable;
