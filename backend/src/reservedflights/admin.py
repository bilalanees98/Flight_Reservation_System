from django.contrib import admin

from .models import ReservedFlight,Payment

admin.site.register(ReservedFlight)
admin.site.register(Payment)