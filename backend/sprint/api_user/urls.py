from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.signup),
    path('signin/', views.signin),
    path('signout/', views.signout),
    path('change/', views.change),
    path('info/<int:user_id>/', views.info),
    path('timetable/<int:user_id>/', views.timetable),
    path('noti/<int:user_id>/', views.noti),
    path('noti/detail/<int:noti_id>/', views.noti_detail),
    path('image/<int:user_id>/', views.image),
]
