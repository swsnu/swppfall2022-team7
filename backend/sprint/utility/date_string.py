from datetime import datetime

def date_to_string(d: datetime):
    ''' It should change date to string '''
    return datetime.strftime(d, '%Y-%m-%d')

def string_to_date(d: str):
    ''' It should change string to date '''
    return datetime.strptime(d, '%Y-%m-%d')