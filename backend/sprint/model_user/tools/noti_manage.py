from model_project.models import UserProjectActivity, UserProject
from model_user.models import Notification

from django.contrib.auth.models import User


def send_notification_upa(upa: UserProjectActivity) :
    if upa.activity_type == UserProjectActivity.ActivityType.DOWNLOAD_DOCUMENT :
        return

    message = ""

    if upa.activity_type == UserProjectActivity.ActivityType.CREATE_TASK :
        message = f"💻 <b>{upa.user_project.user.username}</b> created a new task <b>{upa.task.name}</b>"
    elif upa.activity_type == UserProjectActivity.ActivityType.CREATE_DOCUMENT_SPACE :
        message = f"💻 <b>{upa.user_project.user.username}</b> created a new document space <b>{upa.document_space.name}</b> to <b>{upa.task.name}</b>"
    elif upa.activity_type == UserProjectActivity.ActivityType.CREATE_COMMENT :
        message = f"✏️ <b>{upa.user_project.user.username}</b> commented on <b>{upa.task.name}</b>"
    elif upa.activity_type == UserProjectActivity.ActivityType.UPLOAD_DOCUMENT :
        message = f"✉️ <b>{upa.user_project.user.username}</b> uploaded a new document <b>{upa.document.name}</b> to <b>{upa.task.name}</b>"
    elif upa.activity_type == UserProjectActivity.ActivityType.ASSIGNED_TASK :
        message = f"🚀 <b>{upa.user_project.user.username}</b> assigned to the task <b>{upa.task.name}</b>"
    elif upa.activity_type == UserProjectActivity.ActivityType.EDIT_TASK :
        message = f"✏️ <b>{upa.user_project.user.username}</b> edited the task <b>{upa.task.name}</b>"
    elif upa.activity_type == UserProjectActivity.ActivityType.EDIT_COMMENT :
        message = f"✏️ <b>{upa.user_project.user.username}</b> edited the comment in <b>{upa.task.name}</b>"
    elif upa.activity_type == UserProjectActivity.ActivityType.REACT_COMMENT:
        message = f"✏️ <b>{upa.user_project.user.username}</b> left a react to the comment in <b>{upa.task.name}</b>"
    elif upa.activity_type == UserProjectActivity.ActivityType.COMPLETE_TASK :
        message = f"✏️ <b>{upa.user_project.user.username}</b> completed the task <b>{upa.task.name}</b>"
    
    member_list = UserProject.objects.select_related('user').filter(project=upa.user_project.project)
    
    for member in member_list :
        member: UserProject
        push_notification(member.user, message, f"/projects/{upa.user_project.project.id}/tasks/{upa.task.id}")

    return

def push_notification(user: User, message: str, link: str) :
    Notification.objects.create(
        user = user,
        content = message,
        link = link,
        checked = False
    )
    
    return

def send_project_invitation_notification(user_project: UserProject) :
    push_notification(
        user = user_project.user,
        message = f"📮 <b>{user_project.project.manager.username}</b> invited you to <b>{user_project.project.name}</b>",
        link = f"/projects/{user_project.project.id}"
    )
    
    return