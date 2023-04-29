import { useRef, useEffect, useState, useMemo } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
import { Line } from "react-chartjs-2";

// @mui material components
import Card from "@mui/material/Card";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI helper functions
import gradientChartLine from "assets/theme/functions/gradientChartLine";

// GradientLineChart configurations
import configs from "examples/Charts/LineCharts/GradientLineChart/configs";

// Argon Dashboard 2 MUI base styles
import colors from "assets/theme/base/colors";

function GradientLineChart({ title, description, height, chart, onChangeTab }) {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({});
  const { data, options } = chartData;

  useEffect(() => {
    const chartDatasets = chart.datasets
      ? chart.datasets.map((dataset) => ({
        ...dataset,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 3,
        borderColor: colors[dataset.color]
          ? colors[dataset.color || "dark"].main
          : colors.dark.main,
        fill: true,
        maxBarThickness: 6,
        backgroundColor: gradientChartLine(
          chartRef.current.children[0],
          colors[dataset.color] ? colors[dataset.color || "dark"].main : colors.dark.main
        ),
      }))
      : [];

    setChartData(configs(chart.labels || [], chartDatasets));
  }, [chart]);

  const renderChart = (
    <ArgonBox p={2}>
      {title || description ? (
        <ArgonBox px={description ? 1 : 0} pt={description ? 1 : 0}>
          {title && (
            <ArgonBox mb={1} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <ArgonTypography variant="h6">{title}</ArgonTypography>
              <ArgonBox sx={{ display: 'flex'}}>
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
          <ArgonBox ref={chartRef} sx={{ height }}>
            <Line data={data} options={options} />
          </ArgonBox>
        ),
        [chartData, height]
      )}
    </ArgonBox>
  );

  return title || description ? <Card>{renderChart}</Card> : renderChart;
}

// Setting default values for the props of GradientLineChart
GradientLineChart.defaultProps = {
  title: "",
  description: "",
  height: "19.125rem",
};

// Typechecking props for the GradientLineChart
GradientLineChart.propTypes = {
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  chart: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default GradientLineChart;
