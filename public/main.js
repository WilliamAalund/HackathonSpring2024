export var ticker_name = 'AAPL'
import {get_stock_data} from './stockclasses.js';

// Get the element with an ID of 'booger'
let boogerElement = document.getElementById('inventory');

 // Create a new list item
let newListItem = document.createElement('li');

 // Add a class to the new list item
newListItem.className = 'list-group-item';

 // Set the text content of the new list item
newListItem.textContent = 'New list item';

 // Add the new list item to the 'booger' element
boogerElement.appendChild(newListItem);

import { Stock, Portfolio } from "./stockclasses.js";

const starting_cash = 2000;
const year_start = getRandomInt(2000, 2018);
let player_cash = starting_cash;

let player_portfolio = new Portfolio();

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function buyStock(symbol, quantity) {
    // Check if player has enough money to buy stock
    // If not, return an error
    let stock = await Stock.create(symbol, quantity);

    if (player_portfolio.hasStock(symbol)) {
        stock = player_portfolio.getStock(symbol);
    }

    let purchace_price = stock.getBuyValue(quantity);

    if (player_cash >= purchace_price) {
        player_cash -= purchace_price; // FIXME needs to refer to the portfolio's cash
        player_portfolio.addStock(stock);
        console.log("You bought " + quantity + " shares of " + symbol + " for $" + purchace_price);
    }
}

function sellStock(symbol, quantity) { // FIXME: Needs to be async
    // Check if player has the stock
    if (player_portfolio.hasStock(symbol)) {
        let stock = player_portfolio.getStock(symbol);
        if (quantity > stock.getQuantity()) {
            quantity = stock.getQuantity();
            console.log("You don't have that many shares of " + symbol + ". Selling all " + quantity + " shares.");
            player_portfolio.sellStock(symbol, quantity);
            return;
        }
        let sell_price = stock.get_sell_value(quantity);
        player_cash += sell_price; // FIXME: Needs to refer to the player_portfolio's cash
        player_portfolio.removeStock(symbol);
        console.log("You sold " + quantity + " shares of " + symbol + " for $" + sell_price);
    }
    else {
        console.log("You don't have that stock");
        return;
    }
}

function updatePlayerMoney(value) {
    let moneyWindow = document.getElementById()
}


function changeTickerName(newName) {
    localStorage.setItem("ticker_name", newName)
    localStorage.setItem("ticker_cache", JSON.stringify(get_stock_data(newName)))
    ticker_name = newName;

    // Assuming the chart object is accessible
    if (window.stockChart && window.stockChart.options && window.stockChart.options.title) {
        console.log("Condition met")
        window.stockChart.options.title.text = newName;
        window.stockChart.render(); // re-render the chart to reflect the changes
    }
}

changeTickerName("AAPL");