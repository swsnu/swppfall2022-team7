from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.
class Timetable(models.Model):
    schedule = models.JSONField()
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

class Notification(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    content = models.TextField()
    link = models.TextField()
    checked = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)

class Image(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    image = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)

class UserVerification(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    hash_string = models.CharField(max_length=100)