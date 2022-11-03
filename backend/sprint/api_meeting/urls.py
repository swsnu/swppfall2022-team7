from django.urls import path
from . import views

urlpatterns = [
    path('<int:project_id>/', views.meeting),
    path('<int:project_id>/m/', views.m_meeting),
    path('detail/<int:meeting_id>/', views.meeting_detail),
    path('detail/<int:meeting_id>/m/', views.m_meeting_detail),
]
