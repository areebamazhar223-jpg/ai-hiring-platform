from pwdlib import PasswordHash
from jose import jwt
from datetime import datetime, timedelta, timezone
import os
import secrets
from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials


password_hash = PasswordHash.recommended()

ENVIRONMENT = os.getenv("ENVIRONMENT", "development").lower()
SECRET_KEY = os.getenv("SECRET_KEY")
if not SECRET_KEY:
    if ENVIRONMENT == "production":
        raise RuntimeError("SECRET_KEY must be configured in production")
    SECRET_KEY = secrets.token_urlsafe(32)
if ENVIRONMENT == "production" and len(SECRET_KEY) < 32:
    raise RuntimeError("SECRET_KEY must contain at least 32 characters in production")
ALGORITHM = "HS256"

security = HTTPBearer(auto_error=False)


# Password hash
def hash_password(password: str):
    return password_hash.hash(password)


# Password verify
def verify_password(password: str, hashed_password: str):
    return password_hash.verify(password, hashed_password)


# Create JWT token
def create_access_token(data: dict):

    token_data = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(hours=24)

    token_data.update({
        "exp": expire
    })

    token = jwt.encode(
        token_data,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return token


# Verify JWT token
def verify_token(token: str):

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        return payload

    except Exception:
        return None


# Get current logged-in user
def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(security)
):
    if credentials is None:
        raise HTTPException(
            status_code=401,
            detail="Authentication is required",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token = credentials.credentials

    payload = verify_token(token)

    if not payload:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return payload
