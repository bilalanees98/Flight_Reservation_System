from celery import task 
from celery import shared_task 

from ..flights.scraper import scraper

# We can have either registered task 
@task(name='scrape') 
def start_scrape():
     
     print ("scraping rn-------")