// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";

// Argon Dashboard 2 MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DetailedStatisticsCard from "examples/Cards/StatisticsCards/DetailedStatisticsCard";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Argon Dashboard 2 MUI base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import Slider from "layouts/dashboard/components/Slider";

import { useEffect, useState } from "react";
import { revenueByYear } from "services/stats";
import { revenueByMonth } from "services/stats";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";

const initialData = {
  revenue: new Array(12).fill(0),
  order: new Array(12).fill(0),
  totalRevenue: 0,
  totalOrder: 0
}

function Default() {
  const { size } = typography;

  const [yearData, setYearData] = useState(initialData)
  const [monthData, setMonthData] = useState(initialData)

  const [revenueChart, setRevenueChart] = useState('year')
  const [ordersChart, setOrdersChart] = useState('year')

  useEffect(() => {
    (async () => {
      const yearStats = await revenueByYear(new Date().getFullYear())
      const monthStats = await revenueByMonth(new Date().getFullYear(), new Date().getMonth() + 1)

      if (yearStats)
        setYearData({
          ...yearStats,
          revenue: yearStats.revenue.map(item => item / 1000000)
        })
      if (monthStats) setMonthData({
        ...monthStats,
        revenue: monthStats.revenue.map(item => item / 1000000)
      })
    })()
  }, [])

  const renderRevenueData = () => {
    if (revenueChart === 'year')
      return {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "Revenue (mil-VND)",
            color: "info",
            data: yearData.revenue
          },
        ],
      }

    return {
      labels: monthData.day,
      datasets: [
        {
          label: "Revenue (mil-VND)",
          color: "info",
          data: monthData.revenue
        },
      ],
    }
  }

  const renderOrderData = () => {
    if (ordersChart === 'year')
      return {
        labels: yearData.month,
        datasets: [
          {
            label: "Revenue (mil-VND)",
            color: "error",
            data: yearData.revenue
          },
        ],
      }

    return {
      labels: monthData.day,
      datasets: [
        {
          label: "Revenue (mil-VND)",
          color: "error",
          data: monthData.revenue
        },
      ],
    }
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="Total revenue"
              count={Intl.NumberFormat().format(yearData.totalRevenue)}
              icon={{ color: "info", component: <i className="ni ni-money-coins" /> }}
              percentage={{ color: "success", text: "In this year" }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="Total orders"
              count={Intl.NumberFormat().format(yearData.totalOrder)}
              icon={{ color: "error", component: <i className="ni ni-world" /> }}
              percentage={{ color: "success", text: "In this year" }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="Recent revenue"
              count={Intl.NumberFormat().format(monthData.totalRevenue)}
              icon={{ color: "success", component: <i className="ni ni-paper-diploma" /> }}
              percentage={{ color: "error", text: "Since last month" }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="Recent orders"
              count={Intl.NumberFormat().format(monthData.totalOrder)}
              icon={{ color: "warning", component: <i className="ni ni-cart" /> }}
              percentage={{ color: "success", text: "Since last month" }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} mb={3}>
          
          <Grid item xs={12} lg={5}>
            <Slider />
          </Grid>
          <Grid item xs={12} lg={7}>
            <GradientLineChart
              title="Revenue Overview"
              chart={renderRevenueData()}
              onChangeTab={(tab) => setRevenueChart(tab)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={5}>
          <Grid item xs={12} lg={12}>
          <VerticalBarChart
              title="Order Overview"
              chart={renderOrderData()}
              onChangeTab={(tab) => setOrdersChart(tab)}
            />
          </Grid>
        </Grid>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Default;
