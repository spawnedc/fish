from django.conf.urls import patterns, url
from . import views, settings

urlpatterns = patterns('',
    url(r'^$', views.home, name='home'),
    url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT})
)
