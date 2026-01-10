from sqlalchemy import Column, Integer, Float, String, Date, UniqueConstraint
from app.database import Base

class Stock(Base):
    __tablename__ = "stocks"

    __table_args__ = (
        UniqueConstraint("symbol", "date", name="uix_symbol_date"),
    )

    id = Column(Integer, primary_key=True, index=True)
    symbol = Column(String, index=True)
    date = Column(Date, index=True)

    open = Column(Float)
    high = Column(Float)
    low = Column(Float)
    close = Column(Float)
    volume = Column(Integer)

    daily_return = Column(Float)
    daily_return_pct = Column(Float)
    ma_7 = Column(Float)
    volatility = Column(Float)

    week52_high = Column(Float)
    week52_low = Column(Float)

    historical_high = Column(Float)
    historical_low = Column(Float)
