import os
from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.templating import Jinja2Templates
from typing import Optional
from datetime import datetime
from bson import ObjectId
import motor.motor_asyncio
from dotenv import load_dotenv

load_dotenv()
MONGO_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URL)
db = client["disaster_db"]
collection = db["disasters"]

app = FastAPI(title="Disaster Reporting API")
templates = Jinja2Templates(directory="templates")

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    """User form page"""
    return templates.TemplateResponse("report.html", {"request": request})


@app.post("/report")
async def create_report(
    disaster_type: str = Form(...),
    location: str = Form(...),
    severity: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
):
    report_dict = {
        "disaster_type": disaster_type,
        "location": location,
        "severity": severity,
        "description": description,
        "time": datetime.utcnow(),
    }
    result = await collection.insert_one(report_dict)
    return JSONResponse({"status": "success", "id": str(result.inserted_id)})


@app.get("/disasters")
async def get_disasters():
    """Return all disaster reports as JSON (for admin page fetch)"""
    cursor = collection.find({})
    disasters = []
    async for doc in cursor:
        doc["_id"] = str(doc["_id"])
        if "time" in doc and isinstance(doc["time"], datetime):
            doc["time"] = doc["time"].isoformat()
        disasters.append(doc)
    return disasters


@app.get("/admin", response_class=HTMLResponse)
async def admin_dashboard(request: Request):
    """Admin dashboard shell (JS will fetch data)"""
    return templates.TemplateResponse("admin.html", {"request": request})


@app.post("/clear_reports")
async def clear_reports():
    """Delete ALL reports from the database"""
    await collection.delete_many({})
    return {"status": "cleared"}
