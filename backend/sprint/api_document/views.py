import json
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods
from rest_framework.decorators import api_view
from drf_yasg.utils import swagger_auto_schema

from utility.custom_decorator import (
    return_bad_request_if_anonymous,
    return_bad_request_if_exception,
    return_bad_request_if_does_not_exist
)

from utility.serializers import (
    BaseResponse
)

from model_project.models import DocumentSpace, UserProject, Document

from .tools.document import (
    get_document_list, create_document, get_document_detail,
    delete_document
)

# Create your views here.
@api_view(['GET'])
@require_http_methods(['GET'])
@return_bad_request_if_anonymous
@return_bad_request_if_does_not_exist
def document(request, docuspace_id:int):
    '''
    [GET] Get document list of the document space
    '''
    docuspace = DocumentSpace.objects.get(id=docuspace_id)
    project = docuspace.project
    user = request.user
    if not UserProject.objects.filter(project=project, user=user).exists():
        return HttpResponse(status=403)
    ret = get_document_list(docuspace)
    return JsonResponse(ret, safe=False, status=200)

@swagger_auto_schema(
    methods=['POST'],
    responses={
        '201': BaseResponse
    }
)
@api_view(['POST'])
@require_http_methods(['POST'])
@return_bad_request_if_exception
@return_bad_request_if_anonymous
@return_bad_request_if_does_not_exist
def m_document(request, docuspace_id:int):
    '''
    [POST] Create document for the document space
    '''
    docuspace = DocumentSpace.objects.get(id=docuspace_id)
    project = docuspace.project
    user = request.user
    if not UserProject.objects.filter(project=project, user=user).exists():
        return HttpResponse(status=403)
    ret = create_document(docuspace)
    return JsonResponse(ret, status=201)

@api_view(['GET'])
@require_http_methods(['GET'])
@return_bad_request_if_anonymous
@return_bad_request_if_does_not_exist
def document_detail(request, document_id:int):
    '''
    [GET] Get document detail
    '''
    docu = Document.objects.get(id=document_id)
    docuspace = docu.space
    project = docuspace.project
    user = request.user
    if not UserProject.objects.filter(project=project, user=user).exists():
        return HttpResponse(status=403)
    ret = get_document_detail(docu)
    return JsonResponse(ret, status=200)

@swagger_auto_schema(
    methods=['DELETE'],
    responses={
        '204': BaseResponse
    }
)
@api_view(['DELETE'])
@require_http_methods(['DELETE'])
@return_bad_request_if_anonymous
@return_bad_request_if_does_not_exist
def m_document_detail(request, document_id:int):
    '''
    [DELETE] Delete the document
    '''
    docu = Document.objects.get(id=document_id)
    docuspace = docu.space
    project = docuspace.project
    user = request.user
    if not UserProject.objects.filter(project=project, user=user).exists():
        return HttpResponse(status=403)
    delete_document(docu)
    return HttpResponse(status=204)
