# pip install yfinance

import yfinance as yf
import datetime
import pandas as pd
import csv
import json

ticker = "META"
startDate = datetime.datetime(2018, 1, 1)
endDate = datetime.datetime(2018,3, 1)
tickerInformation = yf.Ticker(ticker)
tickerHistoryInformation = tickerInformation.history(start = startDate, end = endDate)

# Convert the dictionary to a JSON string
ticker_json = tickerHistoryInformation.to_json()

# Write the JSON string to a file
with open('tickerInformation.json', 'w') as f:
    f.write(ticker_json)

tickerHistoryInformation.to_csv("tickertag{}_history.csv")
#print(GetInformation.history(start = startDate, end = endDate))
