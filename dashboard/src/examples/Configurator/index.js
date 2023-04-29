// @mui material components
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";

// Custom styles for the Configurator
import ConfiguratorRoot from "examples/Configurator/ConfiguratorRoot";

// Argon Dashboard 2 MUI context
import {
  useArgonController,
  setOpenConfigurator,
  setDarkSidenav,
  setMiniSidenav,
  setFixedNavbar,
  setSidenavColor,
  setDarkMode,
} from "context";

function Configurator() {
  const [controller, dispatch] = useArgonController();
  const { openConfigurator, darkSidenav, miniSidenav, fixedNavbar, sidenavColor, darkMode } =
    controller;
  const sidenavColors = ["primary", "dark", "info", "success", "warning", "error"];

  const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);
  const handledarkSidenav = () => setDarkSidenav(dispatch, true);
  const handleWhiteSidenav = () => setDarkSidenav(dispatch, false);
  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleFixedNavbar = () => setFixedNavbar(dispatch, !fixedNavbar);
  const handleDarkMode = () => {
    setDarkSidenav(dispatch, !darkMode);
    setDarkMode(dispatch, !darkMode);
  };

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
      <ArgonBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={3}
        pb={0.8}
        px={3}
      >
        <ArgonBox>
          <ArgonTypography variant="h5">Argon Configurator</ArgonTypography>
          <ArgonTypography variant="body2" color="text">
            See our dashboard options.
          </ArgonTypography>
        </ArgonBox>

        <Icon
          sx={({ typography: { size, fontWeightBold }, palette: { dark, white } }) => ({
            fontSize: `${size.md} !important`,
            fontWeight: `${fontWeightBold} !important`,
            color: darkMode ? white.main : dark.main,
            stroke: darkMode ? white.main : dark.main,
            strokeWidth: "2px",
            cursor: "pointer",
            mt: 2,
          })}
          onClick={handleCloseConfigurator}
        >
          close
        </Icon>
      </ArgonBox>

      <Divider />

      <ArgonBox pt={1.25} pb={3} px={3}>
        <ArgonBox>
          <ArgonTypography variant="h6">Sidenav Colors</ArgonTypography>

          <ArgonBox mb={0.5}>
            {sidenavColors.map((color) => (
              <IconButton
                key={color}
                sx={({ borders: { borderWidth }, palette: { white, dark }, transitions }) => ({
                  width: "24px",
                  height: "24px",
                  padding: 0,
                  border: `${borderWidth[1]} solid ${white.main}`,
                  borderColor: sidenavColor === color && dark.main,
                  transition: transitions.create("border-color", {
                    easing: transitions.easing.sharp,
                    duration: transitions.duration.shorter,
                  }),
                  backgroundImage: ({ functions: { linearGradient }, palette: { gradients } }) =>
                    linearGradient(gradients[color].main, gradients[color].state),

                  "&:not(:last-child)": {
                    mr: 1,
                  },

                  "&:hover, &:focus, &:active": {
                    borderColor: dark.main,
                  },
                })}
                onClick={() => setSidenavColor(dispatch, color)}
              />
            ))}
          </ArgonBox>
        </ArgonBox>

        <ArgonBox mt={3} lineHeight={1}>
          <ArgonTypography variant="h6">Sidenav Type</ArgonTypography>
          <ArgonTypography variant="button" color="text" fontWeight="regular">
            Choose between 2 different sidenav types.
          </ArgonTypography>

          <ArgonBox
            sx={{
              display: "flex",
              mt: 2,
            }}
          >
            <ArgonButton
              color="info"
              variant={darkSidenav ? "outlined" : "gradient"}
              onClick={handleWhiteSidenav}
              fullWidth
            >
              White
            </ArgonButton>
            <ArgonButton
              color="info"
              variant={darkSidenav ? "gradient" : "outlined"}
              onClick={handledarkSidenav}
              fullWidth
              sx={{
                ml: 1,
              }}
            >
              Dark
            </ArgonButton>
          </ArgonBox>
        </ArgonBox>
        <ArgonBox display="flex" justifyContent="space-between" mt={3} lineHeight={1}>
          <ArgonTypography variant="h6">Navbar Fixed</ArgonTypography>

          <Switch checked={fixedNavbar} onChange={handleFixedNavbar} />
        </ArgonBox>

        <Divider />

        <ArgonBox display="flex" justifyContent="space-between" lineHeight={1}>
          <ArgonTypography variant="h6">Sidenav Mini</ArgonTypography>

          <Switch checked={miniSidenav} onChange={handleMiniSidenav} />
        </ArgonBox>

        <Divider />
      </ArgonBox>
    </ConfiguratorRoot>
  );
}

export default Configurator;
