from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.signup),
    path('signin/', views.signin),
    path('signout/', views.signout),
    path('change/', views.change),
    path('info/<int:user_id>/', views.info),
    path('search/<str:query>/', views.auto_compelete),
    path('search/<int:project_id>/<str:query>/', views.auto_compelete_member),
    path('timetable/<int:user_id>/', views.timetable),
    path('timetable/<int:user_id>/m/', views.m_timetable),
    path('noti/', views.noti),
    path('noti/short/<int:num>/', views.noti_short),
    path('image/', views.image),
    path('image/m/', views.m_image),
    path('token/', views.csrf_token, name='token'),
    path('verify/<str:hash_str>/', views.verify),
]
