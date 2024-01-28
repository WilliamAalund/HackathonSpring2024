# pip install yfinance

import yfinance as yf
import datetime
import pandas as pd
import csv
import json

tickers = ["AAPL", "MSFT", "META", "CSCO", "AMZN", "TSLA", "NVDA", "COST", "DIS", "NFLX", "INTC", "BAH", "SAVE", "RIOT", "KO", "BITF", "SOFI", "V", "GME"] # These are the tickers that we want to get data for, aiming for 25 tickers

def createTickerQuarterData(quarter, year):
    pass # TODO: Create a JSON file for preselected tickers at a specific quarter
    # For each ticker, get the ticker data for the quarter
    tickerData = {}
    for ticker in tickers: # Doesn't do error checking
        tickerInformation = loadTickerJSON(ticker, quarter, year, write=False)
        tickerData.update({ticker: tickerInformation})
    nested_ticker_data =[tickerData]
    # Convert the dictionary to a JSON string
    ticker_json = json.dumps(nested_ticker_data)
    with open('tickerDataCache.json', 'w') as f:
        f.write(ticker_json)

def getTickerDataAtCurrentDate(tickerName, quarter, year, timeDelta = 0):
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
        new_row['date'] = str(tickerHistoryInformation["Date"].iloc[0])[:10]
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

def loadTickerJSON(tickerName, quarter, year, write = True):
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
        new_row['date'] = str(open_data.iloc[i])[:10]
        new_row['open'] = float(open_data.iloc[i])
        new_row['open'] = float(open_data.iloc[i])
        new_row['high'] = float(high_data.iloc[i])
        new_row['low'] = float(low_data.iloc[i])
        new_row['close'] = float(close_data.iloc[i])
        new_json.append(new_row)

    if write:
        # Convert the DataFrame to a JSON string
        ticker_json = json.dumps(new_json)

        # Write the JSON string to a file
        with open('tickerInformation.json', 'w') as f:
            f.write(ticker_json)
    else:
        return new_json

if __name__ == "__main__":
    createTickerQuarterData(1, 2021)
