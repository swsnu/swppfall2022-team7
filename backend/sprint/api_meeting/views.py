from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods

# Create your views here.
@require_http_methods(['GET'])
def meeting(request, project_id:int):
    '''
    [GET] Get meeting list of the project
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(['POST'])
def m_meeting(request, project_id:int):
    '''
    [POST] Create new meeting for the project
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(['GET'])
def meeting_detail(request, meeting_id:int):
    '''
    [GET] Get meeting detail
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(['PUT', 'DELETE'])
def m_meeting_detail(request, meeting_id:int):
    '''
    [PUT] Change meeting detail
    [DELETE] Delete the meeting
    '''
    # TODO
    return HttpResponse(status=200)
