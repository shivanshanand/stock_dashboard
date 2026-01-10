import { useEffect, useState } from "react";
import { fetchTopMovers } from "../services/api";
import TimeRangeSelector from "../components/TimeRangeSelector";

function TopMoversSection() {
  const [days, setDays] = useState(30);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchTopMovers(days).then(setData);
  }, [days]);

  if (!data) return null;

  return (
    <div className="mt-12 bg-white/80 backdrop-blur rounded-xl border border-gray-200 p-5">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Market Movers</h2>
          <p className="text-xs text-gray-500">
            Top gainers and losers across selected period
          </p>
        </div>

        <TimeRangeSelector value={days} onChange={setDays} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gainers */}
        <div>
          <h3 className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-2">
            Top Gainers
          </h3>
          <ul className="space-y-2">
            {data.top_gainers.map((g) => (
              <li
                key={g.symbol}
                className="flex justify-between items-center px-3 py-2 rounded-md hover:bg-green-50"
              >
                <span className="font-medium text-gray-800 tracking-wide">
                  {g.symbol}
                </span>

                <span className="flex items-center gap-1 text-green-600 font-semibold">
                  ▲ {g.return_pct}%
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Losers */}
        <div>
          <h3 className="text-sm font-semibold text-red-700 uppercase tracking-wide mb-2">
            Top Losers
          </h3>
          <ul className="space-y-2">
            {data.top_losers.map((l) => (
              <li
                key={l.symbol}
                className="flex justify-between items-center px-3 py-2 rounded-md hover:bg-red-50"
              >
                <span className="font-medium text-gray-800 tracking-wide">
                  {l.symbol}
                </span>

                <span className="flex items-center gap-1 text-red-600 font-semibold">
                  ▼ {Math.abs(l.return_pct)}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TopMoversSection;
