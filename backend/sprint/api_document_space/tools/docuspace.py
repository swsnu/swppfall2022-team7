from model_project.models import Task, Project, UserProject, DocumentSpace
from model_user.models import get_user_model

def get_docuspace(project: Project):
    docus = DocumentSpace.objects.filter(project=project)
    ret = [get_docuspace_detail(docu) for docu in docus]
    return ret

def create_docuspace(project: Project, get_data: dict):
    name = get_data['name']
    docu = DocumentSpace.objects.create(
        name = name,
        head = -1,
        project = project
    )
    return get_docuspace_detail(docu)

def get_docuspace_detail(docuspace: DocumentSpace):
    ret = {
        'id': docuspace.id,
        'name': docuspace.name,
        'project': docuspace.project.id,
        'head': docuspace.head
    }
    return ret

def edit_docuspace_detail(docuspace: DocumentSpace, get_data: dict):
    name = get_data['name']
    head = get_data['head']
    docuspace.name = name
    docuspace.head = head
    docuspace.save()
    return get_docuspace_detail(docuspace)