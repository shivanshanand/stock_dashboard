import TimeRangeSelector from "../components/TimeRangeSelector";
import CompareChart from "../components/CompareChart";
import WinnerBadge from "../components/WinnerBadge";

function CompareSection({
  stockData1,
  stockData2,
  symbol1,
  symbol2,
  compareResult,
  compareDays,
  setCompareDays,
}) {
  if (!stockData1?.length || !stockData2?.length) return null;

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-3">
        <div>
          <h2 className="text-xl font-semibold">Stock Comparison</h2>
          <p className="text-sm text-gray-500">
            Compare price movement over selected period
          </p>
        </div>

        <TimeRangeSelector value={compareDays} onChange={setCompareDays} />
      </div>

      <div className="mt-10 space-y-4">
        <CompareChart
          data1={stockData1}
          data2={stockData2}
          symbol1={symbol1}
          symbol2={symbol2}
          days={compareDays}
        />

        <WinnerBadge compareResult={compareResult} />
      </div>
    </div>
  );
}

export default CompareSection;
