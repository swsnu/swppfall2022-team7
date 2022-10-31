from django.urls import path
from . import views

urlpatterns = [
    path('<int:user_id>/', views.project),
    path('detail/<int:project_id>/', views.project_detail),
    path('member/<int:project_id>/', views.member),
]
