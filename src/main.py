import pyodbc
import uvicorn
import config
import py_functions
from fastapi import FastAPI
import json
from fastapi.middleware.cors import CORSMiddleware

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
    
@app.get('/')
def get_data():
    df = py_functions.fetch_data(cnxn)
    return df.to_dict('r')
        
        #search:str = ""
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)