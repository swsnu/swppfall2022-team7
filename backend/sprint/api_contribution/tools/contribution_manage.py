from model_project.models import Task, Project, TaskDocumentSpace, DocumentSpace, UserProject, UserProjectActivity
from api_user.tools.account import convert_user_to_dict
from model_user.tools.noti_manage import convert_upa_to_message
from utility.date_string import date_to_string


from django.contrib.auth.models import User

def get_user_quest_status(user_project: UserProject): 
    qs_upa = UserProjectActivity.objects.filter(user_project=user_project)

    compose_comment = qs_upa.filter(activity_type=UserProjectActivity.ActivityType.CREATE_COMMENT).exists()
    upload_document = qs_upa.filter(activity_type=UserProjectActivity.ActivityType.UPLOAD_DOCUMENT).exists()
    react_comment = qs_upa.filter(activity_type=UserProjectActivity.ActivityType.REACT_COMMENT).exists()
    complete_task = qs_upa.filter(activity_type=UserProjectActivity.ActivityType.COMPLETE_TASK).exists()
    
    status = {
        "Compose a comment": "Done" if compose_comment else "On Going",
        "Upload a document": "Done" if upload_document else "On Going",
        "React to a comment": "Done" if react_comment else "On Going",
        "Complete a task": "Done" if complete_task else "On Going",
    }
        
    return status

def get_member_quest_board(project_id: int):
    project = Project.objects.get(id=project_id)
    ret = []
    for user_project in UserProject.objects.filter(project=project) :
        user = user_project.user
        ret.append({
            "user": convert_user_to_dict(user),
            "board": get_user_quest_status(user_project)
        })
    
    return ret

def get_project_timeline(project_id: int):
    project = Project.objects.get(id=project_id)
    qs_upa = UserProjectActivity.objects.filter(user_project__project = project) \
        .select_related('user_project') \
        .select_related('user_project__user') \
        .select_related('user_project__project') \
        .order_by('-created_at')
    ret = []
    for upa in qs_upa:
        upa: UserProjectActivity
        if len(ret) == 0 or ret[-1]["date"] != upa.created_at.date() :
            ret.append({
                "date": upa.created_at.date(),
                "date_str": date_to_string(upa.created_at.date()),
                "logs": []
            })
        ret[-1]["logs"].append({
            "user": convert_user_to_dict(upa.user_project.user),
            "created_at": upa.created_at,
            "message": convert_upa_to_message(upa)
        })
    return ret