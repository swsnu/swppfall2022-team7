from model_project.models import Task, Project
from model_user.models import get_user_model
from utility.date_string import date_to_string, string_to_date

def get_task_list(project: Project, user: get_user_model()):
    tasks = Task.objects.filter(project=project)
    ret = []
    for task in tasks:
        ret.append(get_task_detail(task))
    return ret

def create_task(project: Project, get_data: dict):
    assignee_id = get_data['assignee']
    name = get_data['name']
    content = get_data['content']
    until_at = get_data['untilAt']
    task = Task.objects.create(
        name = name,
        project = project,
        content = content,
        assignee = get_user_model().objects.get(id=assignee_id),
        until_at = string_to_date(until_at)
    )
    ret = get_task_detail(task)
    return ret

def get_task_detail(task: Task):
    ret = {
        'id': task.id,
        'project': task.project.id,
        'assignee': { 'id': task.assignee.id, 'name': task.assignee.username },
        'name': task.name,
        'content': task.content,
        'createdAt': date_to_string(task.created_at),
        'updatedAt': date_to_string(task.updated_at),
        'untilAt': date_to_string(task.until_at)
    }
    return ret

def edit_task_detail(task: Task, get_data: dict):
    assignee_id = get_data['assignee']
    name = get_data['name']
    content = get_data['content']
    until_at = get_data['untilAt']
    task.assignee = get_user_model().objects.get(id=assignee_id)
    task.name = name
    task.content = content
    task.until_at = date_to_string(until_at)
    ret = get_task_detail(task)
    return ret

def get_task_belong(user: get_user_model()):
    tasks = Task.objects.filter(assignee=user)
    ret = []
    for task in tasks:
        ret.append(get_task_detail(task))
    return ret

def get_document_space_list(task: Task):
    pass
    