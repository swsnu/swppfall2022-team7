import json

from functools import wraps
from django.http import HttpResponse, HttpRequest

def return_bad_request_if_anonymous(func):
    @wraps(func)
    def capsule_func(request: HttpRequest, *args, **kwargs):
        if not request.user.is_authenticated :
            return HttpResponse(status=401)
        return func(request, *args, **kwargs)
    return capsule_func

def return_bad_request_if_exception(func):
    @wraps(func)
    def capsule_func(request: HttpRequest, *args, **kwagrs):
        try :
            return func(request, *args, **kwagrs)
        except (KeyError, json.JSONDecodeError):
            return HttpResponse(status=400)
    return capsule_func
