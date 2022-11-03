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
    created_at = models.DateTimeField(auto_now_add=True)

class TaskDocumentSpace(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    document_space = models.ForeignKey(DocumentSpace, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

class Document(models.Model):
    name = models.CharField(max_length=100)
    document = models.URLField()
    head = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
