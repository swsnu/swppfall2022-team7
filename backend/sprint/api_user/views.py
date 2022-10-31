from django.http import HttpResponse, JsonResponse

# Create your views here.
def signup(request):
    '''
    [POST] User sign up
    '''
    # TODO
    return HttpResponse(status=200)

def signin(request):
    '''
    [POST] User log in
    '''
    # TODO
    return HttpResponse(status=200)

def signout(request):
    '''
    [GET] User log out
    '''
    # TODO
    return HttpResponse(status=200)

def change(request):
    '''
    [PUT] Change User setting
    [DELETE] Delete User
    '''
    # TODO
    return HttpResponse(status=200)

def info(request):
    '''
    [GET] Get User info
    '''
    # TODO
    return HttpResponse(status=200)
