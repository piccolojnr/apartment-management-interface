import { Helmet } from "react-helmet-async";
import { devices } from "../../_mock/device";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRouter } from "../../routes/hooks";
import { Data } from "../../types/table";
import DeviceOverview from "../../sections/devices/device-overview";
import Loading from "../../components/loading";
const guageData = [
  {
    title: "Daily Usage",
    usage: 30, // Replace with actual data
    subheader: "Daily electricity consumption",
    colors: ["#1E90FF", "#ADD8E6", "#00BFFF"],
  },
  {
    title: "Weekly Usage",
    usage: 150, // Replace with actual data
    subheader: "Weekly electricity consumption",
    colors: ["#1E90FF", "#ADD8E6", "#00BFFF"],
  },
  {
    title: "Monthly Usage",
    usage: 600, // Replace with actual data
    subheader: "Monthly electricity consumption",
    colors: ["#1E90FF", "#ADD8E6", "#00BFFF"],
  },
];

const paymentSummary = [
  {
    title: "Outstanding Payments",
    total: "$100", // Replace with actual data
    color: "error",
    icon: <i className="fas fa-dollar-sign"></i>,
  },
  {
    title: "Current Billing",
    total: "$60", // Replace with actual data
    color: "success",
    icon: <i className="fas fa-file-invoice"></i>,
  },
  {
    title: "Overdue Payments",
    total: "$40", // Replace with actual data
    color: "error",
    icon: <i className="fas fa-exclamation-circle"></i>,
  },
];

const Devices = () => {
  const params = useParams();
  const router = useRouter();
  const [device, setDevice] = useState<null | Data>(null);

  useEffect(() => {
    const data = devices.find((d) => d.id.toString() === params.id);
    
    if (!data) {
      router.push("/404");
    } else {
      setDevice(data);
    }
  }, [params]);
  return (
    <>
      <Helmet>
        <title>
          {device ? `${device.apartment.name}` : "Devices"} | Minimal UI{" "}
        </title>
      </Helmet>
      {!device ? (
        <Loading />
      ) : (
        <DeviceOverview
          deviceData={device}
          guageData={guageData}
          paymentSummary={paymentSummary}
          title={`${device.apartment.name} Overview`}
        />
      )}
    </>
  );
};

export default Devices;
