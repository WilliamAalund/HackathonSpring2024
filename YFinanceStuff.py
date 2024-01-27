# pip install yfinance

import yfinance as yf
import datetime
import pandas as pd
import csv
import json

Q1 = datetime.datetime()


def loadTickerJSON(tickerName, quarter, year):
    if(quarter == 1):
        startDate = datetime.datetime(year, 1, 1)
        endDate = datetime.datetime(year,3, 31)
    elif(quarter == 2):
        startDate = datetime.datetime(year, 4, 1)
        endDate = datetime.datetime(year,6, 31)   
    elif(quarter == 3):
        startDate = datetime.datetime(year, 7, 1)
        endDate = datetime.datetime(year,9, 31)   
    elif(quarter == 4):
        startDate = datetime.datetime(year, 10, 1)
        endDate = datetime.datetime(year,12, 31)  

    tickerInformation = yf.Ticker(ticker)
    tickerHistoryInformation = tickerInformation.history(start = startDate, end = endDate)

    #tickerHistoryInformation.to_csv("tickertag{}_history.csv")
# Convert the dictionary to a JSON string
ticker_json = tickerHistoryInformation.to_json()

# Write the JSON string to a file
with open('tickerInformation.json', 'w') as f:
    f.write(ticker_json)

#print(GetInformation.history(start = startDate, end = endDate))
