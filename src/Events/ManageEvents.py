from fastapi import FastAPI, HTTPException
from typing import List
from pydantic import BaseModel
import pyodbc

app = FastAPI()

# Define the Event model using Pydantic
class Event(BaseModel):
    event_name: str;
    event_date: str;
    event_location: str;
    event_description: str;

# Connect to the SQL Server database
server = 'focusflowserver.database.windows.net'
database = 'focusFlowDb'
username = 'isuh1kor'
password = 'suhas@123'
driver = '{ODBC Driver 17 for SQL Server}'
cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+ password)

# Define a GET endpoint to get all events
@app.get("/events", response_model=List[Event])
async def read_events():
    cursor = cnxn.cursor()
    cursor.execute("SELECT * FROM events")
    events = []
    for row in cursor.fetchall():
        event = Event(event_name=row[0], event_date=row[1], event_location=row[2], event_description=row[3] )
        events.append(event)
    return events

# Define a DELETE endpoint to delete an event by ID
@app.delete("/events/{event_name}")
def delete_event(event_name: str):
    
    cursor = cnxn.cursor()
    cursor.execute("DELETE FROM events WHERE name=?", event_name)
    cnxn.commit()
    return {"message": "Event deleted successfully"}

# Define a PUT endpoint to update an event by ID
@app.put("/events/{event_name}")
def update_event(event_name: str, event: Event):
    cursor = cnxn.cursor()
    cursor.execute("UPDATE events SET date=?, location=?, description=? WHERE name=?", event.event_date, event.event_location, event.event_description, event_name)
    cnxn.commit()
    return {"message": "Event updated successfully"}

# Run the application
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)


