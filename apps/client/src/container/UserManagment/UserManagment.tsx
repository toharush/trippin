import { Dialog } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "email", headerName: "Email", width: 500 },
];

interface UserManagmentProps {}
const UserManagment = (props: UserManagmentProps) => {
  const users = [{ id: 1, email: "test@gmail.com" }];

  return (
    <DataGrid
      rows={users}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
      checkboxSelection
    />
  );
};

export default UserManagment;
