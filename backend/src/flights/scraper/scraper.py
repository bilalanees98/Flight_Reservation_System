from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

from selenium.common import exceptions

import re
import os
import sys
import requests
import time

staleCount = 0


class Scraper:
    def oneWayScrape(self,departure, arrival, date, dateCount = 2):
        start_time = time.time()
        # arrival = "isb"
        # departure="khi"
        clas="economy"#economy, premiumeconomy, first
        dep=date
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

        for inc in range(dateCount):
            iteration_time = time.time()
            webUrl="https://www.skyscanner.net/transport/flights/"+departure+"/"+arrival+"/"+dep+"/?adults="+adults+"&children="+children+"&adultsv2="+adults+"&childrenv2="+"&infants=0&cabinclass="+clas+"&rtn=0&preferdirects=false&outboundaltsenabled=false&inboundaltsenabled=false&ref=home"

            try:
                # no need to create new driver each time, just change url and get
                driver.get(webUrl)

                # airline = []
                # times = []
                # price = []
                # stops= []
                # airline_stops = []
                
                # driver.implicitly_wait(30)
            # BpkProgress_bpk-progress__21PVl BpkProgress_bpk-progress--small__HWL08
            # BpkProgress_bpk-progress__value__2zlXW

                progressbar = EC.presence_of_element_located((By.XPATH, "//*[@class = 'BpkProgress_bpk-progress__21PVl BpkProgress_bpk-progress--small__HWL08']"))
                print ("progress bar found")
                # time.sleep(4)
                tc = 0
                while (not EC.staleness_of(progressbar)):
                    time.sleep(1)
                    tc += 1
                    print("progress bar still present")
                    if tc>20:
                        break
                print ("progress bar removed")
                time.sleep(3)
                # <button type="button" class="BpkButton_bpk-button__32HxR TicketStub_ctaButton__2ctIF">Select&nbsp;<span style="line-height: 1.125rem; display: inline-block; margin-top: 0.1875rem; vertical-align: top;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style="width: 1.125rem; height: 1.125rem;" class="BpkIcon_bpk-icon--rtl-support__2-_zb" fill="white"><path d="M14.4 19.5l5.7-5.3c.4-.4.7-.9.8-1.5.1-.3.1-.5.1-.7s0-.4-.1-.6c-.1-.6-.4-1.1-.8-1.5l-5.7-5.3c-.8-.8-2.1-.7-2.8.1-.8.8-.7 2.1.1 2.8l2.7 2.5H5c-1.1 0-2 .9-2 2s.9 2 2 2h9.4l-2.7 2.5c-.5.4-.7 1-.7 1.5s.2 1 .5 1.4c.8.8 2.1.8 2.9.1z"></path></svg></span></button>
                # <button type="button" class="BpkButton_bpk-button__32HxR TicketStub_ctaButton__2ctIF">Select&nbsp;<span style="line-height: 1.125rem; display: inline-block; margin-top: 0.1875rem; vertical-align: top;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style="width: 1.125rem; height: 1.125rem;" class="BpkIcon_bpk-icon--rtl-support__2-_zb" fill="white"><path d="M14.4 19.5l5.7-5.3c.4-.4.7-.9.8-1.5.1-.3.1-.5.1-.7s0-.4-.1-.6c-.1-.6-.4-1.1-.8-1.5l-5.7-5.3c-.8-.8-2.1-.7-2.8.1-.8.8-.7 2.1.1 2.8l2.7 2.5H5c-1.1 0-2 .9-2 2s.9 2 2 2h9.4l-2.7 2.5c-.5.4-.7 1-.7 1.5s.2 1 .5 1.4c.8.8 2.1.8 2.9.1z"></path></svg></span></button>
                while (not EC.element_to_be_clickable((By.XPATH, "//*[@class = 'BpkButton_bpk-button__32HxR TicketStub_ctaButton__2ctIF']"))):
                    time.sleep(2)
                    tc += 1
                    print("button not present")
                    if tc>20:
                        break
                print ("button now present")
                time.sleep(3)
                # times,price,stops,airline_stops,airline = self.convertToLists(driver)

                #converting webelements to lists
                airline = []
                times = []
                price = []
                stops= []
                airline_stops = []
                max_attempts = 3
                attempt = 1
                check = True
                while check:
                    try:
                        # find webelements
                        # airline_tmp,price_tmp,times_tmp,stops_tmp,stops_airline_tmp = self.findElements(driver)
                        times_tmp = driver.find_elements_by_xpath('//span[@class = "BpkText_bpk-text__2NHsO BpkText_bpk-text--lg__3vAKN"]')
                        # time.sleep(1)
                        airline_tmp = driver.find_elements_by_xpath('//img[@class = "BpkImage_bpk-image__img__3HwXN"]') 
                        # time.sleep(1)
                        price_tmp = driver.find_elements_by_xpath('//div[@class="Price_mainPriceContainer__1dqsw"]/span[@class = "BpkText_bpk-text__2NHsO BpkText_bpk-text--lg__3vAKN BpkText_bpk-text--bold__4yauk"]')
                        # time.sleep(1)
                        stops_tmp= driver.find_elements_by_class_name('LegInfo_stopsLabelContainer__2dEdt')
                        # time.sleep(1)
                        stops_airline_tmp= driver.find_elements_by_xpath('//span[@class = "BpkText_bpk-text__2NHsO BpkText_bpk-text--sm__345aT LegInfo_stopStation__Ec5OU"]/span[@class = "BpkText_bpk-text__2NHsO BpkText_bpk-text--sm__345aT"]')

                        # time.sleep(2)
                        #convert to lists
                        for i in range(len(times_tmp)):
                            times.append(times_tmp[i].text)
                        # if "Sorry" in times[0]:
                        #     print ("no flights found!")
                            # return times,price,stops,airline_stops,airline
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
                        # return times,price,stops,airline_stops,airline
                        check = False

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
                    # temp = [inc,index,airline[a], price[i], times[j], times[j+1], stops[a]]

                    result.append(temp)
                    # print (temp)
                    j += 2
                    a += 1
                
                # print(dep)
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
                # print("after ",dep)
                
            except exceptions.TimeoutException:
                print (" Loading took too much time!")
            except exceptions.StaleElementReferenceException:
                # staleCount += 1
                print("stale element -- reloading page for date")
            finally:
                # driver.quit()
                print ("iteration took " + str(time.time() - iteration_time) + " to run")    
        # only quits when all dates searched
        driver.quit() 
        print ("program took " + str(time.time() - start_time) + " to run")
        return result

    def scrape(self,departure, arrival, depDate, specific = True, retDate = "0", dateCount = 1):

        # specific=False#False
        start_time = time.time()
        # arrival = "isb"#"lhr"
        # departure= "khi" #"del"
        clas="economy"#economy, premiumeconomy, first
        dep=depDate
        ret=retDate
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

        if specific:
            dateCount=1
        for inc in range(dateCount):
            iteration_time = time.time()
            if specific:
                if ret!="0":#return
                    if ages=="0":
                        webUrl="https://www.skyscanner.net/transport/flights/"+departure+"/"+arrival+"/"+dep+"/"+ret+"/?adults="+adults+"&children="+children+"&adultsv2="+adults+"&childrenv2="+"&infants=0&cabinclass="+clas+"&rtn=0&preferdirects=false&outboundaltsenabled=false&inboundaltsenabled=false&ref=home"
                    else:
                        webUrl="https://www.skyscanner.net/transport/flights/"+departure+"/"+arrival+"/"+dep+"/"+ret+"/?adults="+adults+"&children="+children+"&adultsv2="+adults+"&childrenv2="+ages+"&infants=0&cabinclass="+clas+"&rtn=0&preferdirects=false&outboundaltsenabled=false&inboundaltsenabled=false&ref=home"
                else:#onewway
                    if ages=="0":
                        webUrl="https://www.skyscanner.net/transport/flights/"+departure+"/"+arrival+"/"+dep+"/?adults="+adults+"&children="+children+"&adultsv2="+adults+"&childrenv2="+"&infants=0&cabinclass="+clas+"&rtn=0&preferdirects=false&outboundaltsenabled=false&inboundaltsenabled=false&ref=home"
                    else:
                        webUrl="https://www.skyscanner.net/transport/flights/"+departure+"/"+arrival+"/"+dep+"/?adults="+adults+"&children="+children+"&adultsv2="+adults+"&childrenv2="+ages+"&infants=0&cabinclass="+clas+"&rtn=0&preferdirects=false&outboundaltsenabled=false&inboundaltsenabled=false&ref=home"
        
            if ret=="0":#oneway
                webUrl="https://www.skyscanner.net/transport/flights/"+departure+"/"+arrival+"/"+dep+"/?adults="+adults+"&children="+children+"&adultsv2="+adults+"&childrenv2="+"&infants=0&cabinclass="+clas+"&rtn=0&preferdirects=false&outboundaltsenabled=false&inboundaltsenabled=false&ref=home"
            else:#return
                webUrl="https://www.skyscanner.net/transport/flights/"+departure+"/"+arrival+"/"+dep+"/"+ret+"/?adults="+adults+"&children="+children+"&adultsv2="+adults+"&childrenv2="+"&infants=0&cabinclass="+clas+"&rtn=0&preferdirects=false&outboundaltsenabled=false&inboundaltsenabled=false&ref=home"
            
            try:
                # no need to create new driver each time, just change url and get
                driver.get(webUrl)
                airline = []
                times = []
                price = []
                stops= []
                airline_stops = []
                if(EC.alert_is_present()):
                    try:
                        time.sleep(1)
                        y=driver.find_element_by_xpath('//button[@class = "BpkCloseButton_bpk-close-button__LEeG5 BpkModalDialog_bpk-modal__close-button__3hxI0 BpkNavigationBar_bpk-navigation-bar__trailing-item__3MCMV"]')
                        y.click()
                        print("Alert clicked")
                        driver.switch_to_default_content()
                    except exceptions.NoSuchElementException:
                        print("No Alert")
                progressbar = EC.presence_of_element_located((By.XPATH, "//*[@class = 'BpkProgress_bpk-progress__21PVl BpkProgress_bpk-progress--small__HWL08']"))
                print ("progress bar found")
                if(EC.alert_is_present()):
                    try:
                        time.sleep(1)
                        y=driver.find_element_by_xpath('//button[@class = "BpkCloseButton_bpk-close-button__LEeG5 BpkModalDialog_bpk-modal__close-button__3hxI0 BpkNavigationBar_bpk-navigation-bar__trailing-item__3MCMV"]')
                        y.click()
                        print("Alert clicked")
                        driver.switch_to_default_content()
                    except exceptions.NoSuchElementException:
                        print("No Alert")

                # time.sleep(4)
                tc = 0
                while (not EC.staleness_of(progressbar)):
                    time.sleep(1)
                    tc += 1
                    print("progress bar still present")
                    if tc>20:
                        break
                print ("progress bar removed")
                time.sleep(2)
                if(EC.alert_is_present()):
                    try:
                        time.sleep(1)
                        y=driver.find_element_by_xpath('//button[@class = "BpkCloseButton_bpk-close-button__LEeG5 BpkModalDialog_bpk-modal__close-button__3hxI0 BpkNavigationBar_bpk-navigation-bar__trailing-item__3MCMV"]')
                        y.click()
                        print("Alert clicked")
                        driver.switch_to_default_content()
                    except exceptions.NoSuchElementException:
                        print("No Alert")
                while (not EC.element_to_be_clickable((By.XPATH, "//*[@class = 'BpkButton_bpk-button__32HxR TicketStub_ctaButton__2ctIF']"))):
                    time.sleep(1)
                    tc += 1
                    print("button not present")
                    if tc>20:
                        break
                print ("button now present")
                time.sleep(1)
                if(EC.alert_is_present()):
                    try:
                        time.sleep(1)
                        y=driver.find_element_by_xpath('//button[@class = "BpkCloseButton_bpk-close-button__LEeG5 BpkModalDialog_bpk-modal__close-button__3hxI0 BpkNavigationBar_bpk-navigation-bar__trailing-item__3MCMV"]')
                        y.click()
                        print("Alert clicked")
                        driver.switch_to_default_content()
                    except exceptions.NoSuchElementException:
                        print("No Alert")

                airline = []
                times = []
                price = []
                stops= []
                airline_stops = []
                max_attempts = 3
                attempt = 1
                check = True
                time.sleep(2)
                while check:
                    try:
                        # find webelements

                        airline_tmp = driver.find_elements_by_xpath('//img[@class = "BpkImage_bpk-image__img__3HwXN"]') 
                        price_tmp = driver.find_elements_by_xpath('//div[@class="Price_mainPriceContainer__1dqsw"]/span[@class = "BpkText_bpk-text__2NHsO BpkText_bpk-text--lg__3vAKN BpkText_bpk-text--bold__4yauk"]')
                        # times_tmp = driver.find_elements_by_xpath('//span[@class = "BpkText_bpk-text__2NHsO BpkText_bpk-text--lg__3vAKN"]')
                        times_tmp = driver.find_elements_by_xpath('//span[@class = "BpkText_bpk-text__2NHsO BpkText_bpk-text--xl__LZGOX"]')
                        stops_tmp= driver.find_elements_by_class_name('LegInfo_stopsLabelContainer__2dEdt')
                        # stops_airline_tmp= driver.find_elements_by_xpath('//span[@class = "BpkText_bpk-text__2NHsO BpkText_bpk-text--sm__345aT LegInfo_stopStation__Ec5OU"]/span[@class = "BpkText_bpk-text__2NHsO BpkText_bpk-text--sm__345aT"]')
                        stops_airline_tmp= driver.find_elements_by_xpath('//span[@class = "BpkText_bpk-text__2NHsO BpkText_bpk-text--xs__1Wja3 LegInfo_stopStation__Ec5OU"]/span[@class = "BpkText_bpk-text__2NHsO BpkText_bpk-text--xs__1Wja3"]')

                                                                            #   <span class="BpkText_bpk-text__2NHsO BpkText_bpk-text--xs__1Wja3 LegInfo_stopStation__Ec5OU"><span class="BpkText_bpk-text__2NHsO BpkText_bpk-text--xs__1Wja3">ATL</span></span>    
                                                                            #    <span class="BpkText_bpk-text__2NHsO BpkText_bpk-text--xs__1Wja3 LegInfo_stopsLabelGreen__3PoJX">Direct</span>

                        print ("---------------->" + str(len(times_tmp)))
                        print ("---------------->" + str(len(airline_tmp)))
                        print ("---------------->" + str(len(price_tmp)))
                        print ("---------------->" + str(len(stops_tmp)))
                        print ("---------------->" + str(len(stops_airline_tmp)))
                        # print ((times_tmp))
                        # <span class="BpkText_bpk-text__2NHsO BpkText_bpk-text--xl__LZGOX">13:30</span>

                        #convert to lists
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
                        for i in range(len(airline_tmp)):
                            if (i+1)%2==0 and ret=="0":
                                airline_stops.append(airline_tmp[x].get_attribute('alt'))
                            elif ret!="0":
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
                        check = False

                    except exceptions.StaleElementReferenceException:
                        # if attempts exhausted reload entire page
                        if attempt == max_attempts:
                            # staleCount+=1
                            print ("exception in convertToList --------")
                            raise
                        # else only re find elements on existing page
                        print ("stale exception raised, but retrying")
                        attempt += 1
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
                if ret=="0":
                    # was throwing and index exception, so now its just returning minimum number of flights
                    tmp=dep
                    for i in range(min(len(price),len(airline))):
                        index += 1
                        temp = [inc,index, arrival, departure, dep, airline[a], price[i], times[j], times[j+1], stops[a]]
                        result.append(temp)
                        j += 2
                        a += 1
                else:
                    tmp=ret
                    for i in range(len(price)):
                        index+=1
                        for k in range(2):
                            if k == 0:
                                result.append([inc,index, arrival, departure, dep, airline[a], price[i], times[j], times[j+1], stops[a]])
                            if k == 1:
                                result.append([inc,index, departure, arrival, tmp, airline[a], price[i], times[j], times[j+1], stops[a]])
                            j += 2
                            a += 1 
                
                print(tmp)
                if(tmp[len(tmp)-3]=='2' and tmp[len(tmp)-4]=='0'):#if y-02-28 
                    if (tmp[len(tmp)-2]=='2' and  tmp[len(tmp)-1]=='8'): 
                        temp=int(tmp)-28
                        tmp=str(temp)

                if (tmp[len(tmp)-2]=='3' and  tmp[len(tmp)-1]=='0' and int(tmp[len(tmp)-3])%2==0):    
                    temp=int(tmp)
                    if(tmp[len(tmp)-3]=='2' and tmp[len(tmp)-4]=='1'):
                        temp=temp-1100
                        tmp=str(temp+10000)
                    else:
                        temp+=100
                    temp=temp-30
                    tmp=str(temp+1)
                elif(tmp[len(tmp)-2]=='3' and  tmp[len(tmp)-1]=='1'):
                    temp=int(tmp)
                    if(tmp[len(tmp)-3]=='2' and tmp[len(tmp)-4]=='1'):
                        temp=temp-1100
                        tmp=str(temp+10000)
                    else:
                        temp+=100
                    temp=temp-30
                    tmp=str(temp)
                else:
                    temp=int(tmp)+1
                    tmp=str(temp)
                print("after ",tmp)

                if ret=="0":
                    dep=tmp
                else:
                    ret=tmp
                
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
        print ("program took " + str(time.time() - start_time) + " to run")
        return result

