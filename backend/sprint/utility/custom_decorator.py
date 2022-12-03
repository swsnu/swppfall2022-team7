import json

from functools import wraps
from django.http import HttpResponse
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.request import Request

def return_bad_request_if_anonymous(func):
    @wraps(func)
    def capsule_func(request: Request, *args, **kwargs):
        if not request.auth :
            return HttpResponse(status=401)
        return func(request, *args, **kwargs)
    return capsule_func

def return_bad_request_if_exception(func):
    @wraps(func)
    def capsule_func(request: Request, *args, **kwagrs):
        try :
            return func(request, *args, **kwagrs)
        except (KeyError, json.JSONDecodeError):
            return HttpResponse(status=400)
    return capsule_func

def return_bad_request_if_does_not_exist(func):
    @wraps(func)
    def capsule_func(request: Request, *args, **kwagrs):
        try :
            return func(request, *args, **kwagrs)
        except ObjectDoesNotExist:
            return HttpResponse(status=404)
    return capsule_func
