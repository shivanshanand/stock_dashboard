import numpy as np
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import Stock

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# /companies
@router.get("/companies")
def get_companies(db: Session = Depends(get_db)):
    result = db.query(Stock.symbol).distinct().order_by(Stock.symbol).all()
    return [r[0] for r in result]


# /data/{symbol}
@router.get("/data/{symbol}")
def get_stock_data(
    symbol: str,
    days: int = Query(30, ge=1, le=365),
    db: Session = Depends(get_db)
):
    rows = (
        db.query(Stock)
        .filter(Stock.symbol == symbol.upper())
        .order_by(Stock.date.desc())
        .limit(days)
        .all()
    )
    return rows


# /summary/{symbol}
@router.get("/summary/{symbol}")
def get_summary(symbol: str, db: Session = Depends(get_db)):
    rows = (
        db.query(Stock)
        .filter(Stock.symbol == symbol.upper())
        .order_by(Stock.date.desc())
        .limit(252)
        .all()
    )

    if not rows:
        return {
            "symbol": symbol.upper(),
            "52_week_high": None,
            "52_week_low": None,
            "average_close": None
        }

    closes = [r.close for r in rows if r.close is not None]
    highs = [r.week52_high for r in rows if r.week52_high is not None]
    lows = [r.week52_low for r in rows if r.week52_low is not None]

    return {
        "symbol": symbol.upper(),
        "52_week_high": max(highs) if highs else None,
        "52_week_low": min(lows) if lows else None,
        "average_close": round(sum(closes) / len(closes), 2) if closes else None
    }


# /compare
@router.get("/compare")
def compare_stocks(symbol1: str, symbol2: str, days: int = Query(30, ge=1, le=365), db: Session = Depends(get_db)):

    def get_metrics(symbol: str):
        rows = (
            db.query(Stock)
            .filter(Stock.symbol == symbol.upper())
            .order_by(Stock.date.desc())
            .limit(days)
            .all()
        )
        
        if len(rows) < 2:
            return None

        latest = rows[0]
        start = rows[-1]

        return_pct = round(((latest.close - start.close) / start.close) * 100, 2)

        # Trend logic
        if latest.close > latest.ma_7 and return_pct > 0:
            direction = "bullish"
        elif latest.close < latest.ma_7 and return_pct < 0:
            direction = "bearish"
        else:
            direction = "neutral"

        return {
            "start_date": start.date,
            "end_date": latest.date,
            "start_price": round(start.close, 2),
            "end_price": round(latest.close, 2),
            "return_pct": return_pct,
            "direction": direction,
            "volatility": latest.volatility
        }

    s1 = get_metrics(symbol1)
    s2 = get_metrics(symbol2)
    

    if not s1 or not s2:
        return {
            "error": "Not enough data to compare stocks"
        }


    if s1["return_pct"] > s2["return_pct"]:
        winner = symbol1.upper()
    elif s2["return_pct"] > s1["return_pct"]:
        winner = symbol2.upper()
    else:
        winner = "TIE"

    return {
        "metric": "return_percentage",
        "period_days": days,
        "calculation": "(last_close - first_close) / first_close * 100",
        "comparison": {
            symbol1.upper(): s1,
            symbol2.upper(): s2
        },
        "winner": winner
    }
