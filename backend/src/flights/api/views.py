from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt

from flights.models import Flight, ReturnFlight
from .serializers import FlightSerializer, ReturnFlightSerializer
from ..scraper.scraper import Scraper

from datetime import date,datetime  
from itertools import permutations
from django.db.models.aggregates import Count
from random import randint
from django.http import JsonResponse

class FlightListView(ListAPIView):
    queryset = Flight.objects.filter(departure = "dummy")
    def get(self, request, format=None):
        depart = request.GET['departure']
        depart = depart.lower()
        arriv = request.GET['arrival']
        arriv = arriv.lower()
        reqDate = request.GET['date']
        queryset = Flight .objects.filter(date = reqDate, arrival = arriv, departure = depart)
        if queryset.count() == 0:
            print ("flights not in db -- scraping")
            dateToPass = reqDate[2:4] + reqDate[5:7] + reqDate[8:10]
            scraper = Scraper()
            flights = scraper.scrape(depart,arriv,dateToPass)
            for i in range(len(flights)):
                new_flight = Flight()
                new_flight.arrival = arriv
                new_flight.departure = depart
                new_flight.date = reqDate
                new_flight.airline = flights[i][5]
                new_flight.price = flights[i][6]
                new_flight.startTime = flights[i][7]
                new_flight.endTime = flights[i][8]
                new_flight.stops = flights[i][9]
                new_flight.save()
            queryset = Flight .objects.filter(date = reqDate, arrival = arriv, departure = depart)
        # print (queryset)
        print ("flights in db")
        serializer_class = FlightSerializer(queryset,many=True)
        return Response(serializer_class.data)        

class ReturnFlightListView(ListAPIView):
    queryset = ReturnFlight.objects.filter(departure = "dummy")
    def get(self, request, format=None):
        # print (request.GET)
        depart = request.GET['departure']
        depart = depart.lower()
        arriv = request.GET['arrival']
        arriv = arriv.lower()
        reqDate = request.GET['date']
        returnDate = request.GET['returnDate']
        print (returnDate)
        queryset = ReturnFlight .objects.filter(date = reqDate, retDate = returnDate,arrival = arriv, departure = depart)
        if queryset.count() == 0:
            print ("flights not in db -- scraping")
            dateToPass = reqDate[2:4] + reqDate[5:7] + reqDate[8:10]
            retDateToPass = returnDate[2:4] + returnDate[5:7] + returnDate[8:10]
            scraper = Scraper()
            returnFlights = scraper.scrape(depart,arriv,dateToPass, True, retDateToPass, 1)
            j = 0
            for i in range(int(len(returnFlights)/2)):
                new_retFlight = ReturnFlight()
                new_retFlight.arrival = arriv
                new_retFlight.departure = depart
                new_retFlight.date = reqDate
                new_retFlight.retDate = returnDate
                new_retFlight.airline = returnFlights[j][5]
                new_retFlight.retAirline = returnFlights[j+1][5]
                new_retFlight.price = returnFlights[j][6]
                new_retFlight.startTime = returnFlights[j][7]
                new_retFlight.endTime = returnFlights[j][8]
                new_retFlight.retStartTime = returnFlights[j+1][7]
                new_retFlight.retEndTime = returnFlights[j+1][8]                
                new_retFlight.stops = returnFlights[j][9]
                new_retFlight.retStops = returnFlights[j+1][9]
                new_retFlight.save()
                j += 2
            queryset = ReturnFlight .objects.filter(date = reqDate, retDate = returnDate, arrival = arriv, departure = depart)
        # print (queryset)
        print ("flights in db")
        serializer_class = ReturnFlightSerializer(queryset,many=True)
        return Response(serializer_class.data)  

class FlightDetailView(RetrieveAPIView):
    queryset = Flight .objects.all()
    serializer_class = FlightSerializer


class TopFlightListView(ListAPIView):
    queryset = Flight.objects.filter(departure = "dummy")
    def get(self, request, format=None):
        # count = Flight.objects.aggregate(count=Count('id'))['count']
        # random_index = randint(0, count - 1)
        # print (Flight.objects.all()[random_index])
        queryset = Flight.objects.all()[Flight.objects.all().count()-6:]
        serializer_class = FlightSerializer(queryset,many=True)
        return Response(serializer_class.data)     


def populate(self):
    print ("starting to populate db")
    airports = ['isb','khi','lhe','del','lhr','auh','lax','bcn']
    # tempDate = str(datetime.date(datetime.now()))
    tempDate  = "2020-05-01"
    dateToPass = tempDate[2:4] + tempDate[5:7] + tempDate[8:10]
    dateCount = 7
    print ("date being passed is: " + dateToPass)
    airportsToPass = list(permutations(airports[0:3], 2))

    scraper = Scraper()
    for j in range(len(airportsToPass)):

        flights = scraper.oneWayScrape(airportsToPass[j][0],airportsToPass[j][1],dateToPass,dateCount)

        for i in range(len(flights)):
            new_flight = Flight()
            new_flight.arrival = flights[i][2]
            new_flight.departure = flights[i][3]
            new_flight.date = flights[i][4]
            new_flight.airline = flights[i][5]
            new_flight.price = flights[i][6]
            new_flight.startTime = flights[i][7]
            new_flight.endTime = flights[i][8]
            mew_flight.stops = flights[i][9]

            new_flight.save()
            print ("flight saved")
    print ("db populated")
