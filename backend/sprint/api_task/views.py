import json

from django.http import HttpRequest, HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods

from model_project.tools.project_manage import get_project_by_id
from .tools.task_manage import create_task

# Create your views here.
@require_http_methods(['GET'])
def task(request, project_id:int):
    '''
    [GET] Get task list of the project
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(['POST'])
def m_task(request: HttpRequest, project_id: int):
    data=json.loads(request.body.decode())
    project = get_project_by_id(project_id)
    task = create_task(project, data)
    return JsonResponse(status=204, data=task)

@require_http_methods(['GET'])
def task_detail(request, task_id:int):
    '''
    [GET] Get task detail
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(['PUT', 'DELETE'])
def m_task_detail(request, task_id:int):
    '''
    [PUT] Change task detail(ex. Assignee)
    [DELETE] Delete the task
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(['GET'])
def task_belong(request, user_id:int):
    '''
    [GET] Get task list of the user
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(['GET'])
def task_document(request, task_id:int):
    '''
    [GET] Get document space list of the task
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(['POST', 'DELETE'])
def m_task_document(request, task_id:int):
    '''
    [POST] Connect documnet space and the task
    [DELETE] Disconnect document space and the task
    '''
    # TODO
    return HttpResponse(status=200)
