from datetime import datetime

def date_to_string(date_time: datetime):
    ''' It should change date to string '''
    return datetime.strftime(date_time, '%Y-%m-%d')

def string_to_date(date_string: str):
    ''' It should change string to date '''
    return datetime.strptime(date_string, '%Y-%m-%d')
