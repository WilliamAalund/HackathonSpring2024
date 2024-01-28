const otherFile = require('stockclasses.js');

const starting_cash = 2000;
const year_start = getRandomInt(2000, 2018);
let player_cash = starting_cash;
let player_portfolio = new Portfolio();

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buyStock(symbol, quantity) {
    let stock = new Stock(symbol, quantity);
    buy_price = stock.getTotalValue();
    // Get the stock price
    // If the player has enough money, buy the stock
    // else, return an error
    if (player_cash >= buy_price) {
        player_cash -= buy_price;
        player_portfolio.addStock(stock);
    } else {
        console.log("Not enough money to buy stock");
    }
}

function sellStock(symbol, quantity) {
    let stock = player_portfolio.getStock(symbol);
    sell_price = stock.get_sell_value();
    // If the player has the stock, sell it
    // else, return an error
    if (stock) {
        player_cash += sell_price;
        player_portfolio.removeStock(stock);
    } else {
        console.log("You don't have that stock");
    }
}

