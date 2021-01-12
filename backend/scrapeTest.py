#from django.shortcuts import redirect
#from ..models import Flight
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
# import pandas as pd
import re
import os
import sys
# import requests

# def (arrival = "isb", departure="khi", clas="economy", dep="200322", ret="200323", adults="3", children="2", agearr=[])

arrival = "lhr"
departure="del"
clas="economy"#economy, premiumeconomy, first
dep="200329"
ret="200401"
adults="1"
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
 
#for # of adults and children
#webUrl="https://www.skyscanner.net/transport/flights/"+arrival+"/"+departure+"/"+dep+"/?adults="+adults+"&children="+children+"&adultsv2="+adults+"&childrenv2="+ages+"&infants=0&cabinclass="+clas+"&rtn=0&preferdirects=false&outboundaltsenabled=false&inboundaltsenabled=false&ref=home"
#for return
if ret!="0":
    webUrl="https://www.skyscanner.net/transport/flights/"+arrival+"/"+departure+"/"+dep+"/"+ret+"/?adults="+adults+"&children="+children+"&adultsv2="+adults+"&childrenv2="+ages+"&infants=0&cabinclass="+clas+"&rtn=0&preferdirects=false&outboundaltsenabled=false&inboundaltsenabled=false&ref=home"
else:
    webUrl="https://www.skyscanner.net/transport/flights/"+arrival+"/"+departure+"/"+dep+"/?adults="+adults+"&children="+children+"&adultsv2="+adults+"&childrenv2="+ages+"&infants=0&cabinclass="+clas+"&rtn=0&preferdirects=false&outboundaltsenabled=false&inboundaltsenabled=false&ref=home"
    print("HDSAFHGFDJHJDKFJGHFJDODKJFVBO")

binary = r'C:\\Program Files\\Mozilla Firefox\\firefox.exe'
options = Options()
#options.add_argument('--headless')
options.binary = binary
cap = DesiredCapabilities().FIREFOX
cap["marionette"] = True #optional
# driver = webdriver.Firefox(options=options, capabilities=cap, executable_path="C:\\gecko\\geckodriver.exe")
driver = webdriver.Firefox(options=options)

driver.get(webUrl)
print("waiting")
driver.implicitly_wait(40)
print("done waiting")

airline = []
times = []
price = []
stops= []
airline_tmp = driver.find_elements_by_class_name('BpkImage_bpk-image__img__3HwXN')
print(len(airline_tmp))
price_tmp = driver.find_elements_by_xpath('//span[@class = "BpkText_bpk-text__2NHsO BpkText_bpk-text--lg__3vAKN BpkText_bpk-text--bold__4yauk"]')
print(len(price_tmp))
times_tmp = driver.find_elements_by_xpath('//span[@class = "BpkText_bpk-text__2NHsO BpkText_bpk-text--lg__3vAKN"]')
print(len(times_tmp))
stops_tmp= driver.find_elements_by_class_name('LegInfo_stopsLabelContainer__2dEdt')#//span[@class = "BpkText_bpk-text__2NHsO BpkText_bpk-text--sm__345aT LegInfo_stopsLabelRed__2ED77"]')
print(len(stops_tmp))

for i in range(len(airline_tmp)):
    airline.append(airline_tmp[i].get_attribute('alt'))
    

for i in range(len(times_tmp)):
    times.append(times_tmp[i].text)
    

for i in range(len(price_tmp)):
    if i > 2:
        vtmp = price_tmp[i].text
        vtmp = vtmp.replace("," , "")
        price.append(vtmp)

for i in range(len(stops_tmp)):
    stops.append(stops_tmp[i].text)

j = 0
a = 0
if ret!="0":
    print("return")
    for i in range(len(price)):
        for k in range(2):
            print (arrival + "," + departure + "," + airline[a] + "," + price[i] + "," + times[j] + "," + times[j+1]  + ","+stops[a] )
            j += 2
            a += 1 
        print("\n")
else:
    print("one way")
    for i in range(len(price)):
        print (arrival + "," + departure + "," + airline[a] + "," + price[i] + "," + times[j] + ","+times[j+1] + "," + stops[a] + "\n")
        j += 2
        a += 1 


########################################   
#flights=driver.find_elements_by_xpath("//div[@class='TicketStub_horizontalStubContainer__2aEis']/button[.='BpkButton_bpk-button__32HxR TicketStub_ctaButton__2ctIF']")
#flights=driver.find_element_by_css_selector("button[class='BpkButton_bpk-button__32HxR TicketStub_ctaButton__2ctIF']")#find_element_by_class_name('BpkButton_bpk-button__32HxR TicketStub_ctaButton__2ctIF')
#flights[0].click()
# span class BpkText_bpk-text__2NHsO BpkText_bpk-text--sm__345aT OperatedBy_operatedBy__Q3u8t
#driver.find_element_by_class_name('LegSummary_container__25maG LegSummary_opened__3vzUe').click()
#flight_id = driver.find_elements_by_xpath('//span[@class ="BpkText_bpk-text__2NHsO BpkText_bpk-text--sm__345aT OperatedBy_operatedBy__Q3u8t"]')
#print(flight_id)
######################################


# driver.quit()        
