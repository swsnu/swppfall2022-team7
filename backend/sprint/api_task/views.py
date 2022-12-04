import json
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods
from rest_framework.decorators import api_view
from drf_yasg.utils import swagger_auto_schema
from utility.custom_decorator import (
    return_bad_request_if_anonymous,
    return_bad_request_if_exception,
    return_bad_request_if_does_not_exist
)
from utility.serializers import (
    BaseResponse
)
from model_project.models import Task, Project, UserProject, DocumentSpace
from model_user.models import get_user_model
from api_task.tools.task import (
    get_task_list, create_task, get_task_detail,
    edit_task_detail, get_task_belong, get_document_space_list,
    edit_task_document, delete_task_document
)
from .serializers import (
    RequestTaskPOSTSerializer,
    RequestTaskDocuPOSTSerializer
)

# Create your views here.
@api_view(['GET'])
@require_http_methods(['GET'])
@return_bad_request_if_anonymous
@return_bad_request_if_does_not_exist
def get_task(request, project_id:int):
    '''
    [GET] Get task list of the project
    '''
    project = Project.objects.get(id=project_id)
    user = request.user
    if not UserProject.objects.filter(user=user, project=project).exists():
        return HttpResponse(status=403)
    ret_data = get_task_list(project, user)
    return JsonResponse(ret_data, safe=False, status=200)

@swagger_auto_schema(
    methods=['POST'],
    request_body=RequestTaskDocuPOSTSerializer,
    responses={
        '201': BaseResponse
    }
)
@api_view(['POST'])
@require_http_methods(['POST'])
@return_bad_request_if_exception
@return_bad_request_if_anonymous
@return_bad_request_if_does_not_exist
def m_task(request, project_id:int):
    '''
    [POST] Create new task for the project
    '''
    project = Project.objects.get(id=project_id)
    user = request.user
    if not UserProject.objects.filter(user=user, project=project).exists():
        return HttpResponse(status=403)
    get_data = json.loads(request.body.decode())
    print(get_data)
    ret_data = create_task(project, get_data, user)
    return JsonResponse(ret_data, status=201)

@api_view(['GET'])
@require_http_methods(['GET'])
@return_bad_request_if_anonymous
@return_bad_request_if_does_not_exist
def task_detail(request, task_id:int):
    '''
    [GET] Get task detail
    '''
    task = Task.objects.get(id=task_id)
    project = task.project
    user = request.user
    if not UserProject.objects.filter(user=user, project=project).exists():
        return HttpResponse(status=403)
    ret_data = get_task_detail(task)
    return JsonResponse(ret_data, status=200)

@swagger_auto_schema(
    methods=['PUT'],
    request_body=RequestTaskPOSTSerializer,
    responses={
        '200': BaseResponse,
    }
)
@api_view(['PUT', 'DELETE'])
@require_http_methods(['PUT', 'DELETE'])
@return_bad_request_if_exception
@return_bad_request_if_anonymous
@return_bad_request_if_does_not_exist
def m_task_detail(request, task_id:int):
    '''
    [PUT] Change task detail(ex. Assignee)
    [DELETE] Delete the task
    '''
    task = Task.objects.get(id=task_id)
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

@api_view(['GET'])
@require_http_methods(['GET'])
@return_bad_request_if_anonymous
@return_bad_request_if_does_not_exist
def task_belong(request, user_id:int):
    '''
    [GET] Get task list of the user
    '''
    user = get_user_model().objects.get(id=user_id)
    ret = get_task_belong(user)
    return JsonResponse(ret, safe=False, status=200)

@api_view(['GET'])
@require_http_methods(['GET'])
@return_bad_request_if_anonymous
@return_bad_request_if_does_not_exist
def task_document(request, task_id:int):
    '''
    [GET] Get document space list of the task
    '''
    task = Task.objects.get(id=task_id)
    project = task.project
    user = request.user
    if not UserProject.objects.filter(user=user, project=project).exists():
        return HttpResponse(status=403)
    ret = get_document_space_list(task)
    return JsonResponse(ret, safe=False, status=200)

@swagger_auto_schema(
    methods=['POST', 'DELETE'],
    request_body=RequestTaskDocuPOSTSerializer,
    responses={
        '200': BaseResponse
    }
)
@api_view(['POST', 'DELETE'])
@require_http_methods(['POST', 'DELETE'])
@return_bad_request_if_exception
@return_bad_request_if_anonymous
@return_bad_request_if_does_not_exist
def m_task_document(request, task_id:int):
    '''
    [POST] Connect documnet space and the task
    [DELETE] Disconnect document space and the task
    '''
    task = Task.objects.get(id=task_id)
    project = task.project
    user = request.user
    if not UserProject.objects.filter(user=user, project=project).exists():
        return HttpResponse(status=403)
    get_data = json.loads(request.body.decode())
    document_id = get_data['documentId']
    docuspace = DocumentSpace.objects.get(id=document_id)
    if request.method == 'POST':
        edit_task_document(task, docuspace)
        return HttpResponse(status=201)
    elif request.method == 'DELETE':
        delete_task_document(task, docuspace)
        return HttpResponse(status=204)
