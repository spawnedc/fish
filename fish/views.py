from django.views.generic.base import TemplateView

from . import settings

class Home(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, *args, **kwargs):
        context = super(Home, self).get_context_data(*args, **kwargs)
        context['settings'] = settings
        return context

home = Home.as_view()
