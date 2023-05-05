import pyodbc
import uvicorn
import config
import py_functions1
import logging
from fastapi import FastAPI, HTTPException
from sqlalchemy import create_engine
import configparser
from fastapi.middleware.cors import CORSMiddleware
import datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi import FastAPI, HTTPException
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi.responses import JSONResponse

# import py_functions

app = FastAPI()


app.log = 'C:/Users/GAGB1KOR/gaganafocusflow/app.log'

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


@app.post("/signup")
def signup(NTID: str, first_name: str, last_name: str, email: str, phone: str, location: str, password: str, approved: bool):
    try:
        py_functions1.insert_signup(cnxn, NTID, first_name, last_name, email, phone, location, password, approved)

        # Close database connection
    
        logging.info("Sign up successful")
        return {"message": "Sign up successful"}
    except Exception as e:
        logging.error(f"Error in signup endpoint: {str(e)}")
        return {"message": f"Error: {str(e)}"}, 500

# Login endpoint
@app.post("/login")
# async def login(credentials: HTTPBasicCredentials):
def login(username: str, password: str):
    try:
        # Connect to database
        row = py_functions1.check_credentials(cnxn, username, password)

        # Close database connection
        # cnxn.close()

        if not row:
            raise HTTPException(status_code=401, detail="Invalid username or password")
        logging.info("Logged in successfully!")
        return {"status": "success", "message": "Logged in successfully!"}
    except Exception as e:
        logging.error(f"Error in login endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")


# Define endpoints
@app.get('/user-list/')
def get_user_data():
    try:
        df = py_functions1.fetch_userdata(cnxn)
        logging.info('User data fetched successfully')
        return df.to_dict('r')
    except Exception as e:
        logging.error(str(e))
        raise HTTPException(status_code=500, detail="Internal server error")

@app.put('/update-user-details/{NTID}')
def update_user_details(NTID: str, first_name: str, last_name: str, email: str, phone: str, location: str, approved: bool):
    try:
        py_functions1.update_user_details(cnxn, NTID, first_name, last_name, email, phone, location, approved)
        logging.info(f'User details updated for {NTID}')
    except Exception as e:
        logging.error(str(e))
        raise HTTPException(status_code=404, detail="Could not update user details in the database")
    return {'message': 'User details updated successfully'}

@app.delete('/delete-user/{NTID}')
def delete_event(NTID: str):
    try:
        py_functions1.delete_user(cnxn, NTID)
        logging.info(f'User {NTID} deleted successfully')
    except Exception as e:
        logging.error(str(e))
        raise HTTPException(status_code=404, detail="Could not delete user details in the database")
    return {'message': 'User deleted successfully'}

@app.post('/import-event-data')
def import_event_data():
    try:
        py_functions1.import_eventdata(cnxn)
        logging.info('Event data imported successfully')
        return {'message': 'Event data imported successfully'}
    except Exception as e:
        logging.error(str(e))
        return {'message': f'Error importing event data: {str(e)}'}

    

@app.get('/event-data/')
def get_event_data():
    try:
        df = py_functions1.fetch_eventdata(cnxn)
        logging.info('Event data fetched successfully')
        return df.to_dict('r')
    except Exception as e:
        logging.error(str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")

# @app.get('/event-data/')
# def get_event_data(filename: str):
#     try:
#         # Fetch the data from the Excel file and log a success message
#         df = py_functions1.fetch_eventdata(filename)
#         logging.info(f'Event data fetched successfully from {filename}')

#         # Return the data as a dictionary
#         return df
#     except Exception as e:
#         logging.error(str(e))
#         raise HTTPException(status_code=500, detail="Internal Server Error")

@app.put('/update-event-details/{event_id}')
def update_event_details(event_id: str, event_name: str, event_location: str, event_description: str, event_date: str):
    try:
        py_functions1.update_event_details(cnxn, event_id, event_name, event_location, event_description, event_date)
        logging.info(f'Event details updated for event {event_id}')
    except Exception as e:
        logging.error(str(e))
        raise HTTPException(status_code=404, detail="Could not update event details in the database")
    return {'message': 'Event details updated successfully'}

@app.delete('/delete-event/{event_id}')
def delete_event(event_id: str):
    try:
        py_functions1.delete_event(cnxn, event_id)
        logging.info(f'Event {event_id} deleted successfully')
    except Exception as e:
        logging.error(str(e))
        raise HTTPException(status_code=404, detail="Could not delete event details in the database")
    return {'message': 'Event deleted successfully'}

@app.post('/add-event/')
def add_event_endpoint(event_id: str, event_name: str, event_location: str, event_description: str, event_date: str):
    try:
        py_functions1.add_event(cnxn, event_id, event_name, event_location, event_description, event_date)
        logging.info(f'Event {event_id} added successfully')
    except Exception as e:
        logging.error(str(e))
        raise HTTPException(status_code=404, detail="Can't add event in the database")
    return {'message': 'Event added successfully'}


@app.post('/register-event/{event_id}')
def register_event(event_id: str, NTID: str):
    try:
        signups_df = py_functions1.fetch_userdata(cnxn)
        user = signups_df[signups_df['NTID'] == NTID]
        if user.empty:
            raise HTTPException(status_code=404, detail=f"User with NTID {NTID} not found in signups")
        
        events_df = py_functions1.fetch_eventdata(cnxn)
        event = events_df[events_df['event_id'] == event_id]
        if event.empty:
            raise HTTPException(status_code=404, detail=f"Event with event id {event_id} not found in events")
        
        # Check if user is already registered for the event
        if py_functions1.is_registered_for_event(cnxn, event_id, NTID):
            raise HTTPException(status_code=400, detail="User is already registered for this event")
        
        # Register user for the event
        py_functions1.register_user_for_event(cnxn, event_id, NTID)
        logging.info(f'User {NTID} registered for event {event_id}')
        
        return {'message': 'User registered for event successfully'}
    except HTTPException as he:
        logging.error(str(he))
        raise he
    except Exception as e:
        logging.error(str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")
    

# @app.get('/participation-history/{NTID}')
# def get_participation_history(NTID: str):
#     try:
#         # Fetch participation history
#         participation_history = py_functions1.fetch_participation_history(cnxn, NTID)
#         logging.info(f'User {NTID} has registered to these events')

#         # Return results
#         if participation_history:
#             event_list = []
#             for row in participation_history:
#                 event = {
#                     'event_name': row[0],
#                     'event_date': row[1],
#                     'event_location': row[2],
#                     'event_description': row[3],
#                     'event_id': row[4]
#                 }
#                 event_list.append(event)
#             return {'participation_history': event_list}
#         else:
#             return {'participation_history': None}
        
#     except Exception as e:
#         logging.error(str(e))
#         raise HTTPException(status_code=500, detail="Internal Server Error")

@app.get('/participation-history/{NTID}')
def get_participation_history(NTID: str):
    try:
        # Fetch participation history
        participation_history = py_functions1.fetch_participation_history(cnxn, NTID)
        logging.info(f'User {NTID} has registered to these events')

        # If no results found, raise an error
        if not participation_history:
            raise HTTPException(status_code=404, detail=f'User with NTID {NTID} has not registered to any events')

        # Return results
        event_list = []
        for row in participation_history:
            event = {
                'event_name': row[0],
                'event_date': row[1],
                'event_location': row[2],
                'event_description': row[3],
                'event_id': row[4]
            }
            event_list.append(event)
        return {'participation_history': event_list}
        
    except Exception as e:
        logging.error(str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")

@app.get('/upcoming-events/{NTID}')
def get_upcoming_events(NTID: str):
    try:
        # Fetch participation history
        upcoming_events = py_functions1.upcoming_events(cnxn, NTID)
        logging.info(f'User {NTID} has registered to these events')

        # If no results found, raise an error
        if not upcoming_events:
            raise HTTPException(status_code=404, detail=f'User with NTID {NTID} has not registered to any events')

        # Return results
        event_list = []
        for row in upcoming_events:
            event = {
                'event_name': row[0],
                'event_date': row[1],
                'event_location': row[2],
                'event_description': row[3],
                'event_id': row[4]
            }
            event_list.append(event)
        return {'upcoming_events': event_list}
        
    except Exception as e:
        logging.error(str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")


# Run the app
if __name__ == "__main__":
    # py_functions1.import_eventdata('EventsData.xlsx', cnxn)
    # logging.info('Event data imported successfully')
    uvicorn.run(app, host="127.0.0.1", port=8000)