from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.models import Stock

def save_stock_data(db: Session, df):
    records = df.to_dict(orient="records")

    for r in records:
        exists = (
            db.query(Stock)
            .filter(
                Stock.symbol == r["symbol"],
                Stock.date == r["date"]
            )
            .first()
        )

        if exists:
            continue 

        stock = Stock(
            symbol=r["symbol"],
            date=r["date"],

            open=r["open"],
            high=r["high"],
            low=r["low"],
            close=r["close"],
            volume=r["volume"],

            daily_return=r["daily_return"],
            daily_return_pct=r["daily_return_pct"],
            ma_7=r["ma_7"],
            volatility=r["volatility"],

            week52_high=r["52w_high"],
            week52_low=r["52w_low"],

            historical_high=r["historical_high"],
            historical_low=r["historical_low"],
        )

        db.add(stock)

    db.commit()


def is_db_empty(db: Session) -> bool:
    return db.query(Stock).first() is None
