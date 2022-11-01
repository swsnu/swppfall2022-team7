from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods

# Create your views here.
@require_http_methods(["POST"])
def signup(request):
    '''
    [POST] User sign up
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(["POST"])
def signin(request):
    '''
    [POST] User log in
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(["GET"])
def signout(request):
    '''
    [GET] User log out
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(["PUT", "DELETE"])
def change(request):
    '''
    [PUT] Change User setting
    [DELETE] Delete User
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(["GET"])
def info(request, user_id:int):
    '''
    [GET] Get User info
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(["GET", "POST", "PUT"])
def timetable(request, user_id:int):
    '''
    [GET] Get timetable of the user
    [POST] Create new timetable for the user
    [PUT] Change timetable of the user
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(["GET", "POST"])
def noti(request, user_id:int):
    '''
    [GET] Get notification of the user
    [POST] Create notification for the user
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(["GET", "PUT", "DELETE"])
def noti_detail(request, noti_id:int):
    '''
    [GET] Get the detail of the noti
    [PUT] Change status of the noti
    [DELETE] Delete the notification
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(["GET", "POST", "PUT", "DELETE"])
def image(request, user_id:int):
    '''
    [GET] Get the image of the user
    [POST] Set User image
    [PUT] Change User image
    [DELETE] Delete User image
    '''
    # TODO
    return HttpResponse(status=200)
