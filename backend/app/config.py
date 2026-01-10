from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    DATABASE_URL: str
    FRONTEND_URLS: str

    class Config:
        env_file = ".env"

    @property
    def cors_origins(self) -> List[str]:
        return [url.strip() for url in self.FRONTEND_URLS.split(",")]

settings = Settings()
