from django.contrib import admin
from .models import Project, UserProject, Meeting, Task, Comment, Reaction, Document, DocumentSpace, TaskDocumentSpace

# Register your models here.

class ProjectAdmin(admin.ModelAdmin):
    pass

class UserProjectAdmin(admin.ModelAdmin):
    pass

class MeetingAdmin(admin.ModelAdmin):
    pass

class TaskAdmin(admin.ModelAdmin):
    pass

class CommentAdmin(admin.ModelAdmin):
    pass

class ReactionAdmin(admin.ModelAdmin):
    pass

class DocumentSpaceAdmin(admin.ModelAdmin):
    pass

class TaskDocumentSpaceAdmin(admin.ModelAdmin):
    pass

class DocumentAdmin(admin.ModelAdmin):
    pass

admin.site.register(Project, ProjectAdmin)
admin.site.register(UserProject, UserProjectAdmin)
admin.site.register(Meeting, MeetingAdmin)
admin.site.register(Task, TaskAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Reaction, ReactionAdmin)
admin.site.register(DocumentSpace, DocumentSpaceAdmin)
admin.site.register(TaskDocumentSpace, TaskDocumentSpaceAdmin)
admin.site.register(Document, DocumentAdmin)