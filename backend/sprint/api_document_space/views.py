import json
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods
from rest_framework.decorators import api_view
from drf_yasg.utils import swagger_auto_schema
from utility.custom_decorator import (
    return_bad_request_decorator,
    return_bad_request_if_not_authorized,
    AuthType
)
from utility.serializers import (
    BaseResponse
)
from model_project.models import Project, UserProject, DocumentSpace
from .tools.docuspace import (
    get_docuspace, create_docuspace, get_docuspace_detail,
    edit_docuspace_detail
)
from .serializers import (
    RequestDocuspaceDetailPOSTSerializer,
    RequestDocuspacePOSTSerializer
)

# Create your views here.
@api_view(['GET'])
@require_http_methods(['GET'])
@return_bad_request_decorator
@return_bad_request_if_not_authorized(AuthType.PROJECT)
def list_docuspace(request, project_id:int):
    '''
    [GET] Get document space list of the project
    '''
    project = Project.objects.get(id=project_id)
    ret = get_docuspace(project)
    return JsonResponse(ret, safe=False, status=200)

@swagger_auto_schema(
    methods=['POST'],
    request_body=RequestDocuspacePOSTSerializer,
    responses={
        '200': BaseResponse
    }
)
@api_view(['POST'])
@require_http_methods(['POST'])
@return_bad_request_decorator
@return_bad_request_if_not_authorized(AuthType.DOCUMENT)
def m_docuspace(request, project_id:int):
    '''
    [POST] Create new document space
    '''
    project = Project.objects.get(id=project_id)
    get_data = json.loads(request.body.decode())
    ret = create_docuspace(project, get_data)
    return JsonResponse(ret, status=201)

@api_view(['GET'])
@require_http_methods(['GET'])
@return_bad_request_decorator
@return_bad_request_if_not_authorized(AuthType.DOCUSPACE)
def docuspace_detail(request, docuspace_id:int):
    '''
    [GET] Get document space detail
    '''
    docuspace = DocumentSpace.objects.get(id=docuspace_id)
    ret = get_docuspace_detail(docuspace)
    return JsonResponse(ret, status=200)

@swagger_auto_schema(
    methods=['PUT', 'DELETE'],
    request_body=RequestDocuspaceDetailPOSTSerializer,
    responses={
        '200': BaseResponse
    }
)
@api_view(['PUT', 'DELETE'])
@require_http_methods(['PUT', 'DELETE'])
@return_bad_request_decorator
@return_bad_request_if_not_authorized(AuthType.DOCUSPACE)
def m_docuspace_detail(request, docuspace_id:int):
    '''
    [PUT] Change document space detail
    [DELETE] Delete document space
    '''
    docuspace = DocumentSpace.objects.get(id=docuspace_id)
    if request.method == 'PUT':
        get_data = json.loads(request.body.decode())
        ret = edit_docuspace_detail(docuspace, get_data)
        return JsonResponse(ret, status=200)
    elif request.method == 'DELETE':
        docuspace.delete()
        return HttpResponse(status=204)
