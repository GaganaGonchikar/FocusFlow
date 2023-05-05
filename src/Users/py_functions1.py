import pandas as pd
import pyodbc



def insert_signup(cnxn, NTID, first_name, last_name, email, phone, location, password, approved):
    cursor = cnxn.cursor()
    insert_query = f"INSERT INTO signups (NTID, first_name, last_name, email, phone, location, password, approved) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    params = (NTID, first_name, last_name, email, phone, location, password, approved)
    cursor.execute(insert_query, params)
    cnxn.commit()
    cursor.close()

# Check if username and password match in signups table
def check_credentials(cnxn, username, password):
    cursor = cnxn.cursor()
    query = f"SELECT * FROM signups WHERE NTID=? AND password=?"
    params = (username, password)
    cursor.execute(query, params)
    row = cursor.fetchone()
    cnxn.commit()
    cursor.close()
    return row

#FOR USER SCREEN
def fetch_userdata(engine):
    query = 'SELECT * FROM signups'
    print(query)
    df = pd.read_sql(query, engine)
    return df

def update_user_details(engine, NTID, first_name, last_name, email, phone, location, approved):
    query = f"UPDATE signups SET first_name = '{first_name}', last_name = '{last_name}', email = '{email}', phone = '{phone}', location = '{location}', approved = '{approved}' WHERE NTID = '{NTID}'"
    print(query)
    #engine.execute(query)
    engine.execute(query)
    engine.commit()

def delete_user(engine, NTID):
    query = f"DELETE FROM signups WHERE NTID = '{NTID}'"
    print(query)
    engine.execute(query)
    engine.commit()    


#FOR IMPORT EXCEL

# def import_eventdata(engine):
#     # Set the file path to the path of your Excel file
#     filepath = 'C:\Gagana\Codes\EventsData.xlsx'

#     # Read the data from the Excel file into a DataFrame
#     df = pd.read_excel(filepath)

#     # Insert the data into the database table
#     cursor = engine.cursor()

#     for index, row in df.iterrows():
#         cursor.execute("INSERT INTO Events (event_name, event_date, event_location, event_description, event_id) VALUES (?, ?, ?, ?, ?);", row['event_name'], row['event_date'], row['event_location'], row['event_description'], row['event_id'])

#     cursor.commit()


def import_eventdata(engine):
    # Set the file path to the path of your Excel file
    filepath = 'C:\Gagana\Codes\EventsData.xlsx'

    # Read the data from the Excel file into a DataFrame
    df = pd.read_excel(filepath)

    # Insert the data into the database table
    cursor = engine.cursor()

    for index, row in df.iterrows():
        event_id = row['event_id']
        cursor.execute("SELECT COUNT(*) FROM Events WHERE event_id = ?", event_id)
        count = cursor.fetchone()[0]
        if count == 0:
            cursor.execute("INSERT INTO Events (event_name, event_date, event_location, event_description, event_id) VALUES (?, ?, ?, ?, ?);", row['event_name'], row['event_date'], row['event_location'], row['event_description'], event_id)

    cursor.commit()



#FOR EVENT SCREEN
def fetch_eventdata(engine):
    query = 'SELECT * FROM Events;'
    print(query)
    df = pd.read_sql(query, engine)
    return df

# def fetch_eventdata(filename):
#     # Read the data from the Excel file into a DataFrame
#     df = pd.read_excel(filename)

#     return df.to_dict('r')

def update_event_details(engine, event_id, event_name, event_location, event_description, event_date):
    query = f"UPDATE Events SET event_name = '{event_name}', event_location = '{event_location}', event_description = '{event_description}', event_date = '{event_date}' WHERE event_id = '{event_id}'"
    print(query)
    engine.execute(query)
    engine.commit()

def delete_event(engine, event_id):
    query = f"DELETE FROM Events WHERE event_id = '{event_id}'"
    print(query)
    engine.execute(query)
    engine.commit()    

def add_event(engine, event_id, event_name, event_location, event_description, event_date):
    query = f"INSERT INTO Events (event_id, event_name, event_location, event_description, event_date) VALUES ('{event_id}','{event_name}', '{event_location}', '{event_description}', '{event_date}')"
    print(query)
    engine.execute(query)
    engine.commit()


# Fetch user details by NTID
def fetch_user_by_ntid(cnxn, NTID):
    cursor = cnxn.cursor()
    query = f"SELECT * FROM signups WHERE NTID = '{NTID}';"
    cursor.execute(query)
    row = cursor.fetchone()
    cursor.close()
    return row

# Fetch event details by ID
def fetch_event_by_id(cnxn, event_id):
    cursor = cnxn.cursor()
    query = f"SELECT * FROM Events WHERE event_id = {event_id};"
    cursor.execute(query)
    row = cursor.fetchone()
    cursor.close()
    return row

# Check if user is already registered for the event
def is_registered_for_event(cnxn, event_id, NTID):
    cursor = cnxn.cursor()
    query = f"SELECT COUNT(*) FROM EventRegistration WHERE event_id = {event_id} AND NTID = '{NTID}';"
    cursor.execute(query)
    count = cursor.fetchone()[0]
    cursor.close()
    return count > 0

# Register user for the event
def register_user_for_event(cnxn, event_id, NTID):
    cursor = cnxn.cursor()
    query = f"INSERT INTO EventRegistration (event_id, NTID) VALUES ({event_id}, '{NTID}');"
    cursor.execute(query)
    cnxn.commit()
    cursor.close()



def fetch_participation_history(cnxn, NTID):
        cursor = cnxn.cursor()
        query = f"SELECT  e.event_name, e.event_date, e.event_location, e.event_description, e.event_id FROM Events e JOIN EventRegistration er ON er.event_id = e.event_id WHERE er.NTID = '{NTID}'  AND e.event_date <= CONVERT(date, GETDATE());"
        cursor.execute(query)
        result = cursor.fetchall()
        cursor.close()
        return result
        # row = cursor.fetchone()
        # cursor.close()
        # return row
    # except Exception as e:
    #     print(f"Error occurred while fetching participation history: {str(e)}")
    #     return None


def upcoming_events(cnxn, NTID):
        cursor = cnxn.cursor()
        query = f"SELECT  e.event_name, e.event_date, e.event_location, e.event_description, e.event_id FROM Events e JOIN EventRegistration er ON er.event_id = e.event_id WHERE er.NTID = '{NTID}'  AND e.event_date > CONVERT(date, GETDATE());"
        cursor.execute(query)
        result = cursor.fetchall()
        cursor.close()
        return result