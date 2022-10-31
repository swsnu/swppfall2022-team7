from django.urls import path
from . import views

urlpatterns = [
    path('<int:docuspace_id>/', views.document),
    path('detail/<int:document_id>/', views.document_detail),
]
