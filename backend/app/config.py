from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    FRONTEND_URL: str  # single production frontend

    class Config:
        env_file = ".env"

settings = Settings()
