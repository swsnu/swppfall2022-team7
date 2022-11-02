from django.urls import path
from . import views

urlpatterns = [
    path('<int:project_id>/', views.docuspace),
    path('<int:project_id>/m/', views.m_docuspace),
    path('detail/<int:docuspace_id>/', views.docuspace_detail),
    path('detail/<int:docuspace_id>/m/', views.m_docuspace_detail),
]
