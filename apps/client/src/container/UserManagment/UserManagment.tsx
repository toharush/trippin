import { Dialog } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useTrip } from "../../hooks";

const columns: GridColDef[] = [
  { field: "email", headerName: "Email", width: 500 },
];

interface UserManagmentProps {
  setOpen: Function;
  open: boolean;
}
const UserManagment = (props: UserManagmentProps) => {
  const { users } = useTrip();
  const { open, setOpen } = props;
  const handleClose = () => setOpen(false);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
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
    </Dialog>
  );
};

export default UserManagment;
