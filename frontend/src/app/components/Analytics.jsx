import React, {  useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    users: 0,
    products: 0,
    totalSales: 0,
    totalRevenue: 0,
  });
  const [dailySalesData, setDailySalesData] = useState([
    { date: "2024-12-05", sales: 10, revenue: 200 },
    { date: "2024-12-06", sales: 15, revenue: 300 },
    { date: "2024-12-07", sales: 20, revenue: 400 },
    { date: "2024-12-08", sales: 25, revenue: 500 },
    { date: "2024-12-09", sales: 30, revenue: 600 },
    { date: "2024-12-10", sales: 35, revenue: 700 },
    { date: "2024-12-11", sales: 40, revenue: 800 },
  ]);

  const chartData = {
    labels: dailySalesData.map((data) => data.date),
    datasets: [
      {
        label: "Sales",
        data: dailySalesData.map((data) => data.sales),
        borderColor: "green",
        backgroundColor: "green",
        fill: true,
      },
      {
        label: "Revenue",
        data: dailySalesData.map((data) => data.revenue),
        borderColor: "blue",
        backgroundColor: "blue",
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Daily Sales and Revenue",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
      scales: {
        x: {
          type: "time",
          time: {
            unit: "day",
          },
        },
      },
    },
  };
  return (
    <div className=" max-w-4xl mx-auto space-y-8">
      <div className="p-4 border border-teal-500">
        <Line
          height={300}
          width={600}
          data={chartData}
          options={chartOptions}
          className="w-full"
          style={{ maxWidth: "100%" }}
        />
      </div>
      <div
        className="grid grid-cols-1
       md:grid-cols-2 
      gap-4 mb-8 border 
       border-teal-500">
        <div className="p-4">
          <h2 className="text-lg">Total Users</h2>
          <p className="text-2xl">{analyticsData.users}</p>
        </div>
        <div className="p-4">
          <h2 className="text-lg">Total Products</h2>
          <p className="text-2xl">{analyticsData.products}</p>
        </div>
        <div className="p-4">
          <h2 className="text-lg">Total Sales</h2>
          <p className="text-2xl">{analyticsData.totalSales}</p>
        </div>
        <div className="p-4">
          <h2 className="text-lg">Total Revenue</h2>
          <p className="text-2xl">${analyticsData.totalRevenue.toFixed(2)}</p>
        </div>
      </div>

      {/* Daily Sales Data Chart */}
    </div>
  );
};

export default Analytics;
