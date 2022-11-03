from django.contrib import admin
from .models import *

# Register your models here.

class TimetableAdmin(admin.ModelAdmin):
    pass

class NotificationAdmin(admin.ModelAdmin):
    pass

class ImageAdmin(admin.ModelAdmin) :
    pass

admin.site.register(Timetable, TimetableAdmin)
admin.site.register(Notification, NotificationAdmin)
admin.site.register(Image, ImageAdmin)