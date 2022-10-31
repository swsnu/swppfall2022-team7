from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.signup),
    path('signin/', views.signin),
    path('signout/', views.signout),
    path('change/', views.change),
    path('info/<user_id:int>', views.info),
]
