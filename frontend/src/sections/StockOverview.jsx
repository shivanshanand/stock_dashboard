import SummaryCard from "../components/SummaryCard";
import PriceChart from "../components/PriceChart";
import TimeRangeSelector from "../components/TimeRangeSelector";

function StockOverview({ stockData, summary, days, setDays }) {
  if (!stockData?.length) return null;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SummaryCard stockData={stockData} summary={summary} />
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Price Trend</h3>
          <TimeRangeSelector value={days} onChange={setDays} />
        </div>

        <PriceChart stockData={stockData} />
      </div>
    </>
  );
} 

export default StockOverview;
