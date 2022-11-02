from django.urls import path
from . import views

urlpatterns = [
    path('<int:docuspace_id>/', views.document),
    path('<int:docuspace_id>/m/', views.m_document),
    path('detail/<int:document_id>/', views.document_detail),
    path('detail/<int:document_id>/m/', views.m_document_detail),
]
