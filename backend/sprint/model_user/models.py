from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Timetable(models.Model):
    schedule = models.JSONField()
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    checked = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    
class Image(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)