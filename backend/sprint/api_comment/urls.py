from django.urls import path
from . import views

urlpatterns = [
    path('<int:task_id>/', views.comment),
    path('<int:task_id>/m/', views.m_comment),
    path('detail/<int:comment_id>/', views.comment_detail),
    path('detail/<int:comment_id>/m/', views.m_comment_detail),
]
