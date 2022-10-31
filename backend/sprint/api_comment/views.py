from django.http import HttpResponse, JsonResponse

# Create your views here.
def comment(request, task_id:int):
    '''
    [GET] Get comment list of the task
    [POST] Create new comment for the task
    '''
    # TODO
    return HttpResponse(status=200)

def comment_detail(request, comment_id:int):
    '''
    [GET] Get comment detail
    [PUT] Change the comment
    [DELETE] Delete the comment
    '''
    # TODO
    return HttpResponse(status=200)
