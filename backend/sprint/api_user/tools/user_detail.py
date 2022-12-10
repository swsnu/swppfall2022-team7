import datetime
from model_user.models import Timetable, get_user_model

def get_timetable_of_user(user: get_user_model):
    tt = None
    if Timetable.objects.filter(user=user).exists():
        tt = Timetable.objects.get(user=user)
    if tt is None:
        tt = Timetable.objects.create(user=user, schedule=create_initial_timetable())
    return tt.schedule
        
def create_initial_timetable():
    ret = []
    week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    ti = datetime.datetime(year=2022, month=1, day=1, hour=9)
    while ti < datetime.datetime(year=2022, month=1, day=1, hour=23, minute=59):
        ret.append({
            'time': datetime.datetime.strftime(ti, '%H:%M'),
            'board': { w:'Freetime' for w in week }
        })
        ti += datetime.timedelta(minutes=30)
    return ret