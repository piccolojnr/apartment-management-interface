import { useEffect, useState } from "react";
import { fetcher } from "@lib/api";
import useSWR from "swr";
import { BillSession, Device, FilterProps, UtilityType } from "@/types/table";
import AppModal from "@components/app-modal";
import { AddBill } from "../settings/forms";
import ReusableTable from "@components/table/reusable-table";

const filters: FilterProps<any>[] = [
  {
    id: "all",
    name: "All",
  },
  {
    id: "1",
    name: "power devices",
    field: "deviceType.deviceType",
    value: "power",
  },
  {
    id: "2",
    name: "water devices",
    field: "deviceType.deviceType",
    value: "water",
  },
];
function PickDevice({
  utilityType,
  billSession,
}: {
  utilityType?: UtilityType;
  billSession?: BillSession;
}) {
  const [currentDevice, setCurrentDevice] = useState<Device>();
  const { data, mutate } = useSWR<Device[]>(
    `/apt/bill/session/${billSession?.id}/utility/type/${utilityType?.id}/unbilled/devices/`,
    utilityType ? fetcher : () => []
  );
  const [open, setOpen] = useState(false);
  const [bill, setBill] = useState<any>({
    apartment: {
      floor: 0,
      id: 0,
      name: "",
    },
    billSession,
    utilityType,
    consumption: null,
    reading: null,
  });

  useEffect(() => {
    if (utilityType && billSession) {
      mutate();
      setBill({
        ...bill,
        billSession,
        utilityType,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [utilityType, billSession]);

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => {
    setOpen(false);
  };
  const deleteDevice = async () => {
    if (currentDevice && data) {
      mutate(data.filter((x) => x.id !== currentDevice.id));
      setCurrentDevice(undefined);
      handleCloseModal();
    }
  };

  const handleClickRow = (device: Device) => {
    setCurrentDevice(device);
    setBill({
      ...bill,
      device: { id: device.id },
      apartment: device.apartment,
    });
    handleOpenModal();
  };
  return (
    <>
      <AppModal open={open} handleClose={handleCloseModal}>
        <AddBill data={bill} onClose={deleteDevice} />
      </AppModal>
      <ReusableTable
        columns={[
          { field: "id", headerName: "ID" },
          { field: "deviceName", headerName: "Name" },
          {
            field: "apartment",
            headerName: "Apartment",
            renderCell: (value, row) => row.apartment.name,
          },
          {
            field: "utilityType",
            headerName: "Utility Type",
            renderCell: (value, row) => row.utilityType.utilityType,
          },
        ]}
        data={data || []}
        onClickRow={handleClickRow}
        filters={filters}
      />
    </>
  );
}

export default PickDevice;
