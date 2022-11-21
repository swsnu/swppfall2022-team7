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
from django.urls import path, include, re_path
from rest_framework.permissions import AllowAny
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_url_patterns = [
    path('user/', include('api_user.urls')),
    path('project/', include('api_project.urls')),
    path('task/', include('api_task.urls')),
    path('meeting/', include('api_meeting.urls')),
    path('document/', include('api_document_space.urls')),
    path('documents/', include('api_document.urls')),
    path('comment/', include('api_comment.urls')),
    path('reaction/', include('api_reaction.urls')),
]

SchemaView = get_schema_view(
    openapi.Info(
        title="SWPP SPRINT API",
        default_version='v1',
        description="SPRINT API",
        terms_of_service="https://www.google.com/policies/terms/",
    ),
    public=True,
    permission_classes=(AllowAny,),
    patterns=schema_url_patterns,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', include('api_user.urls')),
    path('project/', include('api_project.urls')),
    path('task/', include('api_task.urls')),
    path('meeting/', include('api_meeting.urls')),
    path('document/', include('api_document_space.urls')),
    path('documents/', include('api_document.urls')),
    path('comment/', include('api_comment.urls')),
    path('reaction/', include('api_reaction.urls')),
    re_path(
        r'^swagger(?P<format>\.json|\.yaml)$',
        SchemaView.without_ui(cache_timeout=0),
        name='schema-json'
    ),
    re_path(
        r'^swagger/$',
        SchemaView.with_ui('swagger', cache_timeout=0),
        name='schema-swagger-ui'
    ),
    re_path(
        r'^redoc/$',
        SchemaView.with_ui('redoc', cache_timeout=0),
        name='schema-redoc'
    ),
]
