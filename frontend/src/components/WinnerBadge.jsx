function WinnerBadge({ compareResult }) {
  if (!compareResult) return null;

  const { winner, comparison, period_days } = compareResult;
  const loser = Object.keys(comparison).find((s) => s !== winner);

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <h3 className="text-lg font-semibold mb-4">Performance Summary</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {Object.entries(comparison).map(([symbol, data]) => {
          const isUp = data.return_pct > 0;

          return (
            <div
              key={symbol}
              className={`rounded-lg p-4 border ${
                symbol === winner
                  ? "border-green-300 bg-green-50"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <p className="text-sm text-gray-500 mb-1">{symbol}</p>

              <p
                className={`text-2xl font-bold ${
                  isUp ? "text-green-600" : "text-red-600"
                }`}
              >
                {isUp ? "▲" : "▼"} {Math.abs(data.return_pct)}%
              </p>

              <p className="text-xs text-gray-500 mt-1">
                {period_days}-day return
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex items-start gap-2 bg-green-50 border border-green-200 rounded-lg p-3">
        <span className="text-lg">🏆</span>
        <p className="text-sm text-green-800">
          <b>{winner}</b> outperformed <b>{loser}</b> with a higher return over
          the selected period.
        </p>
      </div>
    </div>
  );
}

export default WinnerBadge;
