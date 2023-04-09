# main.py

import pyodbc
import uvicorn
import config
import py_functions
from fastapi import FastAPI, HTTPException
from sqlalchemy import create_engine
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

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

#FOR USER SCREENS
@app.get('/user-data/')
def get_user_data():
    df = py_functions.fetch_userdata(cnxn)
    return df.to_dict('r')

@app.put('/update-user-details/{NTID}')
def update_user_details(NTID: str, first_name: str, last_name: str, email: str, phone: str, location: str, approved: bool):
    try:
        py_functions.update_user_details(cnxn, NTID, first_name, last_name, email, phone, location, approved)
    except:
        raise HTTPException(status_code=404, detail='Could not update user details in the database')
    return {'message': 'User details updated successfully'}

@app.delete('/delete-user/{NTID}')
def delete_event(NTID: str):
    try:
        py_functions.delete_user(cnxn, NTID)
    except:
        raise HTTPException(status_code=404, detail='Could not delete user from the database')
    return {'message': 'User deleted successfully'}

#FOR EVENT SCREEN
@app.get('/event-data/')
def get_event_data():
    df = py_functions.fetch_eventdata(cnxn)
    return df.to_dict('r')

@app.put('/update-event-details/{event_id}')
def update_event_details(event_id: str, event_name: str, event_location: str, event_description: str, event_date: str):
    try:
        py_functions.update_event_details(cnxn, event_id, event_name, event_location, event_description, event_date)
    except:
        raise HTTPException(status_code=404, detail='Could not update event details in the database')
    return {'message': 'Event details updated successfully'}

@app.delete('/delete-event/{event_id}')
def delete_event(event_id: str):
    try:
        py_functions.delete_event(cnxn, event_id)
    except:
        raise HTTPException(status_code=404, detail='Could not delete event from the database')
    return {'message': 'Event deleted successfully'}

@app.post('/add-event/')
def add_event_endpoint(event_id: str, event_name: str, event_location: str, event_description: str, event_date: str):
    try:
        py_functions.add_event(cnxn, event_id, event_name, event_location, event_description, event_date)
    except:
        raise HTTPException(status_code=404, detail='Could not add event in the database')
    return {'message': 'Event added successfully'}

# Run the app
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
