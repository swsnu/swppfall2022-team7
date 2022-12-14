from model_project.models import Task, Project, UserProject, DocumentSpace, UserProjectActivity
from model_project.tools.activity_manage import push_activity
from model_user.models import get_user_model
from utility.date_string import date_to_string

def get_docuspace(project: Project):
    docus = DocumentSpace.objects.filter(project=project)
    ret = [get_docuspace_detail(docu) for docu in docus]
    return ret

def create_docuspace(project: Project, get_data: dict, user):
    name = get_data['name']
    docu = DocumentSpace.objects.create(
        name = name,
        head = -1,
        project = project
    )
    user_project = UserProject.objects.get(user=user, project=project)
    push_activity(user_project, None, UserProjectActivity.ActivityType.CREATE_DOCUMENT_SPACE, document_space=docu)
    return get_docuspace_detail(docu)

def get_docuspace_detail(docuspace: DocumentSpace):
    ret = {
        'id': docuspace.id,
        'name': docuspace.name,
        'project': docuspace.project.id,
        'head': docuspace.head,
        'created_at': date_to_string(docuspace.created_at)
    }
    return ret

def edit_docuspace_detail(docuspace: DocumentSpace, get_data: dict):
    head = get_data['head']
    docuspace.head = head
    docuspace.save()
    return get_docuspace_detail(docuspace)
