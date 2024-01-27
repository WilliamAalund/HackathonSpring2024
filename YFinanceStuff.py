# pip install yfinance

import yfinance as yf
import datetime
import pandas as pd
import csv
import json


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

    tickerInformation = yf.Ticker(tickerName)
    tickerHistoryInformation = tickerInformation.history(start = startDate, end = endDate)
    # Convert the dictionary to a JSON string
    # Convert the DataFrame to a JSON string
    ticker_json = tickerHistoryInformation.reset_index().to_json(orient='records')

    # Write the JSON string to a file
    with open('tickerInformation.json', 'w') as f:
        f.write(ticker_json)

if __name__ == "__main__":
    loadTickerJSON("AAPL", 1, 2020)