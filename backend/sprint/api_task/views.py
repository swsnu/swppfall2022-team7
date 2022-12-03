from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods
from datetime import datetime
import json
from utility.custom_decorator import (
    return_bad_request_if_anonymous,
    return_bad_request_if_exception
)
from model_project.models import Task, Project, UserProject
from model_user.models import get_user_model
from api_task.tools.task import (
    get_task_list, create_task, get_task_detail,
    edit_task_detail, get_task_belong
)

# Create your views here.
@require_http_methods(['GET'])
@return_bad_request_if_anonymous
def task(request, project_id:int):
    '''
    [GET] Get task list of the project
    '''
    try: project = Project.objects.get(id=project_id)
    except: return HttpResponse(status=404)
    user = request.user
    if not UserProject.objects.filter(user=user, project=project).exists():
        return HttpResponse(status=403)
    ret_data = get_task_list(project, user)
    return JsonResponse(ret_data, safe=False, status=200)

@require_http_methods(['POST'])
@return_bad_request_if_exception
@return_bad_request_if_anonymous
def m_task(request, project_id:int):
    '''
    [POST] Create new task for the project
    '''
    try: project = Project.objects.get(id=project_id)
    except: return HttpResponse(status=404)
    user = request.user
    if not UserProject.objects.filter(user=user, project=project).exists():
        return HttpResponse(status=403)
    get_data = json.loads(request.body.decode())
    ret_data = create_task(project, get_data)
    return JsonResponse(ret_data, status=201)

@require_http_methods(['GET'])
@return_bad_request_if_anonymous
def task_detail(request, task_id:int):
    '''
    [GET] Get task detail
    '''
    try: task = Task.objects.get(id=task_id)
    except: return HttpResponse(status=404)
    project = task.project
    user = request.user
    if not UserProject.objects.filter(user=user, project=project).exists():
        return HttpResponse(status=403)
    ret_data = get_task_detail(task)
    return JsonResponse(ret_data, status=200)

@require_http_methods(['PUT', 'DELETE'])
@return_bad_request_if_exception
@return_bad_request_if_anonymous
def m_task_detail(request, task_id:int):
    '''
    [PUT] Change task detail(ex. Assignee)
    [DELETE] Delete the task
    '''
    try: task = Task.objects.get(id=task_id)
    except: return HttpResponse(status=404)
    project = task.project
    user = request.user
    if not UserProject.objects.filter(user=user, project=project).exists():
        return HttpResponse(status=403)
    if request.method == 'PUT':
        get_data = json.loads(request.body.decode())
        task = edit_task_detail(task, get_data)
        return JsonResponse(task, status=200)
    elif request.method == 'DELETE':
        task.delete()
        return HttpResponse(status=204)

@require_http_methods(['GET'])
@return_bad_request_if_anonymous
def task_belong(request, user_id:int):
    '''
    [GET] Get task list of the user
    '''
    try: user = get_user_model().objects.get(id=user_id)
    except: return HttpResponse(status=404)
    ret = get_task_belong(user)
    return JsonResponse(ret, safe=False, status=200)

@require_http_methods(['GET'])
@return_bad_request_if_anonymous
def task_document(request, task_id:int):
    '''
    [GET] Get document space list of the task
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(['POST', 'DELETE'])
@return_bad_request_if_exception
@return_bad_request_if_anonymous
def m_task_document(request, task_id:int):
    '''
    [POST] Connect documnet space and the task
    [DELETE] Disconnect document space and the task
    '''
    # TODO
    return HttpResponse(status=200)
