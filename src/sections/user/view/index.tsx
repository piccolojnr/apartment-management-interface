import CustomTable from "../../../components/table";
import UserCells from "../../../components/table/cells/user-cells";
const UserPage = () => {
  return (
    <CustomTable
      headLabel={[
        { id: "name", label: "Name" },
        { id: "role", label: "Role" },
        { id: "is_verified", label: "Verified", align: "center" },
        { id: "status", label: "Status" },
        { id: "" },
      ]}
      title={"Users"}
      searchPlaceholder={"Search users..."}
      Cells={UserCells}
      data={[]}
    />
  );
};

export default UserPage;
