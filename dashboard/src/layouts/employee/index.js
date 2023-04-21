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
import { Box, CircularProgress, Icon, IconButton, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import EmployeeTable from "./EmployeeTable";
import DriverTable from "./DriverTable";
import NewEmployeeModal from "./New";
import ArgonProgress from "components/ArgonProgress";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function Employees() {
  const [currentTab, setCurrentTab] = useState(0)
  const [openNewModal, setOpenNewModal] = useState(false);
  const [reloading, setReloading] = useState(false)

  const onOpenNewModal = () => {
    setOpenNewModal(true)
  }

  const onCloseNewModal = () => {
    setOpenNewModal(false)
  }

  const handleTabChange = (event, value) => {
    setCurrentTab(value);
  };

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
                Employees table
                <IconButton
                  size="small"
                  onClick={onOpenNewModal}
                  sx={{ p: 0, ml: 1 }}
                >
                  <Icon>add</Icon>
                </IconButton>
              </ArgonTypography>
              <Tabs sx={{ backgroundColor: "#fff" }} value={currentTab} onChange={handleTabChange} aria-label="basic tabs example">
                <Tab label="Employees" id={0} sx={{ width: 100 }} />
                <Tab label="Drivers" id={1} sx={{ width: 100 }} />
              </Tabs>
            </ArgonBox>
            {reloading
              ? (
                <ArgonBox sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "400px" }}>
                  <CircularProgress color="success" />
                </ArgonBox>
              )
              : (
                <>
                  <TabPanel value={currentTab} index={0}>
                    <EmployeeTable />
                  </TabPanel>
                  <TabPanel value={currentTab} index={1}>
                    <DriverTable />
                  </TabPanel>
                </>
              )
            }
          </Card>
        </ArgonBox>
      </ArgonBox>
      <NewEmployeeModal handleClose={onCloseNewModal} open={openNewModal} refresh={refresh} />
      <Footer />
    </DashboardLayout>
  );
}

export default Employees;
