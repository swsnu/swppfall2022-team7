from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods

# Create your views here.
@require_http_methods(['GET', 'POST'])
def project(request, user_id:int):
    '''
    [GET] Get project list of the user
    [POST] Create new project for the user
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(['GET', 'PUT', 'DELETE'])
def project_detail(request, project_id:int):
    '''
    [GET] Get the detail of the project
    [PUT] Change project detail
    [DELETE] Delete the project
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(['GET', 'PUT'])
def member(request, project_id:int):
    '''
    [GET] Get all members of the project
    [PUT] Add or Subtract members
    '''
    # TODO
    return HttpResponse(status=200)
