import json

from django.http import HttpRequest, HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods
from rest_framework.decorators import api_view
from drf_yasg.utils import swagger_auto_schema

from utility.custom_decorator import (
    return_bad_request_decorator,
    return_bad_request_if_not_authorized,
    AuthType
)
from utility.serializers import (
    BaseResponseError,
    BaseResponse
)

from model_user.tools.user_manage import get_user_by_id
from model_project.tools.project_manage import get_project_by_id

from .tools.project import (
    get_project_list, get_project_detail, create_project,
    edit_project, add_project_member, delete_project_member,
    get_project_timetable, get_project_timetable_detail
)
from .serializers import (
    RequestCreateProjectSerializer,
    RequestEditProjectSerializer
)

# Create your views here.
@api_view(['GET'])
@require_http_methods(['GET'])
@return_bad_request_decorator
def user_project(request, user_id:int):
    user = get_user_by_id(user_id)
    if user is None :
        return HttpResponse(status=401)
    project_list=get_project_list(user)
    return JsonResponse(status=200, data={
        "project_list": project_list
    })

@swagger_auto_schema(
    methods=['POST'],
    request_body=RequestCreateProjectSerializer,
    responses={
        "201": BaseResponse
    }
)
@api_view(['POST'])
@require_http_methods(['POST'])
@return_bad_request_decorator
def m_project(request: HttpRequest):
    data=json.loads(request.body.decode())
    project = create_project(data, request.user)
    return JsonResponse(status=201, data=project)

@api_view(['GET'])
@require_http_methods(['GET'])
@return_bad_request_decorator
@return_bad_request_if_not_authorized(AuthType.PROJECT)
def project_detail(request, project_id:int):
    project = get_project_by_id(project_id)
    if project is None :
        return HttpResponse(status=401)
    data = get_project_detail(project)
    return JsonResponse(status=200, data=data)


@swagger_auto_schema(
    methods=['PUT'],
    request_body=RequestEditProjectSerializer,
    responses={
        "201": BaseResponse
    }
)
@api_view(['PUT', 'DELETE'])
@require_http_methods(['PUT', 'DELETE'])
@return_bad_request_decorator
@return_bad_request_if_not_authorized(AuthType.PROJECT)
def m_project_detail(request: HttpRequest, project_id:int):
    # user = request.user
    project = get_project_by_id(project_id)
    # TODO: Check that the user has enough authority

    if project is None:
        return HttpResponse(status=401)
    if request.method == 'PUT' :
        data=json.loads(request.body.decode())
        edited_project = edit_project(project, data)
        return JsonResponse(status=201, data=edited_project)
    elif request.method == 'DELETE' :
        project.delete()
        return HttpResponse(status=204)

@api_view(['PUT', 'DELETE'])
@require_http_methods(['PUT', 'DELETE'])
@return_bad_request_decorator
@return_bad_request_if_not_authorized(AuthType.PROJECT)
def m_member(request, project_id:int, member_id: int):
    # user = request.user
    project = get_project_by_id(project_id)
    # TODO: Check that the user has enough authority

    if project is None:
        return HttpResponse(status=401)
    if request.method == 'PUT' :
        edited_project = add_project_member(project, member_id)
        return JsonResponse(status=201, data=edited_project)
    elif request.method == 'DELETE' :
        delete_project_member(project, member_id)
        return HttpResponse(status=204)

@api_view(['GET'])
@require_http_methods(['GET'])
@return_bad_request_decorator
@return_bad_request_if_not_authorized(AuthType.PROJECT)
def project_timetable(request, project_id:int):
    project = get_project_by_id(project_id)
    if project is None:
        return HttpResponse(status=401)
    data = get_project_timetable(project)
    return JsonResponse(data, status=200)

@api_view(['GET'])
@require_http_methods(['GET'])
@return_bad_request_decorator
@return_bad_request_if_not_authorized(AuthType.PROJECT)
def project_timetable_detail(request, project_id:int, row:int, col:int):
    project = get_project_by_id(project_id)
    if project is None:
        return HttpResponse(status=401)
    if row >= 30 or col >= 7 or row < 0 or col < 0 :
        return HttpResponse(status=400)
    data = get_project_timetable_detail(project, row, col)
    return JsonResponse(data, safe=False, status=200)
