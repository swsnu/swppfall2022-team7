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
from model_project.models import Task, Project, UserProject, DocumentSpace
from model_user.models import get_user_model
from .tools.docuspace import (
    get_docuspace, create_docuspace, get_docuspace_detail,
    edit_docuspace_detail
)

# Create your views here.
@api_view(['GET'])
@require_http_methods(['GET'])
@return_bad_request_if_anonymous
@return_bad_request_if_does_not_exist
def docuspace(request, project_id:int):
    '''
    [GET] Get document space list of the project
    '''
    project = Project.objects.get(id=project_id)
    user = request.user
    if not UserProject.objects.filter(user=user, project=project).exists():
        return HttpResponse(status=403)
    ret = get_docuspace(project)
    return JsonResponse(ret, status=200)

@api_view(['POST'])
@require_http_methods(['POST'])
@return_bad_request_if_exception
@return_bad_request_if_anonymous
@return_bad_request_if_does_not_exist
def m_docuspace(request, project_id:int):
    '''
    [POST] Create new document space
    '''
    project = Project.objects.get(id=project_id)
    user = request.user
    if not UserProject.objects.filter(user=user, project=project).exists():
        return HttpResponse(status=403)
    ret = create_docuspace(project)
    return JsonResponse(ret, status=201)

@api_view(['GET'])
@require_http_methods(['GET'])
@return_bad_request_if_anonymous
@return_bad_request_if_does_not_exist
def docuspace_detail(request, docuspace_id:int):
    '''
    [GET] Get document space detail
    '''
    docuspace = DocumentSpace.objects.get(id=docuspace_id)
    project = docuspace.project
    user = request.user
    if not UserProject.objects.filter(user=user, project=project).exists():
        return HttpResponse(status=403)
    ret = get_docuspace_detail(docuspace)
    return JsonResponse(ret, status=200)

@api_view(['PUT', 'DELETE'])
@require_http_methods(['PUT', 'DELETE'])
@return_bad_request_if_exception
@return_bad_request_if_anonymous
@return_bad_request_if_does_not_exist
def m_docuspace_detail(request, docuspace_id:int):
    '''
    [PUT] Change document space detail
    [DELETE] Delete document space
    '''
    docuspace = DocumentSpace.objects.get(id=docuspace_id)
    project = docuspace.project
    user = request.user
    if not UserProject.objects.filter(user=user, project=project).exists():
        return HttpResponse(status=403)
    if request.method == 'PUT':
        ret = edit_docuspace_detail(docuspace)
        return JsonResponse(ret, status=200)
    elif request.method == 'DELETE':
        docuspace.delete()
        return HttpResponse(status=204)
