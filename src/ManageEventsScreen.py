from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pyodbc
import pandas as pd
from typing import List, Dict
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import HTTPException
from fastapi.responses import JSONResponse
from datetime import datetime
import random

# Set up database connection
def connect_db(pwd): 
    server = 'focusflowserver.database.windows.net'
    database = 'focusFlowDb'
    uid = 'isuh1kor'
    pwd = 'suhas@123'
    driver = '{ODBC Driver 17 for SQL Server}'
    trust = 'yes'
    # cnxn = pyodbc.connect(f'DRIVER={driver};SERVER={server};DATABASE={database};UID={username};PWD={password}')
    con_string = f'DRIVER={driver};SERVER={server};DATABASE={database};UID={uid};PWD={pwd};'
    cnxn = pyodbc.connect(con_string) 
    cnxn.autocommit = True
    cursor = cnxn.cursor()
    print('Connection succesful with database')
    return cnxn
pwd = 'suhas@123'
cnxn = connect_db(pwd)

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

get_events_query = "SELECT * FROM events"
get_event_query = "SELECT * FROM events WHERE event_id = ?"
update_event_query = "UPDATE events SET event_name = ?, event_date = ?, event_location = ?, event_description = ? WHERE event_id = ?"
delete_event_query = "DELETE FROM events WHERE event_id = ?"

class Event(BaseModel):

        event_id: str
        event_name: str
        event_date: str
        event_location: str
        event_description: str




# Define the API endpoints
@app.get("/")
def get_events():


    query = 'SELECT * FROM events'
    print(query)
    df = pd.read_sql(query,cnxn)
    return df.to_dict('r')


@app.put('/update-event-details/{event_id}')
def update_event_details(event_id: str, event_name: str, event_date: str, event_location: str, event_description: str):
    def update_event_details(engine,event_id, event_name, event_date, event_location, event_description):
        query = f"UPDATE events SET event_name = '{event_name}', event_date = '{event_date}', event_location = '{event_location}', event_description = '{event_description}' WHERE event_id = '{event_id}'"
        engine.execute(query)
        engine.commit()

    try:
        update_event_details(cnxn, event_id, event_name, event_date, event_location, event_description)
    except:
        raise HTTPException(status_code=404, detail='Could not update event details in the database')
        
    return {'message': 'Event details updated successfully'}


@app.delete("/events/{event_id}")
def delete_event(event_id: str):
    cursor = cnxn.cursor()
    cursor.execute(get_event_query, event_id)
    row = cursor.fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="Event not found")
    cursor.execute(delete_event_query, event_id)
    cnxn.commit()
    return {"message": "Event deleted successfully"}

# if __name__ == "__main__":
#     uvicorn.run(app, host="127.0.0.1", port=8000)
