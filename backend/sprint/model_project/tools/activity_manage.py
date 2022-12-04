from model_project.models import UserProjectActivity, UserProject, Task
from model_user.tools.noti_manage import send_notification_upa


def push_activity(user_project: UserProject, task: Task, activity_type, **foreign_keys) :
    if activity_type in UserProjectActivity.ActivityType.TASK_RELATED_ACTIVITY :
        upa = UserProjectActivity.objects.create(
            user_project = user_project,
            task = task,
            activity_type = activity_type
        )
    elif activity_type in UserProjectActivity.ActivityType.COMMENT_RELATED_ACTIVITY :
        if not 'comment' in foreign_keys :
            raise Exception('comment argument needed')
        
        upa = UserProjectActivity.objects.create(
            user_project = user_project,
            task = task,
            activity_type = activity_type,
            comment = foreign_keys['comment']
        )
    elif activity_type in UserProjectActivity.ActivityType.DOCUMENT_RELATED_ACTIVITY :
        if not 'document' in foreign_keys :
            raise Exception('document argument needed')
        
        upa = UserProjectActivity.objects.create(
            user_project = user_project,
            task = task,
            activity_type = activity_type,
            document = foreign_keys['document']
        )
    elif activity_type in UserProjectActivity.ActivityType.DOCUMENT_SPACE_RELATED_ACTIVITY :
        if not 'document_space' in foreign_keys :
            raise Exception('document_space argument needed')
        
        upa = UserProjectActivity.objects.create(
            user_project = user_project,
            task = task,
            activity_type = activity_type,
            document_space = foreign_keys['document_space']
        )
    
    send_notification_upa(upa)