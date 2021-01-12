from django.db import models
from django.conf import settings

class ReservedFlight(models.Model):

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null = True)

    arrival = models.CharField(max_length = 100)
    departure = models.CharField(max_length = 100)
    airline = models.CharField(max_length = 50,null = True)
    date = models.CharField(max_length = 10,null = True)
    startTime =  models.CharField(max_length = 10,null = True)
    endTime = models.CharField(max_length = 10,null = True)
    price = models.CharField(max_length = 20,null = True)
    stops = models.CharField(max_length = 30,null = True)

    dropable = models.BooleanField(null = True, default = True)

    def __str__(self):
        return self.arrival +' to '+ self.departure

class ReservedReturnFlight(models.Model):

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null = True)


    arrival = models.CharField(max_length = 10)
    departure = models.CharField(max_length = 10)
    airline = models.CharField(max_length = 30,null = True)
    retAirline = models.CharField(max_length = 30,null = True)
    date = models.CharField(max_length = 10,null = True)
    retDate = models.CharField(max_length = 10,null = True)
    startTime =  models.CharField(max_length = 10,null = True)
    endTime = models.CharField(max_length = 10,null = True)
    retStartTime =  models.CharField(max_length = 10,null = True)
    retEndTime = models.CharField(max_length = 10,null = True)
    stops = models.CharField(max_length = 30,null = True)
    retStops = models.CharField(max_length = 30,null = True)
    price = models.CharField(max_length = 20,null = True)

    dropable = models.BooleanField(null = True, default = True)
    def __str__(self):
        return self.departure +' to '+ self.arrival + ' (ret)'

class Payment(models.Model):

    reservedFlightNo = models.ForeignKey(ReservedFlight,on_delete=models.CASCADE)
    noOfAdults = models.SmallIntegerField()
    noOfChildren = models.SmallIntegerField()
    dateTime = models.DateTimeField(auto_now = True,null = True)
    amount = models.FloatField()

    def __str__(self):
        return self.arrival +' to '+ self.departure
class ReturnPayment(models.Model):

    reservedFlightNo = models.ForeignKey(ReservedReturnFlight,on_delete=models.CASCADE)
    noOfAdults = models.SmallIntegerField()
    noOfChildren = models.SmallIntegerField()
    dateTime = models.DateTimeField(auto_now = True,null = True)
    amount = models.FloatField()

    def __str__(self):
        return self.arrival +' to '+ self.departure