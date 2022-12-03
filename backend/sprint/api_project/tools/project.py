from django.contrib.auth.models import User
from model_project.models import UserProject, Project, Task

from model_project.tools.project_manage import (
    get_project_member_list,
    get_project_task_list,
    get_project_document_space_list,
    get_last_modified_timestamp
)

from model_user.tools.user_manage import get_user_by_id
from api_user.tools.account import send_invite_email

def get_project_list(user: User):
    qs_project_list=UserProject.objects.select_related('project').filter(user=user)
    project_list = []
    for q_project_list in qs_project_list :
        project: Project = q_project_list.project
        project_list.append({
            "id": project.id,
            "name": project.name,
            "subject": project.subject,
            "manager": project.manager.id,
            "member_list": get_project_member_list(project),
            "last_modified": get_last_modified_timestamp(project),
            "document_number": len(get_project_document_space_list(project)),
        })
    return project_list

def get_project_detail(project: Project):
    member_list = get_project_member_list(project)
    task_list = get_project_task_list(project)
    
    return {
        "id": project.id,
        "name": project.name,
        "subject": project.subject,
        "manager": project.manager.id,
        "member_list": member_list,
        "task_list": task_list,
    }

def create_project(data: dict, user: User) :
    project = Project.objects.create(
        name=data["name"],
        subject=data["subject"],
        manager=user
    )

    UserProject.objects.create(
        user=user,
        project=project
    )
    
    for member_email in data["member_list"] :
        member = User.objects.filter(email=member_email)
        if member.exists() :
            UserProject.objects.create(
                user=member.first(),
                project=project
            )
        else :
            send_invite_email(member_email)

    return {
        "id": project.id,
        "name": project.name,
        "subject": project.subject,
        "manager": project.manager.id,
        "member_list": get_project_member_list(project),
        "task_list": [],
    }

def edit_project(project: Project, data: dict) :
    if "name" in data :
        project.name = data["name"]
    
    if "subject" in data :
        project.subject = data["subject"]
    
    if "manager" in data :
        user = get_user_by_id(data["manager"])
        if user is None :
            raise ValueError("User does not exist")
        
        project.manager = user
    
    project.save()
        
    return get_project_detail(project)

def add_project_member(project: Project, member_id: int) :
    member = get_user_by_id(member_id)
    if member is None:
        raise ValueError("User does not exist")
    
    if not UserProject.objects.filter(user = member, project = project).exists() :
        UserProject.objects.create(
            user = member,
            project = project
        )
    
    return get_project_detail(project)

def delete_project_member(project: Project, member_id: int) :
    member = get_user_by_id(member_id)
    if member is None:
        raise ValueError("User does not exist")
    
    UserProject.objects.filter(user = member, project = project).delete()
    return