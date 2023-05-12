import pandas as pd

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

#FOR EVENT SCREEN
def fetch_eventdata(engine):
    query = 'SELECT * FROM Events'
    print(query)
    df = pd.read_sql(query, engine)
    return df

def update_event_details(engine, event_id, event_name, event_location, event_description, event_date,type_of_event ):
    query = f"UPDATE Events SET event_name = '{event_name}', event_location = '{event_location}', event_description = '{event_description}', event_date = '{event_date}', type_of_event ='{type_of_event}' WHERE event_id = '{event_id}'"
    print(query)
    engine.execute(query)
    engine.commit()

def delete_event(engine, event_id):
    query = f"DELETE FROM Events WHERE event_id = '{event_id}'"
    print(query)
    engine.execute(query)
    engine.commit()    

def add_event(engine, event_id, event_name, event_location, event_description, event_date, type_of_event):
    query = f"INSERT INTO Events (event_id, event_name, event_location, event_description, event_date,type_of_event) VALUES ('{event_id}','{event_name}', '{event_location}', '{event_description}', '{event_date}','{type_of_event}')"
    print(query)
    engine.execute(query)
    engine.commit()

#for user registeration
def is_registered_for_event(cnxn, event_id, NTID):
    cursor = cnxn.cursor()
    query = f"SELECT COUNT(*) FROM EventRegistration WHERE event_id = {event_id} AND NTID = '{NTID}';"
    cursor.execute(query)
    count = cursor.fetchone()[0]
    cursor.close()
    return count > 0

def register_user_for_event(cnxn, event_id, NTID):
    cursor = cnxn.cursor()
    query = f"INSERT INTO EventRegistration (NTID, event_id) VALUES ('{NTID}', {event_id});"
    cursor.execute(query)
    cnxn.commit()
    cursor.close()


#For the eventlist screen for user
def get_event_details(engine, eventId):
    query = f"SELECT * FROM Events WHERE event_id = '{eventId}'"
    print(query)
    df = pd.read_sql(query, engine)
    if df.empty:
        return None
    event = df.to_dict(orient='records')[0]
    return event
