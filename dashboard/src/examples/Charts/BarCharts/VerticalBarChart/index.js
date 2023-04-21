import { useMemo } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
import { Bar } from "react-chartjs-2";

// @mui material components
import Card from "@mui/material/Card";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// VerticalBarChart configurations
import configs from "examples/Charts/BarCharts/VerticalBarChart/configs";

// Argon Dashboard 2 MUI base styles
import colors from "assets/theme/base/colors";

function VerticalBarChart({ title, description, height, chart, onChangeTab }) {
  const chartDatasets = chart.datasets
    ? chart.datasets.map((dataset) => ({
      ...dataset,
      weight: 5,
      borderWidth: 0,
      borderRadius: 4,
      backgroundColor: colors[dataset.color]
        ? colors[dataset.color || "dark"].main
        : colors.dark.main,
      fill: false,
      maxBarThickness: 35,
    }))
    : [];

  const { data, options } = configs(chart.labels || [], chartDatasets);

  const renderChart = (
    <ArgonBox p={2}>
      {title || description ? (
        <ArgonBox px={description ? 1 : 0} pt={description ? 1 : 0}>
          {title && (
            <ArgonBox mb={1} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <ArgonTypography variant="h6">{title}</ArgonTypography>
              <ArgonBox sx={{ display: 'flex' }}>
                <ArgonTypography
                  variant="caption"
                  color="secondary"
                  fontWeight="medium"
                  sx={{
                    px: 1,
                    cursor: 'pointer',
                    borderRight: '1px solid #dcdcdc',
                    lineHeight: '26px'
                  }}
                  onClick={() => onChangeTab('year')}
                >
                  Year
                </ArgonTypography>
                <ArgonTypography
                  variant="caption"
                  color="secondary"
                  fontWeight="medium"
                  sx={{
                    px: 1,
                    cursor: 'pointer',
                    lineHeight: '26px'
                  }}
                  onClick={() => onChangeTab('month')}
                >
                  Month
                </ArgonTypography>
              </ArgonBox>
            </ArgonBox>
          )}
          <ArgonBox mb={2}>
            <ArgonTypography component="div" variant="button" fontWeight="regular" color="text">
              {description}
            </ArgonTypography>
          </ArgonBox>
        </ArgonBox>
      ) : null}
      {useMemo(
        () => (
          <ArgonBox height={height}>
            <Bar data={data} options={options} />
          </ArgonBox>
        ),
        [chart, height]
      )}
    </ArgonBox>
  );

  return title || description ? <Card>{renderChart}</Card> : renderChart;
}

// Setting default values for the props of VerticalBarChart
VerticalBarChart.defaultProps = {
  title: "",
  description: "",
  height: "19.125rem",
};

// Typechecking props for the VerticalBarChart
VerticalBarChart.propTypes = {
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  chart: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default VerticalBarChart;
