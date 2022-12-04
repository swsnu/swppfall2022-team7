from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.request import Request
from django.views.decorators.http import require_http_methods
from drf_yasg.utils import swagger_auto_schema

from utility.custom_decorator import (
    return_bad_request_if_anonymous,
    return_bad_request_if_exception,
    return_bad_request_if_does_not_exist
)

from utility.serializers import (
    BaseResponse
)

from .serializers import (
    RequestReactionPostSerializer
)

from .tools.reaction_manage import (
    get_reaction_list_by_comment_id,
    modify_reaction
)

# Create your views here.
@api_view(['GET'])
@require_http_methods(['GET'])
@return_bad_request_if_anonymous
@return_bad_request_if_does_not_exist
@return_bad_request_if_exception
def reaction(request: Request, comment_id:int):
    '''
    [GET] Get reaction list of the comment
    '''
    return Response(status=200, data=get_reaction_list_by_comment_id(comment_id))

@swagger_auto_schema(
    methods=['POST'],
    request_body=RequestReactionPostSerializer,
    responses={
        "200": BaseResponse
    }
)
@api_view(['POST'])
@require_http_methods(['POST'])
@return_bad_request_if_anonymous
@return_bad_request_if_does_not_exist
@return_bad_request_if_exception
def m_reaction(request: Request, comment_id:int):
    '''
    [POST] Create new reaction for the comment
    '''
    modify_reaction(comment_id, request.data, request.user)
    return Response(status=200, data=get_reaction_list_by_comment_id(comment_id))
