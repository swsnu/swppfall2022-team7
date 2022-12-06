from datetime import datetime, timedelta, date

def date_to_string(date_time: datetime):
    now = datetime.now()
    delta_minute = (now-date_time).seconds//60
    delta_day = (now-date_time).days
    if now < date_time + timedelta(minutes=1) :
        return "few seconds ago"
    elif now < date_time + timedelta(minutes=5) :
        return "few minutes ago"
    elif now < date_time + timedelta(minutes=60) :
        return f"{delta_minute} minutes ago"
    elif now < date_time + timedelta(hours=3) :
        return "few hours ago"
    elif now < date_time + timedelta(hours=24) :
        return f"{delta_minute//60} hours ago"
    elif now < date_time + timedelta(days=2) :
        return "yesterday"
    elif now < date_time + timedelta(days=7) :
        return f"{delta_day} days ago"
    elif now < date_time + timedelta(days=30) :
        return f"{delta_day//7} weeks ago"
    elif now < date_time + timedelta(days=120) :
        return "few months ago"
    
    return datetime.strftime(date_time, '%Y-%m-%d')

def date_to_string_day(date_time: date):
    if type(date_time) == datetime :
        date_time = date_time.date()
        
    if datetime.now().date() == date_time :
        return "Today"
    elif datetime.now().date() == timedelta(days=1) + date_time:
        return "Yesterday"
    
    return datetime.strftime(date_time, '%b %-d, %Y')

def string_to_date(date_string: str):
    ''' It should change string to date '''
    return datetime.strptime(date_string, '%Y-%m-%d')
