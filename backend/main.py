from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
from fastapi import Body

from sqlalchemy.orm import Session
from database import engine, SessionLocal
from models import User
from schemas import LoginRequest
import models
import uuid
import os

from models import CookieConsent
from services import cookie_consent_service
# from services import cookie_consent_service
from services.cookie_consent_service import handle_cookie_consent


class CookieConsentRequest(BaseModel):
    type: str
    analytics: bool | None = None
    marketing: bool | None = None




if os.getenv("CI") != "true":
    models.Base.metadata.create_all(bind=engine)


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ---- Login API ----
@app.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(
        User.email == data.email,
        User.password == data.password
    ).first()

    if user:
        return {
            "success": True,
            "message": "Login successful"
        }

    return {
        "success": False,
        "message": "Invalid email or password"
    }


# @app.post("/cookie-consent")
# def save_cookie_consent(
#     data: CookieConsentRequest,
#     db: Session = Depends(get_db)
# ):
#     user_id = str(uuid.uuid4())
#
#     consent_entry = CookieConsent(
#         userid=user_id,
#         consent=data.consent,
#         created_at=datetime.utcnow()
#     )
#
#     db.add(consent_entry)
#     db.commit()
#     db.refresh(consent_entry)
#
#     return {
#         "userid": user_id,
#         "status": "saved to database"
#     }

@app.post("/cookie-consent")
def save_cookie_consent(
    data: CookieConsentRequest,
    db: Session = Depends(get_db)
):
    return cookie_consent_service.handle_cookie_consent(
       data.dict(), db
  )



