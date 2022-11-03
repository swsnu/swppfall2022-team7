from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods

# Create your views here.
@require_http_methods(['GET'])
def reaction(request, comment_id:int):
    '''
    [GET] Get reaction list of the comment
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(['POST'])
def m_reaction(request, comment_id:int):
    '''
    [POST] Create new reaction for the comment
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(['GET'])
def reaction_detail(request, reaction_id:int):
    '''
    [GET] Get reaction detail
    '''
    # TODO
    return HttpResponse(status=200)

@require_http_methods(['PUT', 'DELETE'])
def m_reaction_detail(request, reaction_id:int):
    '''
    [PUT] Change the reaction
    [DELETE] Delete the reaction
    '''
    # TODO
    return HttpResponse(status=200)
