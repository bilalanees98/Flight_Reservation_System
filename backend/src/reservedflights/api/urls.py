from django.urls import path
from django.conf.urls import url

from .views import ReservedFlightListView, ReservedFlightDetailView,makePayment, dropReservation, ReservedReturnFlightListView

urlpatterns = [
    path('list/', ReservedFlightListView.as_view()),
    path('return-list/', ReservedReturnFlightListView.as_view()),
    # path('<pk>', ReservedFlightDetailView.as_view()),
    # path('<pk>', makePayment)
    path('payment/', makePayment),
    path('drop/',dropReservation)
    ]
