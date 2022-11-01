from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods

# Create your views here.
@require_http_methods(['GET', 'POST'])
def meeting(request, project_id:int):
    '''
    [GET] Get meeting list of the project
    [POST] Create new meeting for the project
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(['GET', 'PUT', 'DELETE'])
def meeting_detail(request, meeting_id:int):
    '''
    [GET] Get meeting detail
    [PUT] Change meeting detail
    [DELETE] Delete the meeting
    '''
    # TODO
    return HttpResponse(status=200)
