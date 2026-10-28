from fastapi import APIRouter, HTTPException, status
from pymongo.errors import DuplicateKeyError

from database import users_collection
from schemas import UserCreate, UserLogin
from auth import (
    hash_password,
    verify_password,
    create_access_token
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/signup")
def signup(user: UserCreate):

    existing_user = users_collection.find_one({
        "email": user.email
    })

    if existing_user:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="An account with this email already exists")

    hashed_password = hash_password(user.password)

    user_data = {
        "name": user.name,
        "email": user.email,
        "password": hashed_password,
        "role": user.role
    }

    try:
        users_collection.insert_one(user_data)
    except DuplicateKeyError:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="An account with this email already exists")

    return {
        "message": "User created successfully"
    }


@router.post("/login")
def login(user: UserLogin):

    existing_user = users_collection.find_one({
        "email": user.email
    })

    if not existing_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")

    password_correct = verify_password(
        user.password,
        existing_user["password"]
    )

    if not password_correct:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")

    access_token = create_access_token({
        "email": existing_user["email"],
        "role": existing_user["role"],
        "name": existing_user["name"]
    })

    return {
        "message": "Login successful",
        "access_token": access_token,
        "user": {
            "name": existing_user["name"],
            "email": existing_user["email"],
            "role": existing_user["role"]
        }
    }
