from django.contrib.auth.models import User
from django.contrib.auth import authenticate

def create_user(data: dict) :
    username=data['username']
    email=data['email']
    password=data['password']
    if User.objects.filter(email=email).exists() :
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

def send_invite_email(user_email: str) :
    print(f"send user email with email `{user_email}`")
    """
    TODO: send invite email
    """
    return
