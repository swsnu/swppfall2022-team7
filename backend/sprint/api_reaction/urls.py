from django.urls import path
from . import views

urlpatterns = [
    path('<int:comment_id>/', views.reaction),
    path('<int:comment_id>/m/', views.m_reaction),
]
