from datetime import datetime, timedelta, date

def date_to_string(date_time: datetime):
    now = datetime.now()
    delta_minute = (now-date_time).seconds//60
    delta_day = (now-date_time).days
    if now < date_time + timedelta(minutes=1) :
        date_str = "few seconds ago"
    elif now < date_time + timedelta(minutes=5) :
        date_str = "few minutes ago"
    elif now < date_time + timedelta(minutes=60) :
        date_str = f"{delta_minute} minutes ago"
    elif now < date_time + timedelta(hours=3) :
        date_str = "few hours ago"
    elif now < date_time + timedelta(hours=24) :
        date_str = f"{delta_minute//60} hours ago"
    elif now < date_time + timedelta(days=2) :
        date_str = "yesterday"
    elif now < date_time + timedelta(days=7) :
        date_str = f"{delta_day} days ago"
    elif now < date_time + timedelta(days=30) :
        date_str = f"{delta_day//7} weeks ago"
    elif now < date_time + timedelta(days=120) :
        date_str = "few months ago"
    else :
        date_str = datetime.strftime(date_time, '%Y-%m-%d')

    return date_str

def date_to_string_day(date_time: date):
    if datetime.now().date() == date_time :
        date_str = "Today"
    elif datetime.now().date() == timedelta(days=1) + date_time:
        date_str = "Yesterday"
    else :
        date_str = datetime.strftime(date_time, '%b %-d, %Y')

    return date_str

def string_to_date(date_string: str):
    ''' It should change string to date '''
    date_str = datetime.strptime(date_string, '%Y-%m-%d')
    return date_str
