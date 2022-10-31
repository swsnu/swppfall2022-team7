from django.http import HttpResponse, JsonResponse

# Create your views here.
def document(request, docuspace_id:int):
    '''
    [GET] Get document list of the document space
    [POST] Create document for the document space
    '''
    # TODO
    return HttpResponse(status=200)

def document_detail(request, document_id:int):
    '''
    [GET] Get document detail
    [PUT] Change detail of the document
    [DELETE] Delete the document
    '''
    # TODO
    return HttpResponse(status=200)
