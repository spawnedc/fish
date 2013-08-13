from django.views.generic.base import View, TemplateView

from . import settings
from .models import Payment


class PublicBaseView(View):
    """ A base class for all views """

    class Meta:
        abstract = True

    def get_context_data(self, *args, **kwargs):
        context = super(PublicBaseView, self).get_context_data(*args, **kwargs)
        context['settings'] = settings
        return context


class PublicBasicPageView(PublicBaseView, TemplateView):
    """ Basic page view """
    pass


class Home(PublicBasicPageView):

    template_name = 'home.html'
    section_name = 'home'

    def get_context_data(self):
        context = super(Home, self).get_context_data()

        context['payments'] = Payment.objects.all().order_by('-start_date')

        return context

home = Home.as_view()
