import uuid
from datetime import datetime
from models import CookieConsent

def handle_cookie_consent(data, db):
    """
    Business logic for customized cookie consent
    """

    consent_type = data.get("type")

    # -------- Business Rule 1: Determine cookie values --------
    if consent_type == "ALL":
        necessary = True
        analytics = True
        marketing = True

    elif consent_type == "REJECT":
        necessary = True
        analytics = False
        marketing = False

    elif consent_type == "CUSTOM":
        necessary = True
        analytics = data.get("analytics", False)
        marketing = data.get("marketing", False)

    else:
        return {"error": "Invalid consent type"}

    # -------- Business Rule 2: Generate userid --------
    user_id = str(uuid.uuid4())

    # -------- Business Rule 3: One record per userid --------
    existing = db.query(CookieConsent).filter(
        CookieConsent.userid == user_id
    ).first()

    if existing:
        existing.necessary = necessary
        existing.analytics = analytics
        existing.marketing = marketing
        existing.created_at = datetime.utcnow()
        db.commit()

        return {
            "userid": user_id,
            "status": "updated"
        }

    # -------- Insert new record --------
    consent_entry = CookieConsent(
        userid=user_id,
        necessary=necessary,
        analytics=analytics,
        marketing=marketing,
        created_at=datetime.utcnow()
    )

    db.add(consent_entry)
    db.commit()
    db.refresh(consent_entry)

    return {
        "userid": user_id,
        "status": "created"
    }
