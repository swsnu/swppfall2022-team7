from django.contrib.auth.models import User
from model_project.models import UserProject, Project, Task

def create_task(project: Project, data: dict) :
    return