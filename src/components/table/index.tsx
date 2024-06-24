import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";

import Iconify from "../../components/iconify";
import Scrollbar from "../../components/scrollbar";
import { User } from "../../types/user";
import AppModal from "../../components/app-modal";
import TableToolbar from "../../components/table/table-toolbar";
import CustomTableHead from "../../components/table/table-head";
import {
  TableError,
  TableLoading,
  TableNoData,
} from "../../components/table/table-no-data";
import TableEmptyRows from "../../components/table/table-empty-rows";
import { emptyRows } from "../../utils/table";
import CustomTableRow from "../../components/table/table-row";
import { CustomTableProps, Data, FilterProps } from "../../types/table";

const CustomTable = <T extends object>({
  AddModal,
  head,
  UpdateModal,
  headLabel,
  title,
  filters,
  deleteItem,
  Cell,
  data,
  fetchData,
  error,
  loading,
  total = 0,
  page = 0,
  setPage,
  order = "asc",
  orderBy = "",
  setOrder,
  setOrderBy,
  filter = { id: "all", name: "All" },
  setFilter,
  query = "",
  setQuery,
}: CustomTableProps<T>) => {
  const [selected, setSelected] = useState<Data[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [notFound, setNotFound] = useState(false);
  const [dataFiltered, setDataFiltered] = useState<Data[]>([]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = async () => {
    setOpen(false);
    fetchData();
  };

  const handleSort = (event: any, id: any) => {
    const isAsc = orderBy === id && order === "asc";
    setOrder && setOrder(isAsc ? "desc" : "asc");
    setOrderBy && setOrderBy(id);
  };

  useEffect(() => {
    setDataFiltered(data || []);
  }, [data]);

  useEffect(() => {
    setNotFound(!dataFiltered.length && !!filter.name);
  }, [filter, dataFiltered]);

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      setSelected(dataFiltered);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: any, item: Data) => {
    const selectedIndex = selected.indexOf(item);
    let newSelected: Data[] = [];
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

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilter = (event: any) => {
    setQuery && setPage(0);
    setQuery && setQuery(event.target.value);
  };

  const updateSingleData = (data: Data) => {
    const index = dataFiltered.findIndex((item) => item.id === data.id);
    const newData = [...dataFiltered];
    newData[index] = data;
    setDataFiltered(newData);
  };

  const handleDelete = async (item: Data) => {
    if (deleteItem) {
      await deleteItem(item.id);
    }
    setDataFiltered((prev) => prev.filter((x) => x.id !== item.id));
    setSelected((prev) => prev.filter((x) => x.id !== item.id));
  };

  const handleChangeFilterName = (item: FilterProps<T>) =>
    setFilter && setFilter(item);

  return (
    <Container>
      {head ? (
        head
      ) : (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4">{title}</Typography>
          {AddModal ? (
            <>
              <Button
                variant="contained"
                color="inherit"
                startIcon={<Iconify icon="eva:plus-fill" />}
                onClick={handleOpen}
              >
                New {title.slice(0, -1)}
              </Button>
              <AppModal handleClose={handleClose} open={open}>
                <AddModal handleClose={handleClose} />
              </AppModal>
            </>
          ) : null}
        </Stack>
      )}

      <Card>
        <TableToolbar
          numSelected={selected.length}
          query={query}
          onFilter={handleFilter}
          setFilter={setFilter}
          onDelete={handleDelete}
          selected={selected}
          filters={filters}
          title={title}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: "unset" }}>
            <Table sx={{ minWidth: 800 }}>
              <CustomTableHead
                order={order}
                orderBy={orderBy}
                rowCount={dataFiltered.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={headLabel}
              />
              <TableBody>
                {!loading &&
                  !error &&
                  dataFiltered.map((row, index) => (
                    <CustomTableRow
                      key={index}
                      data={row}
                      fetchData={fetchData}
                      selected={selected.indexOf(row) !== -1}
                      handleClick={(event: any) => handleClick(event, row)}
                      UpdateModal={UpdateModal}
                      updateSingleData={updateSingleData}
                      onDelete={handleDelete}
                      Cell={Cell}
                    />
                  ))}
                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, total)}
                />

                {!loading && error && <TableError />}
                {!loading && notFound && <TableNoData query={filter.name} />}
                {loading && <TableLoading />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={!total || total <= 0 ? 0 : page}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
};

export default CustomTable;
