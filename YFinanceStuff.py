import yfinance as yf
import datetime
import pandas as pd
import csv

ticker = "META"
startDate = datetime.datetime(2018, 1, 1)
endDate = datetime.datetime(2018,3, 1)
tickerInformation = yf.Ticker(ticker)
tickerInformation.actions.to_csv("tickertag{}.csv")
#print(GetInformation.history(start = startDate, end = endDate))
