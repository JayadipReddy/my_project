from database import Base

from sqlalchemy import Column, Integer, String, DateTime, Boolean
from datetime import datetime

class CookieConsent(Base):
    __tablename__ = "cookie_consents"

    id = Column(Integer, primary_key=True, index=True)
    userid = Column(String, unique=True, index=True)

    necessary = Column(Boolean, default=True)
    analytics = Column(Boolean, default=False)
    marketing = Column(Boolean, default=False)

    created_at = Column(DateTime, default=datetime.utcnow)



class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)