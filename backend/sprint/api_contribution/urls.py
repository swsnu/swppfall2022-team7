from django.urls import path
from . import views

urlpatterns = [
    path('quest/<int:project_id>/', views.member_quest),
    path('timeline/<int:project_id>/', views.project_timeline),
]
