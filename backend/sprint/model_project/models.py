from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.
class Project(models.Model):
    name = models.CharField(max_length=100)
    subject = models.CharField(max_length=100)
    manager = models.ForeignKey(get_user_model(), on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)

class UserProject(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

class Meeting(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    meet_at = models.DateTimeField()
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class Task(models.Model):
    name = models.CharField(max_length=100)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    content = models.TextField()
    assignee = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    until_at = models.DateTimeField()
    status = models.CharField(max_length=100)

class Comment(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class Reaction(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    emoji = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

class DocumentSpace(models.Model):
    name = models.CharField(max_length=100)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    head = models.IntegerField(default=-1)
    created_at = models.DateTimeField(auto_now_add=True)

class TaskDocumentSpace(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    document_space = models.ForeignKey(DocumentSpace, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

class Document(models.Model):
    name = models.CharField(max_length=100)
    space = models.ForeignKey(DocumentSpace, on_delete=models.CASCADE)
    document = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

class UserProjectActivity(models.Model) :
    class ActivityType:
        CREATE_TASK = 1
        CREATE_DOCUMENT_SPACE = 2
        CREATE_COMMENT = 3
        UPLOAD_DOCUMENT = 4
        DOWNLOAD_DOCUMENT = 5 # will not be alerted
        ASSIGNED_TASK = 6
        EDIT_TASK = 7
        EDIT_COMMENT = 8
        REACT_COMMENT = 9
        COMPLETE_TASK = 10

        TASK_RELATED_ACTIVITY = [CREATE_TASK, EDIT_TASK, COMPLETE_TASK, ASSIGNED_TASK]
        COMMENT_RELATED_ACTIVITY = [CREATE_COMMENT, REACT_COMMENT, EDIT_COMMENT]
        DOCUMENT_RELATED_ACTIVITY = [UPLOAD_DOCUMENT, DOWNLOAD_DOCUMENT]
        DOCUMENT_SPACE_RELATED_ACTIVITY = [CREATE_DOCUMENT_SPACE]

    user_project = models.ForeignKey(UserProject, on_delete=models.CASCADE)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, null=True)
    document_space = models.ForeignKey(DocumentSpace, on_delete=models.CASCADE, null=True)
    document = models.ForeignKey(Document, on_delete=models.CASCADE, null = True)
    activity_type = models.IntegerField()
    