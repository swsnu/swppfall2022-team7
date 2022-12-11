from datetime import datetime

from django.contrib.auth.models import User
from model_project.models import Project, UserProject, Task, DocumentSpace, TaskDocumentSpace
from api_user.tools.user_detail import get_image_path_of_user
from utility.date_string import date_to_string

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
            "email": member.email,
            'image': get_image_path_of_user(member)
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
            "assignee_id": task.assignee.id if task.assignee is not None else None,
            "assignee": task.assignee.username if task.assignee is not None else None,
            "content": task.content,
            "until_at_r": task.until_at,
            "until_at": datetime.strftime(task.until_at, '%Y-%m-%d'),
            "updated_at_r" : task.updated_at,
            "updated_at" : date_to_string(task.updated_at),
            "document_space_list": get_task_document_space_list(task)
        })
    return task_list

def get_task_document_space_list(task: Task): 
    qs_task_document_space = TaskDocumentSpace.objects.filter(task = task).select_related('document_space')
    res = []
    for task_document_space in qs_task_document_space:
        document_space = task_document_space.document_space
        res.append({
            "id": document_space.pk,
            "name": document_space.name,
            "created_at" : date_to_string(document_space.created_at),
            "head": document_space.head,
        })
    return res

def get_project_document_space_list(project: Project) :
    qs_document_space = DocumentSpace.objects.filter(project = project)
    return [{
        "id": document_space.pk,
        "name": document_space.name,
        "created_at" : date_to_string(document_space.created_at),
        "head": document_space.head,
    } for document_space in qs_document_space]

def get_last_modified_timestamp(project: Project) :
    task_list = get_project_task_list(project)
    
    timestamp = project.created_at
    for task in task_list:
        if task['updated_at_r'] > timestamp :
            timestamp = task['updated_at_r']
    return date_to_string(timestamp)
