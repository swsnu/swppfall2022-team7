from datetime import datetime

from model_project.models import Task, Project, TaskDocumentSpace, DocumentSpace, UserProject, UserProjectActivity
from model_user.models import get_user_model, Image
from utility.date_string import date_to_string, string_to_date, date_to_string_day
from model_project.tools.activity_manage import push_activity
from model_project.tools.project_manage import get_task_document_space_list
from api_comment.tools.comment_manage import get_comment_list_by_task_id

def get_task_list(project: Project, user: get_user_model()):
    tasks = Task.objects.filter(project=project)
    ret = []
    for task in tasks:
        ret.append(get_task_detail(task))
    return ret

def create_task(project: Project, get_data: dict, requester):
    assignee_email = get_data['assignee']
    name = get_data['name']
    content = get_data['content']
    until_at = get_data['untilAt']
    if assignee_email != '' :
        user = get_user_model().objects.get(email=assignee_email)
    else :
        user = None
    task = Task.objects.create(
        name = name,
        project = project,
        content = content,
        assignee = user,
        until_at = string_to_date(until_at)
    )
    ret = get_task_detail(task)

    user_project = UserProject.objects.get(project = project, user = requester)
    push_activity(user_project, task, UserProjectActivity.ActivityType.CREATE_TASK)
    return ret

def get_task_detail(task: Task):
    ret = {
        'id': task.id,
        'projectId': task.project.id,
        'project': task.project.name,
        'assignee': { 'id': task.assignee.id, 'username': task.assignee.username, 'image': Image.objects.get(user=task.assignee).image.name } if task.assignee is not None else {'id': -1, 'username': 'none', 'image': ''},
        'name': task.name,
        'content': task.content,
        'createdAt': date_to_string(task.created_at),
        'updatedAt': date_to_string(task.updated_at),
        'untilAt': datetime.strftime(task.until_at, '%Y-%m-%d'),
        'untilAt_str': date_to_string_day(task.until_at),
        'comment_list': get_comment_list_by_task_id(task.id),
        'document_space_list': get_task_document_space_list(task),
        'status': task.status
    }
    return ret

def edit_task_detail(task: Task, get_data: dict, requester):
    if 'assignee' in get_data :
        assignee_id = get_data['assignee']
        if assignee_id != -1 :
            user = get_user_model().objects.get(id=assignee_id)
            task.assignee = user
        else :
            task.assignee = None

    if 'name' in get_data :
        task.name = get_data['name']
    
    if 'content' in get_data :
        task.content = get_data['content']

    if 'untilAt' in get_data :
        task.until_at = string_to_date(get_data['untilAt'])

    if 'status' in get_data:
        if task.assignee != None :
            task.status = get_data['status']
    
    task.save()
    ret = get_task_detail(task)

    if task.status == 'done':
        user_project = UserProject.objects.get(user = task.assignee, project = task.project)
        push_activity(user_project, task, UserProjectActivity.ActivityType.COMPLETE_TASK)
    else :
        user_project = UserProject.objects.get(user = requester, project = task.project)
        push_activity(user_project, task, UserProjectActivity.ActivityType.EDIT_TASK)
    return ret

def get_task_belong(user: get_user_model()):
    tasks = Task.objects.filter(assignee=user)
    ret = []
    for task in tasks:
        ret.append(get_task_detail(task))
    return ret

def get_document_space_list(task: Task):
    task_docus = TaskDocumentSpace.objects.filter(task=task)
    ret = []
    for task_docu in task_docus:
        ret.append(get_document_space(task_docu.document_space))
    return ret

def get_document_space(docu: DocumentSpace):
    ret = {
        'id': docu.id,
        'name': docu.name,
        'project': docu.project.id,
        'head': docu.head
    }
    return ret

def edit_task_document(task: Task, docuspace: DocumentSpace):
    if TaskDocumentSpace.objects.filter(task=task, document_space=docuspace).exists():
        return
    TaskDocumentSpace.objects.create(
        task = task,
        document_space = docuspace,
    )
    return

def delete_task_document(task: Task, docuspace: DocumentSpace):
    if not TaskDocumentSpace.objects.filter(task=task, document_space=docuspace).exists():
        return
    TaskDocumentSpace.objects.get(
        task=task,
        document_space = docuspace
    ).delete()
    return
    