# pip install yfinance

import yfinance as yf
import datetime
import pandas as pd
import csv
import json

def getTickerDataAtCurrentDate(tickerName, quarter, year, timeDelta = 0):
    pass

    if(quarter == 1):
        startDate = datetime.datetime(year, 1, 1)
    elif(quarter == 2):
        startDate = datetime.datetime(year, 4, 1)   
    elif(quarter == 3):
        startDate = datetime.datetime(year, 7, 1) 
    elif(quarter == 4):
        startDate = datetime.datetime(year, 10, 1)

    tickerInformation = yf.Ticker(tickerName)
    try:
        tickerHistoryInformation = tickerInformation.history(start = startDate, end = startDate + datetime.timedelta(days=5))
        new_json = []
        open_data = tickerHistoryInformation["Open"]
        high_data = tickerHistoryInformation["High"]
        low_data = tickerHistoryInformation["Low"]
        close_data = tickerHistoryInformation["Close"]

        new_row = {}
        new_row['date'] = str(open_data.iloc[0])[:10]
        new_row['open'] = float(open_data.iloc[0])
        new_row['open'] = float(open_data.iloc[0])
        new_row['high'] = float(high_data.iloc[0])
        new_row['low'] = float(low_data.iloc[0])
        new_row['close'] = float(close_data.iloc[0])
        new_json.append(new_row)

        ticker_json = json.dumps(new_json)

        return ticker_json
    except:
        timeDelta += 1
        return getTickerDataAtCurrentDate(tickerName, quarter, year, timeDelta)

    # While the length of the tickerHistoryInformation is 0, keep adding a day to the start date
    # while(len(tickerHistoryInformation) == 0):
    #     startDate = startDate + datetime.timedelta(days=1)
    #     tickerHistoryInformation = tickerInformation.history(start = startDate, end = startDate)
    #print(tickerHistoryInformation)

def loadTickerJSON(tickerName, quarter, year):
    if(quarter == 1):
        startDate = datetime.datetime(year, 1, 1)
        endDate = datetime.datetime(year,3, 31)
    elif(quarter == 2):
        startDate = datetime.datetime(year, 4, 1)
        endDate = datetime.datetime(year,6, 30)   
    elif(quarter == 3):
        startDate = datetime.datetime(year, 7, 1)
        endDate = datetime.datetime(year,9, 30)   
    elif(quarter == 4):
        startDate = datetime.datetime(year, 10, 1)
        endDate = datetime.datetime(year,12, 31)  

    tickerInformation = yf.Ticker(tickerName)
    tickerHistoryInformation = tickerInformation.history(start = startDate, end = endDate)
    # Convert the dictionary to a JSON string
    new_json = []
    open_data = tickerHistoryInformation["Open"]
    high_data = tickerHistoryInformation["High"]
    low_data = tickerHistoryInformation["Low"]
    close_data = tickerHistoryInformation["Close"]

    for i in range(len(open_data)):
        new_row = {}
        new_row['date'] = str(open_data.index[i])[:10]
        new_row['open'] = float(open_data[i])
        new_row['open'] = float(open_data[i])
        new_row['high'] = float(high_data[i])
        new_row['low'] = float(low_data[i])
        new_row['close'] = float(close_data[i])
        new_json.append(new_row)
    # Convert the DataFrame to a JSON string
    ticker_json = json.dumps(new_json)

    # Write the JSON string to a file
    with open('tickerInformation.json', 'w') as f:
        f.write(ticker_json)

if __name__ == "__main__":
    loadTickerJSON("MSFT", 1, 2020)
    getTickerDataAtCurrentDate("META", 1, 2020)
