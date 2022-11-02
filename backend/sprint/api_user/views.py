from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods

# Create your views here.
@require_http_methods(['POST'])
def signup(request):
    '''
    [POST] User sign up
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(['POST'])
def signin(request):
    '''
    [POST] User log in
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(['GET'])
def signout(request):
    '''
    [GET] User log out
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(['PUT', 'DELETE'])
def change(request):
    '''
    [PUT] Change User setting
    [DELETE] Delete User
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(['GET'])
def info(request, user_id:int):
    '''
    [GET] Get User info
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(['GET'])
def timetable(request, user_id:int):
    '''
    [GET] Get timetable of the user
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(['POST', 'PUT'])
def m_timetable(request, user_id:int):
    '''
    [POST] Create new timetable for the user
    [PUT] Change timetable of the user
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(['GET'])
def noti(request, user_id:int):
    '''
    [GET] Get notification of the user
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(['POST'])
def m_noti(request, user_id:int):
    '''
    [POST] Create notification for the user
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(['GET'])
def noti_detail(request, noti_id:int):
    '''
    [GET] Get the detail of the noti
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(['PUT', 'DELETE'])
def m_noti_detail(request, noti_id:int):
    '''
    [PUT] Change status of the noti
    [DELETE] Delete the notification
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(['GET'])
def image(request, user_id:int):
    '''
    [GET] Get the image of the user
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(['POST', 'PUT', 'DELETE'])
def m_image(request, user_id:int):
    '''
    [POST] Set User image
    [PUT] Change User image
    [DELETE] Delete User image
    '''
    # TODO
    return HttpResponse(status=200)
