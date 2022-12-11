import json

from django.contrib.auth import logout
from django.http import HttpResponse, HttpResponseRedirect
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.authtoken.models import Token
from drf_yasg.utils import swagger_auto_schema

from model_user.tools.user_manage import get_user_by_id
from model_user.models import Image
from utility.custom_decorator import (
    return_bad_request_if_anonymous,
    return_bad_request_if_exception
)
from utility.serializers import (
    BaseResponse
)

from .tools.account import (
    create_user,
    get_user,
    edit_user,
    delete_user,
    convert_user_to_dict,
    listup_user_by_query,
    verify_user,
)

from .tools.notification import (
    get_notification_list,
    get_notification_list_short
)

from .tools.user_detail import (
    upload_profile,
    get_profile,
    delete_profile
)

from .serializers import (
    RequestSignupPOSTSerializer,
    RequestSigninPOSTSerializer,
    RequestEditUserPOSTSerializer,
    ResponseSignupPOSTSerializer200,
    ResponseSignupPOSTSerializer401,
)

# Create your views here.
@swagger_auto_schema(
    methods=['POST'],
    request_body=RequestSignupPOSTSerializer,
    responses={
        "200": ResponseSignupPOSTSerializer200,
        "401": ResponseSignupPOSTSerializer401
    }
)
@api_view(['POST'])
@require_http_methods(['POST'])
@return_bad_request_if_exception
def signup(request: Request):
    data=json.loads(request.body.decode())
    user=create_user(data)
    if user is not None :
        return Response(status=200, data=convert_user_to_dict(user))
    return Response(status=401)

@swagger_auto_schema(
    methods=['POST'],
    request_body=RequestSigninPOSTSerializer,
    responses={
        "200": BaseResponse
    }
)
@api_view(['POST'])
@require_http_methods(['POST'])
@return_bad_request_if_exception
def signin(request: Request):
    data=request.data
    user=get_user(data)
    if user is not None:
        if Token.objects.filter(user = user).exists() :
            token = Token.objects.get(user = user).key
        else :
            token  = Token.objects.create(user = user).key

        return Response (status=200, data ={
            "token" : token,
            "id" : user.id,
            "username": user.username,
            "email": user.email,
            'image': Image.objects.get(user=user).image.name
        })
    return Response(status=401)

@api_view(['GET'])
@require_http_methods(['GET'])
@return_bad_request_if_anonymous
def signout(request: Request):
    logout(request)
    return HttpResponse(status=204)


@swagger_auto_schema(
    methods=['PUT'],
    request_body=RequestEditUserPOSTSerializer,
    responses={
        "200": BaseResponse
    }
)
@api_view(['PUT', 'DELETE'])
@require_http_methods(['PUT', 'DELETE'])
@return_bad_request_if_anonymous
def change(request: Request):
    user = request.user
    if request.method == 'PUT' :
        user = edit_user(request.data, user)
        return Response(
            status = 201,
            data = convert_user_to_dict(user)
        )
    elif request.method == 'DELETE' :
        delete_user(request.user)
        return HttpResponse(status=204)
    return HttpResponse(status=200)

@api_view(['GET'])
@require_http_methods(['GET'])
@return_bad_request_if_anonymous
def info(request: Request, user_id:int):
    user = get_user_by_id(user_id)
    if user is None :
        return HttpResponse(status=403)
    return Response(status=200, data=convert_user_to_dict(user))

@api_view(['GET'])
@require_http_methods(['GET'])
@return_bad_request_if_anonymous
def auto_compelete(request: Request, query: str) :
    return Response(status=200, data=listup_user_by_query(query))

@api_view(['GET'])
@require_http_methods(['GET'])
@return_bad_request_if_anonymous
def auto_compelete_member(request: Request, project_id: int, query: str) :
    return Response(status=200, data=listup_user_by_query(query, project_id))


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

@api_view(['GET'])
@require_http_methods(['GET'])
@return_bad_request_if_anonymous
def noti(request: Request):
    return Response(status=200, data=get_notification_list(request.user))

@api_view(['GET'])
@require_http_methods(['GET'])
@return_bad_request_if_anonymous
def noti_short(request: Request, num: int):
    return Response(status=200, data=get_notification_list_short(request.user, num))

@api_view(['GET'])
@require_http_methods(['GET'])
@return_bad_request_if_anonymous
def image(request):
    '''
    [GET] Get the image of the user
    '''
    get_profile(request.user)
    return Response(status=200, data=convert_user_to_dict(request.user))

@api_view(['POST', 'DELETE'])
@require_http_methods(['POST', 'DELETE'])
@return_bad_request_if_anonymous
def m_image(request: Request):
    '''
    [POST] Set User image
    [PUT] Change User image
    [DELETE] Delete User image
    '''
    if request.method == 'POST':
        upload_profile(request.user, request.data["image"])
        return Response(status=201, data=convert_user_to_dict(request.user))
    elif request.method == 'DELETE':
        delete_profile(request.user)
        return Response(status=204)

@ensure_csrf_cookie
@require_http_methods(['GET'])
def csrf_token(request):
    return HttpResponse(status=204)

@require_http_methods(['GET'])
def verify(request, hash_str: str):
    verify_user(hash_str)
    return HttpResponseRedirect(redirect_to="https://www.swppsprint.site")
