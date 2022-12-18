from model_project.models import Document, Project, Task, DocumentSpace, UserProjectActivity, UserProject
from model_project.tools.activity_manage import push_activity
from model_user.models import get_user_model

def get_document_list(docuspace: DocumentSpace):
    qs_docs = Document.objects.filter(space=docuspace)
    return [get_document_detail(docu) for docu in qs_docs]

def create_document(docuspace: DocumentSpace, user_project: UserProject):
    docs = Document.objects.create(space=docuspace)
    docuspace.head = docs.id
    docuspace.save()
    push_activity(user_project, None, UserProjectActivity.ActivityType.UPLOAD_DOCUMENT, document=docs)
    return get_document_detail(docs)

def get_document_detail(document: Document):
    return {
        'id': document.id,
        'createdAt': document.created_at,
        'head': True if document.space.head==document.id else False
    }

def delete_document(document: Document):
    if document.space.head == document.id:
        document.space.head = -1
        document.space.save()
    document.delete()
    return
