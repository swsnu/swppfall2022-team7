from django.contrib.auth.models import User
from model_project.models import Project, UserProject, Task

def get_project_by_id(id: int) :
    project = Project.objects.filter(id=id)
    if project.exists() :
        return project.first()
    return None

def get_project_member_list(project: Project) :
    qs_member_list = UserProject.objects.select_related('user').filter(project=project)
    member_list = []
    for q_member_list in qs_member_list :
        member: User = q_member_list.user
        member_list.append({
            "id": member.id,
            "username": member.username,
            "email": member.email
        })
    return member_list

def get_project_task_list(project: Project) :
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
    return task_list
