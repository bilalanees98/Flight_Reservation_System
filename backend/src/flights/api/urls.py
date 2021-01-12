from django.urls import path
from django.conf.urls import url
from .views import populate
# from ..scraper.scraper import scrape

from .views import FlightListView, FlightDetailView, ReturnFlightListView,TopFlightListView

urlpatterns = [
    path('list/', FlightListView.as_view()),
    path('return-list/', ReturnFlightListView.as_view()),
    path('<pk>', FlightDetailView.as_view()),
    path('pop/',populate),
    path('top/',TopFlightListView.as_view())
    # url(r'^scrape/<arrival>/', scrape)
    ]
