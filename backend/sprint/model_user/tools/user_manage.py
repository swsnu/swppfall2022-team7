from django.contrib.auth.models import User

def get_user_by_id(id: int) :
    user=User.objects.filter(id=id)
    if user.exists() :
        return user.first()
    return None