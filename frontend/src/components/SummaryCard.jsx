import React from "react";

function SummaryCard({ stockData, summary }) {
  if (!stockData || stockData.length === 0) return null;

  const latest = stockData[0];

  const returnColor =
    latest.daily_return_pct >= 0 ? "text-green-600" : "text-red-600";

  let direction = "neutral";
  if (latest.close > latest.ma_7 && latest.daily_return_pct > 0) {
    direction = "bullish";
  } else if (latest.close < latest.ma_7 && latest.daily_return_pct < 0) {
    direction = "bearish";
  }

  const directionBadge = {
    bullish: "bg-green-50 text-green-700",
    bearish: "bg-red-50 text-red-700",
    neutral: "bg-gray-50 text-gray-700",
  };

  const formatPrice = (value) => (value ? `₹ ${value.toFixed(2)}` : "—");

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-gray-900">{latest.symbol}</h2>

        <span
          className={`px-2 py-1 rounded text-xs font-medium ${directionBadge[direction]}`}
        >
          {direction.toUpperCase()}
        </span>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-xs uppercase text-gray-400">Current Price</p>
          <p className="font-bold text-lg">{formatPrice(latest.close)}</p>
        </div>

        <div>
          <p className="text-gray-500">30-Day Return (%)</p>
          <p className={`font-semibold ${returnColor}`}>
            {latest.daily_return_pct.toFixed(2)}%
          </p>
        </div>

        <div>
          <p className="text-gray-500">7-Day Volatility</p>
          <p className="font-medium">{(latest.volatility * 100).toFixed(2)}%</p>
        </div>

        {summary && (
          <div>
            <p className="text-gray-500">52-Week Range</p>
            <p className="font-medium">
              {formatPrice(summary["52_week_low"])} —{" "}
              {formatPrice(summary["52_week_high"])}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SummaryCard;
