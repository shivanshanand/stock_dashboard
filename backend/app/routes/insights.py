from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import Stock

router = APIRouter(prefix="/api/insights", tags=["Insights"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/top-movers")
def top_movers(
    days: int = Query(30, ge=1, le=365),
    limit: int = Query(5, ge=1, le=20),
    db: Session = Depends(get_db)
):
    symbols = [r[0] for r in db.query(Stock.symbol).distinct().all()]

    results = []

    for symbol in symbols:
        rows = (
            db.query(Stock)
            .filter(Stock.symbol == symbol)
            .order_by(Stock.date.desc())
            .limit(days)
            .all()
        )

        if len(rows) < days:
            continue

        start_price = rows[-1].close
        end_price = rows[0].close

        if start_price is None or end_price is None:
            continue

        return_pct = round(((end_price - start_price) / start_price) * 100, 2)

        results.append({
            "symbol": symbol,
            "return_pct": return_pct
        })

    sorted_results = sorted(results, key=lambda x: x["return_pct"], reverse=True)

    return {
        "metric": "return_percentage",
        "period_days": days,
        "top_gainers": sorted_results[:limit],
        "top_losers": sorted_results[-limit:]
    }
