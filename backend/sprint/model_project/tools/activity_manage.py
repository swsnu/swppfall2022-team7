from model_project.models import UserProjectActivity, UserProject, Task

class ActivityType:
    CREATE_TASK = 1
    CREATE_DOCUMENT_SPACE = 2
    CREATE_COMMENT = 3
    UPLOAD_DOCUMMENT = 4
    DOWNLOAD_DOCUMMENT = 5
    ASSIGNED_TASK = 6
    EDIT_TASK = 7
    EDIT_COMMENT = 8
    REACT_COMMENT = 9
    COMPLETE_TASK = 10
    MENTIONED = 11
    
    TASK_RELATED_ACTIVITY = [CREATE_TASK, EDIT_TASK, COMPLETE_TASK, ASSIGNED_TASK, MENTIONED]
    COMMENT_RELATED_ACTIVITY = [CREATE_COMMENT, REACT_COMMENT, EDIT_COMMENT]
    DOCUMMENT_RELATED_ACTIVITY = [UPLOAD_DOCUMMENT, DOWNLOAD_DOCUMMENT]
    DOCUMMENT_SPACE_RELATED_ACTIVITY = [CREATE_DOCUMENT_SPACE]

def push_activity(user_project: UserProject, task: Task, activity_type, **foreign_keys) :
    if activity_type in ActivityType.TASK_RELATED_ACTIVITY :
        upa = UserProjectActivity.objects.create(
            user_project = user_project,
            task = task,
            activity_type = activity_type
        )