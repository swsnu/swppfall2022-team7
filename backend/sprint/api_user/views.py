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

def info(request, user_id:int):
    '''
    [GET] Get User info
    '''
    # TODO
    return HttpResponse(status=200)

def timetable(request, user_id:int):
    '''
    [GET] Get timetable of the user
    [POST] Create new timetable for the user
    [PUT] Change timetable of the user
    '''
    # TODO
    return HttpResponse(status=200)

def noti(request, user_id:int):
    '''
    [GET] Get notification of the user
    [POST] Create notification for the user
    '''
    # TODO
    return HttpResponse(status=200)

def noti_detail(request, noti_id:int):
    '''
    [GET] Get the detail of the noti
    [PUT] Change status of the noti
    [DELETE] Delete the notification
    '''
    # TODO
    return HttpResponse(status=200)

def image(request, user_id:int):
    '''
    [GET] Get the image of the user
    [POST] Set User image
    [PUT] Change User image
    [DELETE] Delete User image
    '''
    # TODO
    return HttpResponse(status=200)
