
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('admin/', admin.site.urls),
    path('api-flight/', include('flights.api.urls')),
    path('api-reserve/', include('reservedflights.api.urls')),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls'))
]
