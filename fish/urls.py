from django.conf.urls import patterns, url, include
from . import views, settings

urlpatterns = patterns('',
    url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
    url(r'^api/', include('api.urls')),
    url(r'^', views.home, name='home'),
)
