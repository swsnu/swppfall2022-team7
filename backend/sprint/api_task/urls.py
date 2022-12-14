from django.urls import path
from . import views

urlpatterns = [
    path('<int:project_id>/', views.get_task),
    path('<int:project_id>/m/', views.m_task),
    path('detail/<int:task_id>/', views.task_detail),
    path('detail/<int:task_id>/m/', views.m_task_detail),
    path('belong/<int:user_id>/', views.task_belong),
    path('document/<int:task_id>/', views.task_document),
    path('document/<int:task_id>/m/', views.m_task_document),
]
