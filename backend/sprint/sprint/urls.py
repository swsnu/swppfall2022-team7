"""sprint URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', include('api_user.urls')),
    path('user/detail/', include('api_user_detail.urls')),
    path('project/', include('api_project.urls')),
    path('task/', include('api_task.urls')),
    path('meeting/', include('api_meeting.urls')),
    path('document/', include('api_document_space.urls')),
    path('documents/', include('api_document.urls')),
    path('comment/', include('api_comment.urls')),
    path('reaction/', include('api_reaction.urls')),
]
