from django.contrib.auth.models import User
from model_user.models import Notification

def get_notification_list(user: User) :
    notifications = Notification.objects.filter(user = user).order_by('-created_at')
    noti_list = []
    for notification in notifications :
        noti_list.append({
            "content": notification.content,
            "link": notification.link,
            "checked": notification.checked,
            "created_at": notification.created_at,  
            "id": notification.id,
        })
        if not notification.checked:
            notification.checked = True
            notification.save()

    return noti_list

def get_notification_list_short(user: User, num: int) :
    notifications = Notification.objects.filter(user = user).order_by('-created_at')
    noti_list = []
    for notification in notifications[:num] :
        noti_list.append({
            "content": notification.content,
            "link": notification.link,
            "checked": notification.checked,
            "created_at": notification.created_at,  
            "id": notification.id
        })

    return noti_list
