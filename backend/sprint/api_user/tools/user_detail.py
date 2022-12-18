import datetime, os

from model_user.models import Timetable, Image

from django.contrib.auth.models import User
from django.conf import settings

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
    return img.image.name
