from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods

# Create your views here.
@require_http_methods(['GET', 'POST'])
def document(request, docuspace_id:int):
    '''
    [GET] Get document list of the document space
    [POST] Create document for the document space
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(['GET', 'PUT', 'DELETE'])
def document_detail(request, document_id:int):
    '''
    [GET] Get document detail
    [PUT] Change detail of the document
    [DELETE] Delete the document
    '''
    # TODO
    return HttpResponse(status=200)
