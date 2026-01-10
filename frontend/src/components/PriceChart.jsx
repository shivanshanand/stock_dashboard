import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

function PriceChart({ stockData }) {
  if (!stockData || stockData.length === 0) return null;

  const dataPoints = [...stockData].reverse();

  const chartData = {
    labels: dataPoints.map((d) =>
      new Date(d.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      })
    ),
    datasets: [
      {
        label: "Close Price",
        data: dataPoints.map((d) => d.close),
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.08)",
        tension: 0.25,
        pointRadius: 2,
        pointHoverRadius: 4,
        fill: true,
      },
      {
        label: "7-Day Moving Average",
        data: dataPoints.map((d) => d.ma_7),
        borderColor: "#9ca3af",
        borderDash: [6, 6],
        tension: 0.25,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 10,
          boxHeight: 10,
          font: { size: 12 },
          color: "#4b5563",
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: (context) => {
            const value = context.parsed.y;
            return `${context.dataset.label}: ₹ ${value.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 8,
          color: "#6b7280",
        },
        grid: {
          display: false, 
        },
      },
      y: {
        ticks: {
          color: "#6b7280",
          callback: (value) => `₹ ${value}`,
        },
        grid: {
          color: "rgba(0,0,0,0.04)",
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 h-90">
      <h3 className="text-lg font-semibold mb-3">Price Trend</h3>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default PriceChart;
