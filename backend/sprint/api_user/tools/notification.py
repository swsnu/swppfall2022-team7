from django.contrib.auth.models import User
from model_user.models import Notification
from utility.date_string import date_to_string

def get_notification_list(user: User) :
    notifications = Notification.objects.filter(user = user).order_by('-created_at')
    noti_list = []
    for notification in notifications :
        noti_list.append({
            "content": notification.content,
            "link": notification.link,
            "checked": notification.checked,
            "created_at": date_to_string(notification.created_at),  
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
            "created_at": date_to_string(notification.created_at),  
            "id": notification.id
        })

    return noti_list
