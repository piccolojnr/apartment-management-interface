import CustomTable from "../../../components/table";
import { UserForm } from "../user-forms";

const UserPage = () => {
  return (
    <CustomTable
      AddModal={UserForm}
      UpdateModal={UserForm}
      headLabel={[
        { id: "name", label: "Name" },
        { id: "role", label: "Role" },
        { id: "is_verified", label: "Verified", align: "center" },
        { id: "status", label: "Status" },
        { id: "" },
      ]}
      title={"Users"}
      searchPlaceholder={"Search users..."}
      deleteItem={() => Promise.resolve()}
      Cell={() => <></>}
      data={[]}
      fetchData={() => {}}
      error={null}
      loading={false}
      setPage={() => {}}
      page={0}
      total={0}
    />
  );
};

export default UserPage;
