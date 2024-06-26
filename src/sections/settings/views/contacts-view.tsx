import ReusableTable from "./reusable-table";
import RowPopoverMenu from "../../../components/table/row-popover-menu";
import { Column } from "./types";
import useSWR from "swr";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ContactPerson } from "../../../types/table";
import { fetcher } from "../forms/api";
import { useParams } from "react-router-dom";
import Label from "../../../components/label";
import { useState } from "react";
import AppModal from "../../../components/app-modal";
import { LoadingButton } from "@mui/lab";
// const fetcher = async (url: string) => contacts;

export default function ContactsView() {
  const params = useParams();
  const { data, mutate } = useSWR<ContactPerson[]>(
    params.id ? `/apt/apt/${params.id}/contact` : `/apt/all/contact`,
    fetcher
  );
  const [open, setOpen] = useState(false);
  const [sms, setSms] = useState("");
  const [smsIds, setSmsIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const handleDelete = (id: number) => {
    // Implement the deletion logic here
    console.log(`Deleting contacts with id ${id}`);
    // Update the data state by removing the deleted contacts
    const updatedData = data?.filter((contacts) => contacts.id !== id);
    mutate(updatedData, false);
  };

  const handleOpenModal = (id: number) => {
    // Implement the logic to open a modal for editing
    console.log(`Editing contacts with id ${id}`);
  };
  const handleSendSms = () => {
    // Implement the logic to send an SMS
    setLoading(true);
    console.log(`sending sms: ${sms} to ids ${smsIds}`);
    setLoading(false);
  };

  const onSendSms = (ids: number[]) => {
    setSmsIds(ids);
    setOpen(true);
  };

  const columns: Column[] = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name" },
    { field: "telephoneNumber", headerName: "Phone Number" },
    { field: "email", headerName: "Email" },
    {
      field: "network",
      headerName: "Network",
      renderCell(value, row) {
        return row.network.network;
      },
    },
    {
      field: "apartment",
      headerName: "Apartment",
      renderCell(value, row) {
        return row?.apartment?.name || "";
      },
    },
    {
      field: "primaryContact",
      headerName: "Primary Contact",
      renderCell: (value: any, row: any) => (
        <Label>{value ? "YES" : "NO"}</Label>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      align: "right",
      renderCell: (value: any, row: any) => (
        <RowPopoverMenu
          handleDelete={() => handleDelete(row.id)}
          handleOpenModal={() => handleOpenModal(row.id)}
          handleSendSms={() => onSendSms([row.id])}
        />
      ),
    },
  ];
  return (
    <>
      <AppModal open={open} handleClose={() => setOpen(false)}>
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Send SMS
          </Typography>
          <TextField
            variant="outlined"
            label="Message"
            multiline
            value={sms}
            onChange={(e) => setSms(e.target.value)}
            rows={4}
            fullWidth
            placeholder="Enter message here"
            sx={{ mb: 2 }}
          />
          <Stack direction="row" justifyContent="flex-end">
            <Button onClick={() => setOpen(false)} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <LoadingButton onClick={handleSendSms} loading={loading}>
              Send
            </LoadingButton>
          </Stack>
        </Box>
      </AppModal>
      <Container>
        <ReusableTable
          onSendSms={onSendSms}
          title="Contacts"
          columns={columns}
          data={data || []}
        />
      </Container>
    </>
  );
}
