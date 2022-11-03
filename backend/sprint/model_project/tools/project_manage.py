from model_project.models import Project

def get_project_by_id(id: int) :
    project = Project.objects.filter(id=id)
    if project.exists() :
        return project.first()
    return None