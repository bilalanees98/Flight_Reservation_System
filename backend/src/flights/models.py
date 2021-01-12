from django.db import models

class Flight(models.Model):

    arrival = models.CharField(max_length = 10)
    departure = models.CharField(max_length = 10)
    airline = models.CharField(max_length = 30,null = True)
    date = models.CharField(max_length = 10,null = True)
    startTime =  models.CharField(max_length = 10,null = True)
    endTime = models.CharField(max_length = 10,null = True)
    price = models.CharField(max_length = 20,null = True)
    stops = models.CharField(max_length = 30,null = True)
    #flightid

    def __str__(self):
        return self.departure +' to '+ self.arrival

class ReturnFlight(models.Model):

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

    def __str__(self):
        return self.departure +' to '+ self.arrival + ' (ret)'

