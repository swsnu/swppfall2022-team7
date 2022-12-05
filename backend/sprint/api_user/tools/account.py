from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.db.models import Q

from django.core.mail import EmailMessage

def send_email(email: str, title: str, content: str): 
    email = EmailMessage(
        'title',
        'content',
        to=[email],
    )
    # email.send()

def create_user(data: dict) :
    username=data['username']
    email=data['email']
    password=data['password']
    if User.objects.filter(email=email).exists() or User.objects.filter(username=username):
        return None
    return User.objects.create_user(username=username, password=password, email=email)

def get_user(data: dict) -> User:
    email=data['email']
    password=data['password']
    user=User.objects.filter(email=email)
    if not User.objects.filter(email=email).exists() :
        return None
    user=authenticate(username=user.first().username, password=password)
    return user

def convert_user_to_dict(user: User) :
    return {
        'email': user.email,
        'username': user.username,
        'id': user.id
    }

def edit_user(data: dict, user: User) -> User :
    user.username = data['username']
    user.save()
    return user

def delete_user(user: User) :
    user.delete()

def send_invite_email(user_email: str, project) :
    send_email(
        user_email,
        f"[SPRINT] Register to SPRINT and join the team '{project.name}'",
        f"{project.manager.username} has invited you to the '{project.name}'!"
    )
    return

def listup_user_by_query(query: str) :
    user_list = User.objects.filter(Q(email__contains=query) | Q(username__contains=query)).order_by('username').values()
    
    return [{
        "email": user['email'],
        "username": user['username'],
        "id": user['id']
    } for user in user_list]