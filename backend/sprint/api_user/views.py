import json

from django.contrib.auth import logout, login
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import ensure_csrf_cookie

from utility.custom_decorator import (
    return_bad_request_if_anonymous,
    return_bad_request_if_exception
)
from .tools.account import create_user, get_user

# Create your views here.

#
@require_http_methods(['POST'])
@return_bad_request_if_exception
def signup(request: HttpRequest):
    data=json.loads(request.body.decode())
    user=create_user(data)
    if user is not None :
        return JsonResponse(status=200, data={
            "id" : user.id,
            "username" : user.username,
            "email" : user.email
        })
    return HttpResponse(status=401)

@require_http_methods(['POST'])
@return_bad_request_if_exception
def signin(request):
    data=json.loads(request.body.decode())
    user=get_user(data)
    if user is not None:
        login(request, user)
        return HttpResponse(status=204)
    return HttpResponse(status=401)

@require_http_methods(['GET'])
@return_bad_request_if_anonymous
def signout(request):
    logout(request)
    return HttpResponse(status=204)

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

@ensure_csrf_cookie
@require_http_methods(['GET'])
def token(request):
    return HttpResponse(status=204)
