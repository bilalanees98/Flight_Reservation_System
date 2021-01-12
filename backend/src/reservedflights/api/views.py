from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from reservedflights.models import ReservedFlight,Payment,ReturnPayment, ReservedReturnFlight
from .serializers import ReservedFlightSerializer, ReservedReturnFlightSerializer


from rest_framework.authtoken.models import Token
from django.conf import settings
from django.contrib.auth.models import User
from datetime import datetime, timedelta
from django.db.models import When, Case, Value
from rest_framework.response import Response

from django.conf import settings
from django.core.mail import send_mail

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

class ReservedFlightListView(ListAPIView):
    
    queryset = ReservedFlight .objects.filter(departure = 'dummy')
    def get(self, request, format=None):
        # print (self.request.GET['token'])
        userqs = User.objects.filter(email = Token.objects.filter(key = request.GET['token'])[0])[0]
        # userqs = User.objects.filter(email = Token.objects.filter(key = "783749b7a4cefc474a13f053ed66c91c3d8f99ed")[0])[0]
        # a85c3ca85b2392ac6ad7429b90932e5daa077863 - hamza
        # 783749b7a4cefc474a13f053ed66c91c3d8f99ed - bilal

        for i in range(3):
            dateToExclude = (str((datetime.today()+timedelta(days=i)).date()))
            ReservedFlight .objects.filter(date = dateToExclude).update(dropable = False)
        queryset = ReservedFlight .objects.filter(user = userqs)
        print (queryset)
        serializer_class = ReservedFlightSerializer(queryset,many = True)
        return Response(serializer_class.data)

class ReservedReturnFlightListView(ListAPIView):
    queryset = ReservedReturnFlight .objects.filter(departure = 'dummy')
    def get(self, request, format=None):
        # print (self.request.GET['token'])
        userqs = User.objects.filter(email = Token.objects.filter(key = request.GET['token'])[0])[0]
        # userqs = User.objects.filter(email = Token.objects.filter(key = "783749b7a4cefc474a13f053ed66c91c3d8f99ed")[0])[0]
        # a85c3ca85b2392ac6ad7429b90932e5daa077863 - hamza
        # 783749b7a4cefc474a13f053ed66c91c3d8f99ed - bilal

        for i in range(3):
            dateToExclude = (str((datetime.today()+timedelta(days=i)).date()))
            ReservedReturnFlight .objects.filter(date = dateToExclude).update(dropable = False)
        queryset = ReservedReturnFlight .objects.filter(user = userqs)
        print (queryset)
        serializer_class = ReservedReturnFlightSerializer(queryset,many = True)
        return Response(serializer_class.data)

class ReservedFlightDetailView(RetrieveAPIView):
    queryset = ReservedFlight .objects.all()
    serializer_class = ReservedFlightSerializer

@csrf_exempt
def makePayment(self):

    data = json.loads(self.body)
    print (data)
    if data['type'] == "1way":
        print ("making 1 way payment")
        print (data['type'])
        # creating and saving new reserved flight with received post data
        new_res_flight = ReservedFlight()
        userqs = User.objects.filter(email = Token.objects.filter(key = data['token'])[0])[0]
        # userqs = User.objects.filter(email = Token.objects.filter(key = "a85c3ca85b2392ac6ad7429b90932e5daa077863")[0])[0]
        new_res_flight.user = userqs
        new_res_flight.startTime = data['startTime']
        new_res_flight.price = str(data['price'])
        new_res_flight.endTime = data['endTime']
        new_res_flight.departure = data['departure']

        now = datetime.now()
        new_res_flight.date = data['flightDate']
        
        new_res_flight.arrival = data['arrival']
        new_res_flight.airline = data['airline']
        new_res_flight.stops = data['stops']
        new_res_flight.save()

        # creating new payment object with received post data
        new_payment = Payment()
        new_payment.amount = data['totalAmount']
        new_payment.dateTime = now
        new_payment.noOfAdults = data['adultTicket']
        new_payment.noOfChildren = data['childTicket']
        new_payment.reservedFlightNo = new_res_flight
        new_payment.save()

        subject = "Reservation confirmation!"
        messagePay = "Your payment is confirmed with the following details: \nNumber of Adults: " + str(new_payment.noOfAdults) + "\nNumber of children: " + str(new_payment.noOfChildren) + "\nTotal amount: " + str(new_payment.amount) + "\nDate of payment: " + str(new_payment.dateTime) + "\n"
        messageRes = "Your reservation details are: \nAirline" + new_res_flight.airline + "\nDeparture from: " + new_res_flight.departure + "\nArrival at: " + new_res_flight.arrival + "\nDeparture time: " + new_res_flight.startTime + "\nArrival time: " + new_res_flight.endTime + "\n"
        messageThank = "\nWe thank you for using FlightDelight!\n"
        from_email = settings.EMAIL_HOST_USER
        to_list = [userqs.email]

        send_mail(subject,(messagePay + messageRes + messageThank),from_email,to_list ,fail_silently= False)
    else:
        print ("making round trip payment") 
        # print (data)
        # creating and saving new reserved return flight with received post data
        new_res_ret_flight = ReservedReturnFlight()
        userqs = User.objects.filter(email = Token.objects.filter(key = data['token'])[0])[0]
        # userqs = User.objects.filter(email = Token.objects.filter(key = "a85c3ca85b2392ac6ad7429b90932e5daa077863")[0])[0]
        new_res_ret_flight.user = userqs
        new_res_ret_flight.startTime = data['startTime']
        new_res_ret_flight.endTime = data['endTime']
        new_res_ret_flight.retStartTime = data['retStartTime']
        new_res_ret_flight.retEndTime = data['retEndTime']
        new_res_ret_flight.price = str(data['price'])

        new_res_ret_flight.departure = data['departure']

        now = datetime.now()
        new_res_ret_flight.date = data['flightDate']
        new_res_ret_flight.retDate = data['retFlightDate']
        
        new_res_ret_flight.arrival = data['arrival']
        new_res_ret_flight.airline = data['airline']
        new_res_ret_flight.retAirline = data['retAirline']
        new_res_ret_flight.stops = data['stops']
        new_res_ret_flight.retStops = data['retStops']
        new_res_ret_flight.save()

        # creating new payment object with received post data
        new_payment = ReturnPayment()
        new_payment.amount = data['totalAmount']
        new_payment.dateTime = now
        new_payment.noOfAdults = data['adultTicket']
        new_payment.noOfChildren = data['childTicket']
        new_payment.reservedFlightNo = new_res_ret_flight
        new_payment.save()

        subject = "Reservation confirmation!"
        messagePay = "Your payment is confirmed with the following details: \nNumber of Adults: " + str(new_payment.noOfAdults) + "\nNumber of children: " + str(new_payment.noOfChildren) + "\nTotal amount: " + str(new_payment.amount) + "\nDate of payment: " + str(new_payment.dateTime) + "\n"
        messageRes = "Your reservation details are:\nFirst Leg: \nAirline" + new_res_ret_flight.airline + "\nDeparture from: " + new_res_ret_flight.departure + "\nArrival at: " + new_res_ret_flight.arrival + "\nDeparture time: " + new_res_ret_flight.startTime + "\nArrival time: " + new_res_ret_flight.endTime + "\n"
        messageResRet = "First Leg: \nAirline" + new_res_ret_flight.retAirline + "\nDeparture from: " + new_res_ret_flight.arrival + "\nArrival at: " + new_res_ret_flight.departure + "\nDeparture time: " + new_res_ret_flight.retStartTime + "\nArrival time: " + new_res_ret_flight.retEndTime + "\n"

        messageThank = "\nWe thank you for using FlightDelight!\n"
        from_email = settings.EMAIL_HOST_USER
        to_list = [userqs.email]

        send_mail(subject,(messagePay + messageRes + messageResRet + messageThank),from_email,to_list ,fail_silently= False)
    return JsonResponse({'foo':'payment done'})

@csrf_exempt
def dropReservation(self):
    # print (self.body)
    # print (self.request)
    data = json.loads(self.body)
    print (data)
    idToDel = int(data['flightid'])
    userqs = User.objects.filter(email = Token.objects.filter(key = data['token'])[0])[0]
    if (data['type'] == "round"):
        print ("deleting round reservation-----------------------------")
        ReservedReturnFlight .objects.filter(user = userqs, id = idToDel).delete()

    # idToDel = 3
    # userqs = User.objects.filter(email = Token.objects.filter(key = "783749b7a4cefc474a13f053ed66c91c3d8f99ed")[0])[0]
    else:
        print ("deleting 1way reservation-----------------------------")
        ReservedFlight .objects.filter(user = userqs, id = idToDel).delete()

    subject = "Cancellation confirmation!"
    msg = "Youre booking has been cancelled!\n"
    msg2 = "You will be reimbursed according to our policy. Our representative will call you within 72 hours.\n"
    messageThank = "\nWe thank you for using FlightDelight!\n"
    from_email = settings.EMAIL_HOST_USER
    to_list = [userqs.email]

    send_mail(subject,(msg + msg2 + messageThank),from_email,to_list ,fail_silently= False)    
    return JsonResponse({'foo':'deleted'})

