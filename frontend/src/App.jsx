import { useEffect, useState } from "react";
import {
  fetchCompanies,
  fetchStockData,
  fetchSummary,
  fetchCompare,
} from "./services/api";

import StockOverview from "./sections/StockOverview";
import CompareSection from "./sections/CompareSection";
import TopMoversSection from "./sections/TopMoversSection";
import CompanySidebar from "./components/CompanySidebar";

function App() {
  const [companies, setCompanies] = useState([]);
  const [selected, setSelected] = useState("");

  const [overviewDays, setOverviewDays] = useState(30);
  const [overviewData, setOverviewData] = useState([]);
  const [summary, setSummary] = useState(null);

  const [compareSymbol, setCompareSymbol] = useState("");
  const [compareDays, setCompareDays] = useState(30);
  const [compareData1, setCompareData1] = useState([]);
  const [compareData2, setCompareData2] = useState([]);
  const [compareResult, setCompareResult] = useState(null);

  // Fetch company list (once)
  useEffect(() => {
    fetchCompanies().then(setCompanies);
  }, []);

  // Fetch overview data
  useEffect(() => {
    if (!selected) return;

    fetchStockData(selected, overviewDays).then(setOverviewData);
    fetchSummary(selected).then(setSummary);
  }, [selected, overviewDays]);

  // Fetch comparison data
  useEffect(() => {
    if (!selected || !compareSymbol) return;

    fetchStockData(selected, compareDays).then(setCompareData1);
    fetchStockData(compareSymbol, compareDays).then(setCompareData2);
    fetchCompare(selected, compareSymbol, compareDays).then(setCompareResult);
  }, [selected, compareSymbol, compareDays]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Stock Intelligence Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Analyze trends, compare performance, and track market movers
          </p>
        </header>

        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-12 md:col-span-3">
            <CompanySidebar
              companies={companies}
              selected={selected}
              onSelect={setSelected}
            />
          </aside>

          <main className="col-span-12 md:col-span-9 space-y-10">
            {selected && (
              <StockOverview
                stockData={overviewData}
                summary={summary}
                days={overviewDays}
                setDays={setOverviewDays}
              />
            )}

            {selected && (
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Compare with
                </label>
                <select
                  className="p-2 border rounded bg-white"
                  value={compareSymbol}
                  onChange={(e) => setCompareSymbol(e.target.value)}
                >
                  <option value="">Select company</option>
                  {companies
                    .filter((c) => c !== selected)
                    .map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                </select>
              </div>
            )}

            {compareSymbol && (
              <CompareSection
                stockData1={compareData1}
                stockData2={compareData2}
                symbol1={selected}
                symbol2={compareSymbol}
                compareResult={compareResult}
                compareDays={compareDays}
                setCompareDays={setCompareDays}
              />
            )}

            <TopMoversSection />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
