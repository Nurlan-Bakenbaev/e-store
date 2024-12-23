import React, { useEffect, useState } from "react";
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
import axios from "@/lib/axios";
import LoadingSpinner from "./LoadingSpinner";
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
  const [dailySalesData, setDailySalesData] = useState([]);
  const [loading, setLoading] = useState(true);

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
    },
  };

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get("/analytics");
        setAnalyticsData(response.data.analyticsData);
        setDailySalesData(response.data.dailySalesData);
      } catch (error) {
        console.error(error, "error fetching analytics data");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalyticsData();
  }, []);
  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className=" max-w-4xl mx-auto space-y-8">
      <div
        className="grid grid-cols-1
       md:grid-cols-2 
      gap-2 border 
       border-teal-500">
        <div className="p-2">
          <h2 className="text-md">Total Users</h2>
          <p>{analyticsData.users}</p>
        </div>
        <div className="p-2">
          <h2 className="text-md">Total Products</h2>
          <p>{analyticsData.products}</p>
        </div>
        <div className="p-2">
          <h2 className="text-md">Total Sales</h2>
          <p>{analyticsData.totalSales}</p>
        </div>
        <div className="p-2">
          <h2 className="text-md">Total Revenue</h2>
          <p>${analyticsData.totalRevenue.toFixed(2)}</p>
        </div>
      </div>
      {/* Daily Sales Data Chart */}
      <div className="p-4 border border-teal-500">
        <Line
          height={300}
          width={600}
          data={chartData}
          options={chartOptions}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Analytics;
