# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel
# import pyodbc
# import pandas as pd
# from typing import List, Dict
# import uvicorn
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.exceptions import HTTPException
# from fastapi.responses import JSONResponse
# from datetime import datetime
# import random

# # Set up database connection
# def connect_db(pwd): 
#     server = 'focusflowserver.database.windows.net'
#     database = 'focusFlowDb'
#     uid = 'isuh1kor'
#     pwd = 'suhas@123'
#     driver = '{ODBC Driver 17 for SQL Server}'
#     trust = 'yes'
#     # cnxn = pyodbc.connect(f'DRIVER={driver};SERVER={server};DATABASE={database};UID={username};PWD={password}')
#     con_string = f'DRIVER={driver};SERVER={server};DATABASE={database};UID={uid};PWD={pwd};'
#     cnxn = pyodbc.connect(con_string) 
#     cnxn.autocommit = True
#     cursor = cnxn.cursor()
#     print('Connection succesful with database')
#     return cnxn
# pwd = 'suhas@123'
# cnxn = connect_db(pwd)

# app = FastAPI()

# origins = [
#     "http://localhost",
#     "http://localhost:3000",
#     "http://localhost:8000",
# ]
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # get_events_query = "SELECT * FROM events"
# # get_event_query = "SELECT * FROM events WHERE event_id = ?"
# # update_event_query = "UPDATE events SET event_name = ?, event_date = ?, event_location = ?, event_description = ? WHERE event_id = ?"
# # delete_event_query = "DELETE FROM events WHERE event_id = ?"

# class User(BaseModel):

#         NTID: str
#         first_name: str
#         last_name: str
#         email: str
#         phone: str
#         location: str
#         approved: bool

# get_user_query = "SELECT * FROM signups WHERE NTID = ?"
# delete_user_query = "DELETE FROM signups WHERE NTID = ?"

# @app.get('/user-list/')
# def fetch_userdata():
#     query = 'SELECT * FROM signups'
#     print(query)
#     df = pd.read_sql(query, cnxn)
#     return df.to_dict('r')


# @app.put('/update-user-details/{NTID}')
# def update_user_details(NTID: str, first_name: str, last_name: str, email: str, phone: str, location: str, approved: bool):
#     def update_user_details(engine, NTID, first_name, last_name, email, phone, location, approved):
#         query = f"UPDATE signups SET first_name = '{first_name}', last_name = '{last_name}', email = '{email}', phone = '{phone}', location = '{location}', approved = '{approved}' WHERE NTID = '{NTID}'"
#         print(query)
#         #engine.execute(query)
#         engine.execute(query)
#         engine.commit()

#     try:
#         update_user_details(cnxn, NTID, first_name, last_name, email, phone, location, approved)
#     except:
#         raise HTTPException(status_code=404, detail='Could not update user details in the database')
        
#     return {'message': 'User details updated successfully'}

# # @app.delete('/delete-user/{NTID}')
# # def delete_event(NTID: str):
# #     def delete_user(engine, NTID):
# #         query = f"DELETE FROM signups WHERE NTID = '{NTID}'"
# #         print(query)
# #         engine.execute(query)
# #         engine.commit()   

# @app.delete('/delete-user/{NTID}')
# def delete_event(NTID: str):
#     cursor = cnxn.cursor()
#     cursor.execute(get_user_query, NTID)
#     row = cursor.fetchone()
#     if not row:
#         raise HTTPException(status_code=404, detail="User not found")
#     cursor.execute(delete_user_query, NTID)
#     cnxn.commit()
#     return {"message": "User deleted successfully"}