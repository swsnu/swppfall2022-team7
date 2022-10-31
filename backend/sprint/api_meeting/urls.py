from django.urls import path
from . import views

urlpatterns = [
    path('<int:project_id>/', views.meeting),
    path('detail/<int:meeting_id>/', views.meeting_detail),
]
