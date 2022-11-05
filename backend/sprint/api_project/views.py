from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods
from utility.custom_decorator import return_bad_request_if_anonymous

from model_user.tools.user_manage import get_user_by_id
from model_project.tools.project_manage import get_project_by_id

from .tools.project import get_project_list, get_project_detail

# Create your views here.
@require_http_methods(['GET'])
@return_bad_request_if_anonymous
def user_project(request, user_id:int):
    user = get_user_by_id(user_id)
    if user is None :
        return HttpResponse(status=401)
    project_list=get_project_list(user)
    return JsonResponse(status=200, data={
        "project_list": project_list
    })

@require_http_methods(['POST'])
def m_project(request, user_id:int):
    '''
    [POST] Create new project for the user
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(['GET'])
@return_bad_request_if_anonymous
def project_detail(request, project_id:int):
    project = get_project_by_id(project_id)
    if project is None :
        return HttpResponse(status=401)
    data = get_project_detail(project)
    return JsonResponse(status=200, data=data)

@require_http_methods(['PUT', 'DELETE'])
def m_project_detail(request, project_id:int):
    '''
    [PUT] Change project detail
    [DELETE] Delete the project
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(['GET'])
def member(request, project_id:int):
    '''
    [GET] Get all members of the project
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(['PUT'])
def m_member(request, project_id:int):
    '''
    [PUT] Add or Subtract members
    '''
    # TODO
    return HttpResponse(status=200)
