import pandas as pd


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

# def fetch_user_by_ntid(engine, NTID):
#     query = f"SELECT * FROM signups WHERE NTID = '{NTID}'"
#     print(query)
#     df = pd.read_sql(query, engine)
#     return df

# def fetch_event_by_id(engine, event_id):
#     query = f"SELECT * FROM Events WHERE event_id = '{event_id}'"
#     print(query)
#     df = pd.read_sql(query, engine)
#     return df

# def register_user_for_event(engine, NTID, event_id):
#     query = f"INSERT INTO EventRegistration (event_id, NTID) VALUES ('{NTID}', '{event_id}')"
#     print(query)
#     engine.execute(query)
#     engine.commit()