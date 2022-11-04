from django.contrib.auth.models import User
from django.contrib.auth import authenticate

def create_user(data: dict) :
    username=data['username']
    email=data['email']
    password=data['password']
    if User.objects.filter(email=email).exists() :
        return None
    return User.objects.create_user(username=username, password=password, email=email)

def get_user(data: dict) :
    email=data['email']
    password=data['password']
    user=User.objects.filter(email=email)
    if not User.objects.filter(email=email).exists() :
        return None
    user=authenticate(username=user.first().username, password=password)
    return user
