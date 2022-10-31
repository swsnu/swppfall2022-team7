from django.http import HttpResponse, JsonResponse

# Create your views here.
def task(request, project_id:int):
    '''
    [GET] Get task list of the project
    [POST] Create new task for the project
    '''
    # TODO
    return HttpResponse(status=200)

def task_detail(request, task_id:int):
    '''
    [GET] Get task detail
    [PUT] Change task detail(ex. Assignee)
    [DELETE] Delete the task
    '''
    # TODO
    return HttpResponse(status=200)

def task_belong(request, user_id:int):
    '''
    [GET] Get task list of the user
    '''
    # TODO
    return HttpResponse(status=200)

def task_document(request, task_id:int):
    '''
    [GET] Get document space list of the task
    [POST] Connect documnet space and the task
    [DELETE] Disconnect document space and the task
    '''
    # TODO
    return HttpResponse(status=200)
