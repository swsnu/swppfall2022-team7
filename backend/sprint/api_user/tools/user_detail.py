from datetime import datetime, timedelta
from model_user.models import Timetable, get_user_model

def get_timetable_of_user(user: get_user_model):
    tt = None
    if Timetable.objects.filter(user=user).exists():
        tt = Timetable.objects.get(user=user)
    if tt is None:
        tt = Timetable.objects.create(schedule=create_initial_timetable())
    return tt.schedule
        
def create_initial_timetable():
    ret = []
    week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    time = time(hour=9)
    while time < time(hour=24):
        ret.append({
            'time': datetime.strftime(time, '%H:%M'),
            'board': { w:'Freetime' for w in week }
        })
        time += timedelta(minutes=30)
    return ret