import yfinance as yf
import pandas as pd
from datetime import datetime

def fetch_stock_data(symbol: str, period: str = "1y") -> pd.DataFrame:
    ticker = yf.Ticker(f"{symbol}.NS")
    df = ticker.history(period=period)

    if df.empty:
        raise ValueError("No data found for symbol")

    df.reset_index(inplace=True)

    df["symbol"] = symbol.upper()

    return df

def clean_stock_data(df: pd.DataFrame) -> pd.DataFrame:
    df.columns = [c.lower() for c in df.columns]

    df["date"] = pd.to_datetime(df["date"]).dt.tz_localize(None)

    df = df.drop(columns=["dividends", "stock splits"], errors="ignore")

    df = df.dropna(subset=["open", "high", "low", "close"])
    df = df.sort_values("date").reset_index(drop=True)

    return df


def add_financial_metrics(df: pd.DataFrame) -> pd.DataFrame:
    """
    Adds financial indicators:
    - Daily Return
    - 7-day Moving Average
    - 52-week High/Low
    """

    df["daily_return"] = (df["close"] - df["open"]) / df["open"]
    
    df["daily_return_pct"] = df["daily_return"] * 100

    df["ma_7"] = df["close"].rolling(window=7).mean()

    df["52w_high"] = df["close"].rolling(window=252).max()
    df["52w_low"] = df["close"].rolling(window=252).min()
    
    df["historical_high"] = df["close"].expanding().max()
    df["historical_low"] = df["close"].expanding().min()

    return df

def add_volatility_score(df: pd.DataFrame) -> pd.DataFrame:
    """
    Volatility score based on rolling standard deviation of returns.
    """
    df["volatility"] = df["daily_return"].rolling(window=7).std()
    return df

def format_financial_columns(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()

    price_cols = [
        "open", "high", "low", "close", "ma_7",
        "52w_high", "52w_low",
        "historical_high", "historical_low"
    ]

    return_cols = ["daily_return", "volatility"]

    existing_price_cols = [c for c in price_cols if c in df.columns]
    df[existing_price_cols] = df[existing_price_cols].round(2)

    existing_return_cols = [c for c in return_cols if c in df.columns]
    df[existing_return_cols] = df[existing_return_cols].round(4)

    if "daily_return_pct" in df.columns:
        df["daily_return_pct"] = df["daily_return_pct"].round(2)

    if "volume" in df.columns:
        df["volume"] = df["volume"].astype("int64")

    return df   


def process_stock(symbol: str) -> pd.DataFrame:
    """
    Full stock data pipeline.
    """
    
    df = fetch_stock_data(symbol)
    df = clean_stock_data(df)
    df = add_financial_metrics(df)
    df = add_volatility_score(df)
    df = format_financial_columns(df)
    
    return df


