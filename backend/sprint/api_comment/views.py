from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods

# Create your views here.
@require_http_methods(['GET', 'POST'])
def comment(request, task_id:int):
    '''
    [GET] Get comment list of the task
    [POST] Create new comment for the task
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(['GET', 'PUT', 'DELETE'])
def comment_detail(request, comment_id:int):
    '''
    [GET] Get comment detail
    [PUT] Change the comment
    [DELETE] Delete the comment
    '''
    # TODO
    return HttpResponse(status=200)
