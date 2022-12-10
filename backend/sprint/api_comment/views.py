from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.request import Request
from django.views.decorators.http import require_http_methods
from drf_yasg.utils import swagger_auto_schema

from api_comment.tools.comment_manage import(
    get_comment_list_by_task_id,
    create_new_comment,
    edit_comment,
    delete_comment
)
from utility.custom_decorator import (
    return_bad_request_decorator,
    return_bad_request_if_not_authorized,
    AuthType
)

from utility.serializers import (
    BaseResponse
)

from .serializers import (
    RequestCreateCommentPostSerializer,
    RequestEditCommentPutSerializer
)

# Create your views here.
@api_view(['GET'])
@require_http_methods(['GET'])
@return_bad_request_decorator
@return_bad_request_if_not_authorized(AuthType.TASK)
def comment(request: Request, task_id:int):
    '''
    [GET] Get comment list of the task
    '''
    return Response(status=200, data=get_comment_list_by_task_id(task_id))


@api_view(['POST'])
@require_http_methods(['POST'])
@return_bad_request_decorator
@return_bad_request_if_not_authorized(AuthType.TASK)
def m_comment(request: Request, task_id:int):
    '''
    [POST] Create new comment for the task
    '''
    return Response(status=200, data=create_new_comment(task_id, request.data, request.user))


@api_view(['PUT', 'DELETE'])
@require_http_methods(['PUT', 'DELETE'])
@return_bad_request_decorator
def m_comment_detail(request: Request, comment_id:int):
    '''
    [PUT] Change the comment
    [DELETE] Delete the comment
    '''
    if request.method == 'PUT':
        return Response(status=200, data=edit_comment(comment_id, request.data))
    elif request.method == 'DELETE':
        delete_comment(comment_id)
        return Response(status=204)
