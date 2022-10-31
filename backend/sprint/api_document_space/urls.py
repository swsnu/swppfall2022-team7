from django.urls import path
from . import views

urlpatterns = [
    path('<int:project_id>/', views.docuspace),
    path('detail/<int:docuspace_id>/', views.docuspace_detail),
]
