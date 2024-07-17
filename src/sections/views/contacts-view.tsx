import ReusableTable from "@components/table/reusable-table";
import { Column } from "./types";
import useSWR from "swr";
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ContactPerson } from "@/types/table";
import { useParams } from "react-router-dom";
import Label from "@components/label";
import { useState } from "react";
import AppModal from "@components/app-modal";
import { LoadingButton } from "@mui/lab";
import Iconify from "@components/iconify";
import { fetcher_api } from "@lib/api";

// const fetcher = async (url: string) => contacts;

export default function ContactsView() {
  const params = useParams();
  const { data } = useSWR<ContactPerson[]>(
    params.id ? `/apt/${params.id}/contact` : `/all/contact`,
    fetcher_api
  );
  const [open, setOpen] = useState(false);
  const [sms, setSms] = useState("");
  const [smsIds, setSmsIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

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
        <></>
        // <RowPopoverMenu
        //   handleDelete={() => handleDelete(row.id)}
        //   handleOpenModal={() => handleOpenModal(row.id)}
        //   handleSendSms={() => onSendSms([row.id])}
        // />
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
          title="Contacts"
          columns={columns}
          data={data || []}
          CustomTollbarIcons={[
            ({ selected }) => (
              <IconButton
                onClick={() => onSendSms(selected.map((s: any) => s.id))}
              >
                <Iconify icon="eva:phone-fill" sx={{ width: 20, height: 20 }} />
              </IconButton>
            ),
          ]}
        />
      </Container>
    </>
  );
}
