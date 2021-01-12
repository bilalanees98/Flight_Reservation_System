from rest_framework import serializers

from reservedflights.models import ReservedFlight,ReservedReturnFlight, Payment


class ReservedFlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReservedFlight
        fields = ('id','user','airline', 'arrival', 'departure','startTime','endTime','date','price','stops','dropable')

class ReservedReturnFlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReservedReturnFlight
        fields = ('id', 'user','arrival', 'departure','airline','startTime','endTime','date','stops','retAirline','retStartTime','retEndTime','retDate','retStops','price', 'dropable')


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ('reservedFlightNo','noOfAdults', 'noOfChildren','dateTime', 'amount')
