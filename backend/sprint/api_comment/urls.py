from django.urls import path
from . import views

urlpatterns = [
    path('<int:task_id>/', views.comment),
    path('detail/<int:comment_id>/', views.comment_detail),
]
