#from django.shortcuts import redirect
#from ..models import Flight
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
import pandas as pd
import re
import os
import sys
import requests
import time
# def (arrival = "isb", departure="khi" , clas="economy", dep="200530", adults="3", children="2", agearr=[])


start_time = time.time()

arrival = "lhr"
departure="del"
clas="economy"#economy, premiumeconomy, first
dep="200530"
adults="3"
children="0"#"2"
agearr=[]
agearr.append("0")
#agearr.append("4")

if children == "0":
    ages="0"
else:
    if len(agearr)==0:
        agearr.append("5")
    ages=agearr[0]
    for i in range(len(agearr)-1):
        ages+="%7c"+agearr[i+1]

#  '%7c' seperated ages

import numpy
# result = numpy.array([],[])
result = []
for inc in range(2) :

    webUrl="https://www.skyscanner.net/transport/flights/"+arrival+"/"+departure+"/"+dep+"/?adults="+adults+"&children="+children+"&adultsv2="+adults+"&childrenv2="+ages+"&infants=0&cabinclass="+clas+"&rtn=0&preferdirects=false&outboundaltsenabled=false&inboundaltsenabled=false&ref=home"
        
    binary = r'C:\\Program Files\\Mozilla Firefox\\firefox.exe'
    options = Options()
    # options.add_argument('--headless')
    options.binary = binary
    cap = DesiredCapabilities().FIREFOX
    cap["marionette"] = True #optional
    ##################################################
    # driver = webdriver.Firefox(options=options, capabilities=cap, executable_path="C:\\gecko\\geckodriver.exe")
    driver = webdriver.Firefox(options=options, capabilities=cap)


    driver.get(webUrl)
    print("waiting")
    driver.implicitly_wait(60)
    print("done waiting")

    airline = []
    times = []
    price = []
    stops= []
    airline_stops = []
    airline_tmp = driver.find_elements_by_class_name('BpkImage_bpk-image__img__3HwXN')#find_elements_by_xpath('//div[@class="LogoImage_container__2G8rJ LegLogo_logoContainer__1LVpw TicketBody_legLogo__38qqy"]/img[@class = "BpkImage_bpk-image__img__3HwXN"]')
    print(len(airline_tmp)) 
    price_tmp = driver.find_elements_by_xpath('//span[@class = "BpkText_bpk-text__2NHsO BpkText_bpk-text--lg__3vAKN BpkText_bpk-text--bold__4yauk"]')
    print(len(price_tmp))
    times_tmp = driver.find_elements_by_xpath('//span[@class = "BpkText_bpk-text__2NHsO BpkText_bpk-text--lg__3vAKN"]')
    print(len(times_tmp))
    stops_tmp= driver.find_elements_by_class_name('LegInfo_stopsLabelContainer__2dEdt')#//span[@class = "BpkText_bpk-text__2NHsO BpkText_bpk-text--sm__345aT LegInfo_stopsLabelRed__2ED77"]')
    print(len(stops_tmp))
    # LogoImage_container__2G8rJ LegLogo_logoContainer__1LVpw TicketBody_legLogo__38qqy
    stops_airline_tmp= driver.find_elements_by_xpath('//div[@class="LogoImage_container__2G8rJ LegLogo_logoContainer__1LVpw TicketBody_legLogo__38qqy"]/span[@class = "BpkText_bpk-text__2NHsO BpkText_bpk-text--sm__345aT"]')
    print(len(stops_airline_tmp))
        
    for i in range(len(times_tmp)):
        times.append(times_tmp[i].text)
        

    for i in range(len(price_tmp)):
        if i > 2:
            vtmp = price_tmp[i].text
            vtmp = vtmp.replace("," , "")
            price.append(vtmp)

    for i in range(len(stops_tmp)):
        stops.append(stops_tmp[i].text)

    x = len(airline_tmp) -1
    for i in range(int(len(times_tmp)/2)-len(stops_airline_tmp)):
        airline_stops.append(airline_tmp[x].get_attribute('alt'))
        print(">" + airline_stops[i])
        x -= 1



    air=0
    airs=0
    x = len(airline_stops) -1
    for i in range(len(stops_tmp)):
        stops.append(stops[i])
        if (("Direct" in stops[i]) or ("1" in stops[i])) and len(airline_tmp)>air:
            airline.append(airline_stops[x])
            x -= 1
        elif len(stops_airline_tmp)>airs:
            airline.append(stops_airline_tmp[airs].text)
            airs+=1

    j = 0
    a = 0
    si = 0

    
    index = 0
    for i in range(len(price)):
        index += 1
        temp = [inc,index, arrival, departure, airline[a], price[i], times[j], times[j+1], stops[a]]
        result.append(temp)
        print (arrival + "," + departure + "," + airline[a] + "," + price[i] + "," + times[j] + ","+times[j+1] + "," + stops[a])
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

#USE RESULT
#INDEX SAME FOR TUPLE OF RETURN flights
    driver.quit()        

print ("program took " + str(time.time() - start_time) + " to run")
print (result)