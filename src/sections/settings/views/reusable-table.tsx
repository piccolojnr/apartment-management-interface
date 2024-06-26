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
  IconButton,
  Stack,
} from "@mui/material";
import Iconify from "../../../components/iconify";
import { ReusableTableProps } from "./types";

const ReusableTable: React.FC<ReusableTableProps> = ({
  columns,
  data,
  onDeletion,
  onSendSms,
  title = "Table",
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>(data);
  const [selected, setSelected] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

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

  const handleDelete = async () => {
    // Implement the deletion logic here
    console.log(`Deleting ${selected.length} items`);
    // Update the data state by removing the deleted items
    setLoading(true);
    const updatedData = data.filter((item) => !selected.includes(item));
    onDeletion &&
      selected.forEach(async (s) => await Promise.resolve(onDeletion(s.id)));
    setLoading(false);

    setFilteredData(updatedData);
    setSelected([]);
  };

  const handleSendSms = async () => {
    // Implement the send sms logic here
    onSendSms && onSendSms(selected.map((s) => s.id));
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
        onDelete={handleDelete}
        onSendSms={handleSendSms}
        loading={loading}
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
              {columns.map((column) => (
                <TableCell
                  key={column.field}
                  sx={{ p: 1 }}
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
                    sx={{ p: 1 }}
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

interface CustomTableToolbarProps {
  title: string;
  searchQuery: string;
  handleSearch: (query: string) => void;
  selected: any[];
  onDelete?: () => void;
  onSendSms?: () => void;
  loading?: boolean;
}

function CustomTableToolbar({
  title,
  searchQuery,
  handleSearch,
  selected,
  onDelete,
  onSendSms,
  loading,
}: CustomTableToolbarProps) {
  return (
    <Toolbar
      sx={{
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
            {onDelete && (
              <IconButton onClick={onDelete}>
                <Iconify
                  icon={loading ? "eva:loader-2" : "eva:trash-2-fill"}
                  sx={{ color: "error.main", width: 20, height: 20 }}
                  disabled={loading}
                />
              </IconButton>
            )}
            {onSendSms && (
              <IconButton onClick={onSendSms}>
                <Iconify icon="eva:phone-fill" sx={{ width: 20, height: 20 }} />
              </IconButton>
            )}
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
        </>
      )}
    </Toolbar>
  );
}

export default ReusableTable;
