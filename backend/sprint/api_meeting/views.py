from django.http import HttpResponse, JsonResponse

# Create your views here.
def meeting(request, project_id:int):
    '''
    [GET] Get meeting list of the project
    [POST] Create new meeting for the project
    '''
    # TODO
    return HttpResponse(status=200)

def meeting_detail(request, meeting_id:int):
    '''
    [GET] Get meeting detail
    [PUT] Change meeting detail
    [DELETE] Delete the meeting
    '''
    # TODO
    return HttpResponse(status=200)
