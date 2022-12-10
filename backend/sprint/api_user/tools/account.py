import secrets

from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.db.models import Q
from django.core.mail import EmailMessage

from model_user.models import UserVerification
from model_project.models import Project, UserProject

def send_email(email: str, title: str, content: str): 
    email = EmailMessage(
        title,
        content,
        to=[email],
    )
    email.send()

def create_user(data: dict) :
    username=data['username']
    email=data['email']
    password=data['password']
    if User.objects.filter(email=email).exists() or User.objects.filter(username=username):
        return None
    user = User.objects.create_user(username=username, password=password, email=email)
    user.is_active = False
    user.save()
    
    hash_str = secrets.token_urlsafe(16)
    url = f"https://api.swppsprint.site/user/verify/{hash_str}/"
    send_email(
        email = email,
        title = "[SPRINT] Please verify your account",
        content = f"Hi, {username}! \n\n Please verify your account by clicking below link! \n\n" + 
        f"{url}"
    )
    UserVerification.objects.create(
        user = user,
        hash_string = hash_str
    )
    return user

def verify_user(hash_str):
    user_ver = UserVerification.objects.filter(hash_string = hash_str)
    if user_ver.exists() :
        user = user_ver.first()
        user.user.is_active = True
        user.user.save()
    return

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
    # send_email(
    #     user_email,
    #     f"[SPRINT] Register to SPRINT and join the team '{project.name}'",
    #     f"{project.manager.username} has invited you to the '{project.name}'!"
    # )
    return

def listup_user_by_query(query: str, project_id = -1) :
    if project_id != -1 :
        project = Project.objects.get(id=project_id)
        user_projects = UserProject.objects.filter(
            Q(project=project) & 
            Q(user__is_active=True) & 
            (Q(user__email__contains=query) | Q(user__username__contains=query))
        ).select_related('user')
        user_list = [{
            "email": user_project.user.email,
            "username": user_project.user.username,
            "id": user_project.user.id
        } for user_project in user_projects]
    else :
        user_list = User.objects.filter((Q(email__contains=query) | Q(username__contains=query)) & Q(is_active=True)).order_by('username').values()

    return [{
        "email": user['email'],
        "username": user['username'],
        "id": user['id']
    } for user in user_list]