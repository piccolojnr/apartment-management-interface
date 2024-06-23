"use client";
import AppView from "../sections/overview/view";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>
      <AppView />
    </>
  );
};

export default Dashboard;
