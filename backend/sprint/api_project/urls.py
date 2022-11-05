from django.urls import path
from . import views

urlpatterns = [
    path('<int:user_id>/', views.user_project),
    path('<int:user_id>/m/', views.m_project),
    path('detail/<int:project_id>/', views.project_detail),
    path('detail/<int:project_id>/m/', views.m_project_detail),
    path('member/<int:project_id>/', views.member),
    path('member/<int:project_id>/m/', views.m_member),
]
