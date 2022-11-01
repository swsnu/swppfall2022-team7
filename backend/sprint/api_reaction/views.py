from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods

# Create your views here.
@require_http_methods(['GET', 'POST'])
def reaction(request, comment_id:int):
    '''
    [GET] Get reaction list of the comment
    [POST] Create new reaction for the comment
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(['GET', 'PUT', 'DELETE'])
def reaction_detail(request, reaction_id:int):
    '''
    [GET] Get reaction detail
    [PUT] Change the reaction
    [DELETE] Delete the reaction
    '''
    # TODO
    return HttpResponse(status=200)
