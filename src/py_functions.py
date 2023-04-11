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

