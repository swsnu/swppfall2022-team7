from django.http import HttpResponse, JsonResponse

# Create your views here.
def reaction(request, comment_id:int):
    '''
    [GET] Get reaction list of the comment
    [POST] Create new reaction for the comment
    '''
    # TODO
    return HttpResponse(status=200)

def reaction_detail(request, reaction_id:int):
    '''
    [GET] Get reaction detail
    [PUT] Change the reaction
    [DELETE] Delete the reaction
    '''
    # TODO
    return HttpResponse(status=200)
