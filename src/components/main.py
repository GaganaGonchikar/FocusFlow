from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import pyodbc
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

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
# Define database connection string
server_name = 'focusflowserver.database.windows.net'
database_name = 'focusFlowDb'
username = 'isuh1kor'
password = 'suhas@123'
driver = '{ODBC Driver 17 for SQL Server}'
connection_string = f'DRIVER={driver};SERVER={server_name};DATABASE={database_name};UID={username};PWD={password}'

# Define Pydantic model for request body
class SignUp(BaseModel):
    first_name: str
    last_name: str
    dob: str
    nt_Id: str
    employee_Id: str
    email: str
    password: str

@app.post("/signup")
async def signup(signup: SignUp):
    try:
        # Connect to database
        cnxn = pyodbc.connect(connection_string)
        cursor = cnxn.cursor()

        # Insert new record into signups table
        insert_query = f"INSERT INTO signups (first_name, last_name, dob, nt_Id, employee_Id, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)"
        params = (signup.first_name, signup.last_name, signup.dob, signup.nt_Id, signup.employee_Id, signup.email, signup.password)
        cursor.execute(insert_query, params)
        cnxn.commit()

        # Close database connection
        cursor.close()
        cnxn.close()

        return JSONResponse(content={"message": "Sign up successful"})
    except Exception as e:
        return JSONResponse(content={"message": f"Error: {str(e)}"}, status_code=500)
