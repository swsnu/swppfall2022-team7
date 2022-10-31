from django.http import HttpResponse, JsonResponse

# Create your views here.
def project(request, user_id:int):
    '''
    [GET] Get project list of the user
    [POST] Create new project for the user
    '''
    # TODO
    return HttpResponse(status=200)

def project_detail(request, project_id:int):
    '''
    [GET] Get the detail of the project
    [PUT] Change project detail
    [DELETE] Delete the project
    '''
    # TODO
    return HttpResponse(status=200)

def member(request, project_id:int):
    '''
    [GET] Get all members of the project
    [PUT] Add or Subtract members
    '''
    # TODO
    return HttpResponse(status=200)
