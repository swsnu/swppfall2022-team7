from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods

# Create your views here.
@require_http_methods(['GET', 'POST'])
def docuspace(request, project_id:int):
    '''
    [GET] Get document space list of the project
    [POST] Create new document space
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(['GET', 'PUT', 'DELETE'])
def docuspace_detail(request, docuspace_id:int):
    '''
    [GET] Get document space detail
    [PUT] Change document space detail
    [DELETE] Delete document space
    '''
    # TODO
    return HttpResponse(status=200)
