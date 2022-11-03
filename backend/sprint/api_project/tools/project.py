from django.contrib.auth.models import User
from model_project.models import UserProject, Project, Task

def get_project_list(user: User):
    qs_project_list=UserProject.objects.select_related('project').filter(user=user)
    project_list = []
    for q_project_list in qs_project_list :
        project: Project = q_project_list.project
        project_list.append({
            "id": project.id,
            "name": project.name,
            "subject": project.subject,
            "manager": project.manager.id
        })
    return project_list

def get_project_detail(project: Project):
    qs_member_list = UserProject.objects.select_related('user').filter(project=project)
    member_list = []
    for q_member_list in qs_member_list :
        member: User = q_member_list.user
        member_list.append({
            "id": member.id,
            "username": member.username,
            "email": member.email
        })
        
    qs_task = Task.objects.filter(project=project)
    task_list = []
    for task in qs_task:
        task: Task
        task_list.append({
            "id": task.id,
            "name": task.name,
            "assignee": task.assignee.id if task.assignee is not None else None,
            "content": task.content,
            "until_at": task.until_at
        })
    
    return {
        "id": project.id,
        "name": project.name,
        "subject": project.subject,
        "manager": project.manager.id,
        "member_list": member_list,
        "task_list": task_list,
    }