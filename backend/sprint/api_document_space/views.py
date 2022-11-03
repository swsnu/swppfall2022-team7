from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods

# Create your views here.
@require_http_methods(['GET'])
def docuspace(request, project_id:int):
    '''
    [GET] Get document space list of the project
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(['POST'])
def m_docuspace(request, project_id:int):
    '''
    [POST] Create new document space
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(['GET'])
def docuspace_detail(request, docuspace_id:int):
    '''
    [GET] Get document space detail
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(['PUT', 'DELETE'])
def m_docuspace_detail(request, docuspace_id:int):
    '''
    [PUT] Change document space detail
    [DELETE] Delete document space
    '''
    # TODO
    return HttpResponse(status=200)
