import datetime, os

from model_user.models import Timetable, Image

from django.contrib.auth.models import User
from django.conf import settings


def get_timetable_of_user(user: User):
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

def upload_profile(user: User, img): 
    image = Image.objects.filter(user=user)
    if image.exists() :
        image = image.first()
        os.remove(os.path.join(settings.MEDIA_ROOT, image.image.name))
        image.image = img
        image.save()
    else :
        image=Image.objects.create(
            user=user,
            image=img,
        )
    return image

def get_profile(user: User): 
    img = Image.objects.filter(user=user) 
    if img.exists():
        return img.first()
    else :
        return None

def delete_profile(user: User):
    img = Image.objects.filter(user=user)
    if img.exists():
        img = img.first()
        os.remove(os.path.join(settings.MEDIA_ROOT, img.image.name))
        img.delete()

def get_image_path_of_user(user: User):
    img = get_profile(user)
    if img is None:
        return ''
    return img.name
