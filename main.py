from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import pyodbc
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from fastapi.security import HTTPBasic, HTTPBasicCredentials
import pyodbc

app = FastAPI()
security = HTTPBasic()
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
  NTID: str
  first_name: str
  last_name: str
  email: str
  phone: str
  location: str
  approved: bool
  password: str
  

@app.post("/signup")
async def signup(signup: SignUp):
    try:
        # Connect to database
        cnxn = pyodbc.connect(connection_string)
        cursor = cnxn.cursor()

        # Insert new record into signups table
        insert_query = f"INSERT INTO signups (NTID,first_name, last_name, email,phone,location, password,approved) VALUES (?, ?, ?, ?, ?, ?, ?, 0)"
        params = (signup.NTID,signup.first_name, signup.last_name, signup.email, signup.location, signup.password, signup.approved)
        cursor.execute(insert_query, params)
        cnxn.commit()

        # Close database connection
        cursor.close()
        cnxn.close()

        return JSONResponse(content={"message": "Sign up successful"})
    except Exception as e:
        return JSONResponse(content={"message": f"Error: {str(e)}"}, status_code=500)

# Login endpoint
@app.post("/login")
async def login(credentials: HTTPBasicCredentials = security):
    try:
        # Connect to database
        cnxn = pyodbc.connect(connection_string)
        cursor = cnxn.cursor()

        # Check if username and password match
        query = f"SELECT * FROM signups WHERE NTID=? AND password=?"
        params = (credentials.username, credentials.password)
        cursor.execute(query, params)
        row = cursor.fetchone()

        # Close database connection
        cursor.close()
        cnxn.close()

        if not row:
            raise HTTPException(status_code=401, detail="Invalid username or password")
        return {"status": "success", "message": "Logged in successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")