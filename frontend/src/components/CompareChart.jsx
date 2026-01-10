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

function CompareChart({ data1, data2, symbol1, symbol2, days }) {
  if (!data1?.length || !data2?.length) return null;

  const d1 = [...data1].reverse();
  const d2 = [...data2].reverse();

  const labels = d1.map((d) => d.date);

  const chartData = {
    labels,
    datasets: [
      {
        label: symbol1,
        data: d1.map((d) => d.close),
        borderColor: "#2563eb",
        tension: 0.3,
        pointRadius: 2,
      },
      {
        label: symbol2,
        data: d2.map((d) => d.close),
        borderColor: "#dc2626",
        tension: 0.3,
        pointRadius: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: { mode: "index", intersect: false },
    },
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md h-90">
      <h3 className="text-lg font-semibold mb-3">
        Price Comparison (Last {days} Days)
      </h3>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default CompareChart;
