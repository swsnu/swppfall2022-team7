import json

from functools import wraps
from django.http import HttpResponse
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.request import Request

from model_project.models import UserProject, Task, Project, DocumentSpace, Document
from .const import AuthType

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

def return_bad_request_decorator(func):

    @return_bad_request_if_exception
    @return_bad_request_if_anonymous
    @return_bad_request_if_does_not_exist
    @wraps(func)
    def capsule_func(*args, **kwargs):
        return func(*args, **kwargs)
    return capsule_func

def return_bad_request_if_not_authorized(auth_type):
    def capsule_decorator(func):
        @wraps(func)
        def capsule_func(request: Request, *args, **kwargs) :
            project: Project = None

            if auth_type == AuthType.TASK:
                task = Task.objects.get(id=kwargs.get("task_id"))
                project = task.project
            elif auth_type == AuthType.PROJECT:
                project = Project.objects.get(id=kwargs.get("project_id"))
            elif auth_type == AuthType.DOCUSPACE:
                project = DocumentSpace.objects.get(id=kwargs.get("docuspace_id")).project
            elif auth_type == AuthType.DOCUMENT:
                project = Document.objects.get(id=kwargs.get("document_id")).space.project

            user = request.user
            if not UserProject.objects.filter(user=user, project=project).exists():
                return HttpResponse(status=403)
            return func(request, *args, **kwargs)
        return capsule_func
    return capsule_decorator
