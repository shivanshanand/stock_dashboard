const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function fetchCompanies() {
  const res = await fetch(`${BASE_URL}/companies`);
  return res.json();
}

export async function fetchStockData(symbol, days = 30) {
  const res = await fetch(`${BASE_URL}/data/${symbol}?days=${days}`);
  return res.json();
}

export async function fetchSummary(symbol) {
  const res = await fetch(`${BASE_URL}/summary/${symbol}`);
  return res.json();
}

export async function fetchCompare(symbol1, symbol2, days = 30) {
  const res = await fetch(
    `${BASE_URL}/compare?symbol1=${symbol1}&symbol2=${symbol2}&days=${days}`
  );
  return res.json();
}

export async function fetchTopMovers(days = 30) {
  const res = await fetch(
    `${BASE_URL}/insights/top-movers?days=${days}&limit=3`
  );
  return res.json();
}
