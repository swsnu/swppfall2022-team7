from django.urls import path
from . import views

urlpatterns = [
    path('<int:project_id>/', views.task),
    path('detail/<int:task_id>/', views.task_detail),
    path('belong/<int:user_id>/', views.task_belong),
    path('document/<int:task_id>/', views.task_document),
]
