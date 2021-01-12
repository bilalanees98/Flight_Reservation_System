from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

from ..models import Flight

from selenium.common import exceptions

import re
import os
import sys
import requests
import time
# import django

staleCount = 0
def findElements():
    # finding webelements
    #<img class="BpkImage_bpk-image__img__3HwXN" alt="Aeroflot" src="//www.skyscanner.net/images/airlines/small/SU.png">
    times_tmp = driver.find_elements_by_xpath('//span[@class = "BpkText_bpk-text__2NHsO BpkText_bpk-text--lg__3vAKN"]')
    airline_tmp = driver.find_elements_by_xpath('//img[@class = "BpkImage_bpk-image__img__3HwXN"]') #find_elements_by_xpath('//div[@class="LogoImage_container__2G8rJ LegLogo_logoContainer__1LVpw TicketBody_legLogo__38qqy"]/img[@class = "BpkImage_bpk-image__img__3HwXN"]')
    price_tmp = driver.find_elements_by_xpath('//div[@class="Price_mainPriceContainer__1dqsw"]/span[@class = "BpkText_bpk-text__2NHsO BpkText_bpk-text--lg__3vAKN BpkText_bpk-text--bold__4yauk"]')
    stops_tmp= driver.find_elements_by_class_name('LegInfo_stopsLabelContainer__2dEdt')#//span[@class = "BpkText_bpk-text__2NHsO BpkText_bpk-text--sm__345aT LegInfo_stopsLabelRed__2ED77"]')
    stops_airline_tmp= driver.find_elements_by_xpath('//span[@class = "BpkText_bpk-text__2NHsO BpkText_bpk-text--sm__345aT LegInfo_stopStation__Ec5OU"]/span[@class = "BpkText_bpk-text__2NHsO BpkText_bpk-text--sm__345aT"]')
#/div[@class="LogoImage_container__2G8rJ LegLogo_logoContainer__1LVpw TicketBody_legLogo__38qqy"]/div/
    return airline_tmp,price_tmp,times_tmp,stops_tmp,stops_airline_tmp

def convertToLists():
    #converting webelements to lists
    airline = []
    times = []
    price = []
    stops= []
    airline_stops = []
    max_attempts = 3
    attempt = 1
    while True:
        try:
            # find webelements
            airline_tmp,price_tmp,times_tmp,stops_tmp,stops_airline_tmp = findElements()
            #convert to lists
            for i in range(len(times_tmp)):
                times.append(times_tmp[i].text)
            if "Sorry" in times[0]:
                print ("no flights found!")
                return times,price,stops,airline_stops,airline
            for i in range(len(price_tmp)):
                if i > 2:
                    vtmp = price_tmp[i].text
                    vtmp = vtmp.replace("," , "")
                    price.append(vtmp)
            for i in range(len(stops_tmp)):
                stops.append(stops_tmp[i].text)
            x = len(airline_tmp) -1
            for i in range(len(airline_tmp)):
                if (i+1)%2==0:
                    airline_stops.append(airline_tmp[x].get_attribute('alt'))
                x -= 1

            air=0
            airs=0
            x = len(airline_stops) -1
            for i in range(len(stops_tmp)):
                stops.append(stops[i])
                if (("Direct" in stops[i]) or ("1" in stops[i])) and len(airline_tmp)>air:
                    airline.append(airline_stops[x])
                    x -= 1
                elif len(stops_airline_tmp)>airs and ("+" in stops_airline_tmp[airs].text):
                    airline.append(stops_airline_tmp[airs].text)
                    airs+=1
                elif ("+" in stops_airline_tmp[airs].text)==False: 
                    airline.append(airline_stops[x])
                    x -= 1
            # if lists converted successfully, return
            # if not raise stale exception
            return times,price,stops,airline_stops,airline

        except exceptions.StaleElementReferenceException:
            # if attempts exhausted reload entire page
            if attempt == max_attempts:
                # staleCount+=1
                print ("exception in convertToList --------")
                raise
            # else only re find elements on existing page
            print ("stale exception raised, but retrying")
            # staleCount+=1
            attempt += 1


start_time = time.time()
arrival = "isb"
departure="khi"
clas="economy"#economy, premiumeconomy, first
dep="200415"
adults="1"
children="0"#"2"
agearr=[]
agearr.append("0")



if children == "0":
    ages="0"
else:
    if len(agearr)==0:
        agearr.append("5")
    ages=agearr[0]
    for i in range(len(agearr)-1):
        ages+="%7c"+agearr[i+1]

#  '%7c' seperated ages

result = []
    
binary = r'C:\\Program Files\\Mozilla Firefox\\firefox.exe'
options = Options()
options.add_argument('--headless')
options.binary = binary
cap = DesiredCapabilities().FIREFOX
cap["marionette"] = True #optional
driver = webdriver.Firefox(options=options, capabilities=cap)
##################################################

for inc in range(1):
    iteration_time = time.time()
    webUrl="https://www.skyscanner.net/transport/flights/"+departure+"/"+arrival+"/"+dep+"/?adults="+adults+"&children="+children+"&adultsv2="+adults+"&childrenv2="+"&infants=0&cabinclass="+clas+"&rtn=0&preferdirects=false&outboundaltsenabled=false&inboundaltsenabled=false&ref=home"

    try:
        # no need to create new driver each time, just change url and get
        driver.get(webUrl)

        airline = []
        times = []
        price = []
        stops= []
        airline_stops = []
        
        # driver.implicitly_wait(30)
    # BpkProgress_bpk-progress__21PVl BpkProgress_bpk-progress--small__HWL08
    # BpkProgress_bpk-progress__value__2zlXW

        progressbar = EC.presence_of_element_located((By.XPATH, "//*[@class = 'BpkProgress_bpk-progress__21PVl BpkProgress_bpk-progress--small__HWL08']"))
        print ("progress bar found")
        # time.sleep(4)
        tc = 0
        while (not EC.staleness_of(progressbar)):
            time.sleep(2)
            tc += 1
            print("progress bar still present")
            if tc>20:
                break
        print ("progress bar removed")
        time.sleep(2)
        times,price,stops,airline_stops,airline = convertToLists()
        print ("lengths are correct: ")
        print ("times: " + str(len(times)))
        print ("price: " + str(len(price)))
        print ("stops: " + str(len(stops)))
        print ("sirline_stops: " + str(len(airline_stops)))
        print ("airline: " + str(len(airline)))

        j = 0
        a = 0
        si = 0
        index = 0
        # was throwing and index exception, so now its just returning minimum number of flights
        for i in range(min(len(price),len(airline))):
            index += 1
            temp = [inc,index, arrival, departure, dep, airline[a], price[i], times[j], times[j+1], stops[a]]
            result.append(temp)
            # print (temp)
            j += 2
            a += 1
        
        print(dep)
        if(dep[len(dep)-3]=='2' and dep[len(dep)-4]=='0'):#if y-02-28 
            if (dep[len(dep)-2]=='2' and  dep[len(dep)-1]=='8'): 
                temp=int(dep)-28
                dep=str(temp)

        if (dep[len(dep)-2]=='3' and  dep[len(dep)-1]=='0' and int(dep[len(dep)-3])%2==0):    
            temp=int(dep)
            if(dep[len(dep)-3]=='2' and dep[len(dep)-4]=='1'):
                temp=temp-1100
                dep=str(temp+10000)
            else:
                temp+=100
            temp=temp-30
            dep=str(temp+1)
        elif(dep[len(dep)-2]=='3' and  dep[len(dep)-1]=='1'):
            temp=int(dep)
            if(dep[len(dep)-3]=='2' and dep[len(dep)-4]=='1'):
                temp=temp-1100
                dep=str(temp+10000)
            else:
                temp+=100
            temp=temp-30
            dep=str(temp)
        else:
            temp=int(dep)+1
            dep=str(temp)
        print("after ",dep)
         
    except exceptions.TimeoutException:
        print (" Loading took too much time!")
    except exceptions.StaleElementReferenceException:
        staleCount += 1
        print("stale element -- reloading page for date")
    finally:
        # driver.quit()
        print ("iteration took " + str(time.time() - iteration_time) + " to run")    
# only quits when all dates searched
driver.quit() 
# print(len(result))
# for i in range(len(result)):
#     print (result[i])

for i in range(len(result)):
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
print ("program took " + str(time.time() - start_time) + " to run")
print ("staleCount is: " + str(staleCount))

#USE RESULT
#INDEX SAME FOR TUPLE OF RETURN flights
