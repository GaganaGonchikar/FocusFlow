from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import pyodbc
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import random
import pandas as pd

App = FastAPI()

# Define CORS middleware
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8000",
]

App.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define database connection string
server_name = 'focusflowserver.database.windows.net'
database_name = 'focusFlowDb'
username = 'isuh1kor'
password = 'suhas@123'
driver = '{ODBC Driver 17 for SQL Server}'
connection_string = f'DRIVER={driver};SERVER={server_name};DATABASE={database_name};UID={username};PWD={password}'

# Define Pydantic model for request body
class Event(BaseModel):
    event_name: str
    event_date: str
    event_location: str
    event_description: str

# Define function to establish database connection and cursor
def connect_to_database():
    cnxn = pyodbc.connect(connection_string)
    print("Connected to database")
    cursor = cnxn.cursor()
    return cnxn, cursor

@App.get('/')
async def root():
    return {"message": "Welcome to the FocusFlow API!"}

@App.post("/add-event")
async def add_event(event: Event):
    try:
        # Parse date string into datetime object
        event_date_obj = datetime.strptime(event.event_date, '%m-%d-%Y')

        # Format datetime object into expected string format
        event_date_str = event_date_obj.strftime('%Y-%m-%d')

        # Connect to database
        cnxn, cursor = connect_to_database()

        # Generate a custom event ID
        event_id = random.randint(1, 100000)

        # Insert new record into events table with custom event ID
        insert_query = f"INSERT INTO events (event_id, event_name, event_date, event_location, event_description) VALUES ({event_id}, '{event.event_name}', '{event_date_str}', '{event.event_location}', '{event.event_description}')"
        cursor.execute(insert_query)
        cnxn.commit()

        # Close database connection
        cursor.close()
        cnxn.close()

        return JSONResponse(content={"message": "Event added successfully"})
    except Exception as e:
        return JSONResponse(content={"message": f"Error: {str(e)}"}, status_code=500)

