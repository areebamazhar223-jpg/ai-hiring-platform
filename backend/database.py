import os

from pymongo import MongoClient

MONGO_URL = os.getenv("MONGO_URL", "mongodb://127.0.0.1:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "ai_hiring_platform")

client = MongoClient(MONGO_URL, serverSelectionTimeoutMS=5000)

database = client[DATABASE_NAME]

users_collection = database["users"]
jobs_collection = database["jobs"]
applications_collection = database["applications"]
