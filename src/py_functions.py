import pandas as pd
def fetch_data(cnxn):
    # query = 'SELECT * FROM UserListDetails'
    # query = 'SELECT * FROM signups'
    query = 'SELECT * FROM events'
    print(query)
    df = pd.read_sql(query,cnxn)
    return df

# def update_user_details(engine, NTID, first_name, last_name, email, phone, location, approved):

#  query = f"UPDATE Users SET first_name = '{first_name}', last_name = '{last_name}', email = '{email}', phone = '{phone}', location = '{location}', approved = '{approved}' WHERE NTID = '{NTID}'"

#  print(query)

#  #engine.execute(query)
#  engine.execute(query)

#  engine.commit()