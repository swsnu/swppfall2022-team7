import json

from django.views.decorators.http import require_http_methods
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.request import Request
from drf_yasg.utils import swagger_auto_schema

from utility.custom_decorator import (
    return_bad_request_if_anonymous,
    return_bad_request_if_exception,
    return_bad_request_if_does_not_exist
)
from utility.serializers import (
    BaseResponseError,
    BaseResponse
)

from .serializers import (
    RequestDocuspacePOSTSerializer
)

from .tools.contribution_manage import (
    get_member_quest_board,
    get_project_timeline
)

@api_view(['GET'])
@require_http_methods(['GET'])
@return_bad_request_if_anonymous
@return_bad_request_if_does_not_exist
def member_quest(request, project_id:int):
    '''
    [GET] Get member quest board
    '''
    return Response(status=200, data=get_member_quest_board(project_id))

@api_view(['GET'])
@require_http_methods(['GET'])
@return_bad_request_if_anonymous
@return_bad_request_if_does_not_exist
def project_timeline(request, project_id:int):
    '''
    [GET] Get project timeline
    '''
    return Response(status=200, data=get_project_timeline(project_id))