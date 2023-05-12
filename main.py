# main.py

import pyodbc
import uvicorn
import config
import py_functions
import logging
from fastapi import FastAPI, HTTPException
from sqlalchemy import create_engine
import configparser
from fastapi.middleware.cors import CORSMiddleware
import datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import List
import pandas as pd
from typing import List
from pydantic import BaseModel
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from io import BytesIO
import pandas as pd


app = FastAPI()


app.log = 'C:/Users/ZZY1KOR/src/FocusFlowPersonnel/New trial/app.log'

# Define logging settings
logging.basicConfig(
    filename=app.log, 
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s'
)
#logging.basicConfig(filename='app.log', level=logging.INFO)

# Define CORS middleware
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

def connect_db(pwd):
    driver = config.DRIVER
    server = config.SERVER
    database = config.DATABASE
    uid = config.UID
    pwd = pwd
    trust = config.TRUST
    con_string = f'DRIVER={driver};SERVER={server};DATABASE={database};UID={uid};PWD={pwd};' 
    cnxn = pyodbc.connect(con_string)
    cnxn.autocommit = True
    cursor = cnxn.cursor()
    print('Connection succesful with database')
    return cnxn

pwd = 'suhas@123'
cnxn = connect_db(pwd)

# Define endpoints
@app.get('/user-data/')
def get_user_data():
    try:
        df = py_functions.fetch_userdata(cnxn)
        logging.info('User data fetched successfully')
        return df.to_dict('r')
    except Exception as e:
        logging.error(str(e))
        raise HTTPException(status_code=500, detail="Internal server error")

@app.put('/update-user-details/{NTID}')
def update_user_details(NTID: str, first_name: str, last_name: str, email: str, phone: str, location: str, approved: bool):
    try:
        py_functions.update_user_details(cnxn, NTID, first_name, last_name, email, phone, location, approved)
        logging.info(f'User details updated for {NTID}')
    except Exception as e:
        logging.error(str(e))
        raise HTTPException(status_code=404, detail="Could not update user details in the database")
    return {'message': 'User details updated successfully'}

@app.delete('/delete-user/{NTID}')
def delete_event(NTID: str):
    try:
        py_functions.delete_user(cnxn, NTID)
        logging.info(f'User {NTID} deleted successfully')
    except Exception as e:
        logging.error(str(e))
        raise HTTPException(status_code=404, detail="Could not delete user details in the database")
    return {'message': 'User deleted successfully'}

@app.get('/event-data/')
def get_event_data():
    try:
        df = py_functions.fetch_eventdata(cnxn)
        logging.info('Event data fetched successfully')
        return df.to_dict('r')
    except Exception as e:
        logging.error(str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")
    

@app.put('/update-event-details/{event_id}')
def update_event_details(event_id: str, event_name: str, event_location: str, event_description: str, event_date: str, type_of_event: str):
    try:
        py_functions.update_event_details(cnxn, event_id, event_name, event_location, event_description, event_date, type_of_event )
        logging.info(f'Event details updated for event {event_id}')
    except Exception as e:
        logging.error(str(e))
        raise HTTPException(status_code=404, detail="Could not update event details in the database")
    return {'message': 'Event details updated successfully'}


@app.delete('/delete-event/{event_id}')
def delete_event(event_id: str):
    try:
        py_functions.delete_event(cnxn, event_id)
        logging.info(f'Event {event_id} deleted successfully')
    except Exception as e:
        logging.error(str(e))
        raise HTTPException(status_code=404, detail="Could not delete event details in the database")
    return {'message': 'Event deleted successfully'}

@app.post('/add-event/')
def add_event_endpoint(event_id: str, event_name: str, event_location: str, event_description: str, event_date: str, type_of_event: str):
    try:
        py_functions.add_event(cnxn, event_id, event_name, event_location, event_description, event_date, type_of_event)
        logging.info(f'Event {event_id} added successfully')
    except Exception as e:
        logging.error(str(e))
        raise HTTPException(status_code=404, detail="Can't add event in the database")
    return {'message': 'Event added successfully'}


@app.post('/register-event')
def register_event(event_id: str, NTID: str):
    try:
        signups_df = py_functions.fetch_userdata(cnxn)
        user = signups_df[signups_df['NTID'].str.lower() == NTID.lower()]
        if user.empty:
            raise HTTPException(status_code=404, detail=f"User with NTID {NTID} not found in signups")
        events_df = py_functions.fetch_eventdata(cnxn)
        event = events_df[events_df['event_id'] == event_id]
        if event.empty:
            raise HTTPException(status_code=404, detail=f"Event with event id {event_id} not found in events")
        if py_functions.is_registered_for_event(cnxn, event_id, NTID.lower()):
            raise HTTPException(status_code=400, detail="User is already registered for this event")
        py_functions.register_user_for_event(cnxn, event_id, NTID.lower())
        logging.info(f'User {NTID} registered for event {event_id}')
        return {'message': 'User registered for event successfully'}
    except HTTPException as he:
        logging.error(str(he))
        raise he
    except Exception as e:
        logging.error(str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")

@app.get('/popular-events/')
def get_popular_events():
    try:
        df = pd.read_sql_query("SELECT TOP 5 event_id, COUNT(*) AS registered_users FROM EventRegistration GROUP BY event_id ORDER BY registered_users DESC", cnxn)
        logging.info('Popular events fetched successfully')
        return df.to_dict('r')
    except Exception as e:
        logging.error(str(e))
        raise HTTPException(status_code=500, detail="Internal server error")

#For the eventlist screen for user
@app.get('/event-details/{eventId}')
def get_event_details(eventId: str):
    try:
        event = py_functions.get_event_details(cnxn, eventId)
        if event is None:
            raise HTTPException(status_code=404, detail="Event not found")
        return event
    except Exception as e:
        logging.error(str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
#excel sheet
@app.post('/import-event-data')
async def import_event_data(file: UploadFile = File(...)):
    try:
        content = await file.read() # Read the file data from the request body
        df = pd.read_excel(BytesIO(content)) # Read the data from the Excel file into a DataFrame
        cursor = cnxn.cursor()
        for index, row in df.iterrows():
            event_id = row['event_id']
            cursor.execute("SELECT COUNT(*) FROM Events WHERE event_id = ?", event_id)
            count = cursor.fetchone()[0]
            if count == 0:
                cursor.execute("INSERT INTO Events (event_name, event_date, event_location, event_description, event_id) VALUES (?, ?, ?, ?, ?);", row['event_name'], row['event_date'], row['event_location'], row['event_description'], event_id)
        cursor.commit()
        logging.info('Event data imported successfully')
        return JSONResponse(content={"message": "Event data imported successfully"})
    except Exception as e:
        logging.error(str(e))
        return JSONResponse(content={"message": f'Error importing event data: {str(e)}'})

    
# Run the app
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
