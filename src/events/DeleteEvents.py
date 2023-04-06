from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
import pyodbc
from fastapi.middleware.cors import CORSMiddleware

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

@App.delete("/delete-event/{event_id}")
async def delete_event(event_id: str):
    try:
        # Connect to database
        cnxn = pyodbc.connect(connection_string)
        cursor = cnxn.cursor()

        # Check if event exists
        select_query = f"SELECT event_id FROM events WHERE event_id = ?"
        params = (event_id,)
        cursor.execute(select_query, params)
        row = cursor.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="Event not found")

        # Delete event from the database
        delete_query = f"DELETE FROM events WHERE event_id = ?"
        cursor.execute(delete_query, params)
        cnxn.commit()

        # Close database connection
        cursor.close()
        cnxn.close()

        return JSONResponse(content={"message": "Event deleted successfully"})
    except Exception as e:
        return JSONResponse(content={"message": f"Error: {str(e)}"}, status_code=500)
