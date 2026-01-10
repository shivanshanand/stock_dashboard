from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routes.stocks import router as stock_router
from app.routes.insights import router as insights_router
from app.services.db_service import save_stock_data, is_db_empty
from app.services.stock_service import process_stock
from app.default_symbols import DEFAULT_SYMBOLS
from app.database import SessionLocal, engine
from app.models import Base

app = FastAPI(
    title="Stock Data Intelligence API",
    description="Mini financial analytics platform",
    version="1.0.0",
)

# ✅ CORS (env-driven)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Routers
app.include_router(stock_router, prefix="/api")
app.include_router(insights_router)

@app.on_event("startup")
def startup_event():
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        if is_db_empty(db):
            for symbol in DEFAULT_SYMBOLS:
                df = process_stock(symbol)
                save_stock_data(db, df)
            print("📊 Stock data loaded into DB")
    finally:
        db.close()

@app.get("/")
def health():
    return {"status": "ok"}
