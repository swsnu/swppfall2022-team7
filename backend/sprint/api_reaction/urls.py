from django.urls import path
from . import views

urlpatterns = [
    path('<int:comment_id>/', views.reaction),
    path('detail/<int:reaction_id>/', views.reaction_detail),
]
