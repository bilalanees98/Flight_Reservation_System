from rest_framework import serializers

from flights.models import Flight, ReturnFlight


class FlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flight
        fields = ('id','airline', 'arrival', 'departure','startTime','endTime','date','price','stops')


class ReturnFlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReturnFlight
        fields = ('id', 'arrival', 'departure','airline','startTime','endTime','date','stops','retAirline','retStartTime','retEndTime','retDate','retStops','price')
