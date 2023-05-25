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
import py_functions
from fastapi.security import HTTPBasic, HTTPBasicCredentials

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
        py_functions.insert_signup(cnxn, NTID, first_name, last_name, email, phone, location, password, approved)

        # Close database connection
        cnxn.close()

        logging.info("Sign up successful")
        return {"message": "Sign up successful"}
    except Exception as e:
        logging.error(f"Error in signup endpoint: {str(e)}")
        return {"message": f"Error: {str(e)}"}, 500

# Login endpoint
@app.post("/login")
# async def login(credentials: HTTPBasicCredentials):
def login(username: str, password: str,credentials: HTTPBasicCredentials):
    try:
        # Connect to database
        row = py_functions.check_credentials(cnxn, username, password)

        # Close database connection
        cnxn.close()

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
def update_event_details(event_id: str, event_name: str, event_location: str, event_description: str, event_date: str):
    try:
        py_functions.update_event_details(cnxn, event_id, event_name, event_location, event_description, event_date)
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
def add_event_endpoint(event_id: str, event_name: str, event_location: str, event_description: str, event_date: str):
    try:
        py_functions.add_event(cnxn, event_id, event_name, event_location, event_description, event_date)
        logging.info(f'Event {event_id} added successfully')
    except Exception as e:
        logging.error(str(e))
        raise HTTPException(status_code=404, detail="Can't add event in the database")
    return {'message': 'Event added successfully'}




# @app.post('/register-event/{event_id}/{NTID}')
# def register_event(event_id: int, NTID: str):
#     try:
#         # Fetch user details
#         user = py_functions.fetch_user_by_ntid(cnxn, NTID)
#         if user is None:
#             raise HTTPException(status_code=404, detail=f"User with NTID {NTID} not found")
        
#         # Fetch event details
#         event = py_functions.fetch_event_by_id(cnxn, event_id)
#         if event is None:
#             raise HTTPException(status_code=404, detail=f"Event with ID {event_id} not found")
        
#         # Register user for the event
#         py_functions.register_user_for_event(cnxn, event_id, NTID)
#         logging.info(f'User {NTID} registered for event {event_id}')
        
#         return {'message': 'User registered for event successfully'}
#     except Exception as e:
#         logging.error(str(e))
#         raise HTTPException(status_code=500, detail="Internal Server Error")

# Run the app
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
