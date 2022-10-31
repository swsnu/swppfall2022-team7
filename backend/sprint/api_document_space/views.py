from django.http import HttpResponse, JsonResponse

# Create your views here.
def docuspace(request, project_id:int):
    '''
    [GET] Get document space list of the project
    [POST] Create new document space
    '''
    # TODO
    return HttpResponse(status=200)

def docuspace_detail(request, docuspace_id:int):
    '''
    [GET] Get document space detail
    [PUT] Change document space detail
    [DELETE] Delete document space
    '''
    # TODO
    return HttpResponse(status=200)
