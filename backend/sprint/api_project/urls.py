from django.urls import path
from . import views

urlpatterns = [
    path('m/', views.m_project),
    path('<int:user_id>/', views.user_project),
    path('detail/<int:project_id>/', views.project_detail),
    path('detail/<int:project_id>/m/', views.m_project_detail),
    path('detail/<int:project_id>/member/<int:member_id>/', views.m_member)
]
