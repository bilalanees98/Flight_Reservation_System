# from ..flights.scraper.scraper import Scraper
# from ..flights.models import Flight
# # from ..flights.scraper.
# from datetime import date,datetime  
# from itertools import permutations

# def populate():
#     print ("starting to populate db")
#     airports = ['isb','khi','lhe','del','lhr','auh','lax','bcn']
#     tempDate = datetime.date(datetime.now())
#     dateToPass = tempDate[2:4] + tempDate[5:7] + tempDate[8:10]
#     dateCount = 5

#     airportsToPass = list(permutations(airports[0:3], 2))

#     scraper = Scraper()
#     for j in range(len(airportsToPass)):

#         flights = scraper.oneWayScrape(airportsToPass[j][0],airportsToPass[j][1],dateToPass,dateCount)

#         for i in range(len(flights)):
#             new_flight = Flight()
#             new_flight.arrival = flights[i][2]
#             new_flight.departure = flights[i][3]
#             new_flight.date = flights[i][4]
#             new_flight.airline = flights[i][5]
#             new_flight.price = flights[i][6]
#             new_flight.startTime = flights[i][7]
#             new_flight.endTime = flights[i][8]
#             mew_flight.stops = flights[i][9]

#             new_flight.save()
#     print ("db populated")
