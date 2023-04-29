// @mui material components
import Card from "@mui/material/Card";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Data
import UserTable from "./UserTable";
import { CircularProgress, Icon, IconButton } from "@mui/material";
import { useState } from "react";
import NewUserModal from "./New";

function Users() {
  const [openNewModal, setOpenNewModal] = useState(false);
  const [reloading, setReloading] = useState(false)

  const onOpenNewModal = () => {
    setOpenNewModal(true)
  }

  const onCloseNewModal = () => {
    setOpenNewModal(false)
  }

  const refresh = () => {
    setReloading(true)
    setTimeout(() => setReloading(false), 500)
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <ArgonBox mb={3}>
          <Card>
            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <ArgonTypography variant="h6">
                Users table
                <IconButton
                  size="small"
                  onClick={onOpenNewModal}
                  sx={{ p: 0, ml: 1 }}
                >
                  <Icon>add</Icon>
                </IconButton>
              </ArgonTypography>
            </ArgonBox>
            {reloading
              ? (
                <ArgonBox sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "400px" }}>
                  <CircularProgress color="success" />
                </ArgonBox>
              )
              : (
                <UserTable />
              )
            }
          </Card>
        </ArgonBox>
      </ArgonBox>
      <NewUserModal handleClose={onCloseNewModal} open={openNewModal} refresh={refresh} />
      <Footer />
    </DashboardLayout>
  );
}

export default Users;
