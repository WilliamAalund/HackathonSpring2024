var selected
var buttons = document.getElementsByClassName('a');
var BorS

function resetButtons() {
    for (i = 0; i < buttons.length; i++) {
        if(buttons[i].classList.contains('active') && buttons[i].getAttribute("id") != selected) {
            buttons[i].classList.remove('active');
        }
        if(buttons[i].getAttribute("id") == selected && !buttons[i].classList.contains('active')) {
            buttons[i].classList.add('active');
        }
    }
}

function toggleEnable(name) {
    selected = name;
    console.log(selected);
}

function buy(p) {
    if (p == "buy") {
        BorS = 1;
    } else {
        BorS = 0;
    }
}

function lockIn() {
    //buyStock();
}

function update() {
    resetButtons();
}

function frame() {
    update();
}

setInterval(frame, 33);

updateBalanceBox();

//  // Get the element with an ID of 'booger'
// let boogerElement = document.getElementById('inventory');

//  // Create a new list item
// let newListItem = document.createElement('li');

//  // Add a class to the new list item
// newListItem.className = 'list-group-item';

//  // Set the text content of the new list item
// newListItem.textContent = 'New list item';

//  // Add the new list item to the 'booger' element
// boogerElement.appendChild(newListItem);

let ticker_name = 'SAMP' // Fill this with ticker name
const Portfolio = require("./stockclasses.js");
const Stock = require("./stockclasses.js");

const starting_cash = 2000;
const year_start = getRandomInt(2000, 2018);
let player_cash = starting_cash;

let player_portfolio = new Portfolio();

function updateBalanceBox()
{
    var targetElement = document.getElementById("investmentBalance")
    if(targetElement)
    {
        targetElement.textContent = String(player_portfolio.getInvestmentCash());
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buyStock(symbol, quantity) {
    // Check if player has enough money to buy stock
    // If not, return an error
    let stock = new Stock(symbol, quantity);

    if (player_portfolio.hasStock(symbol)) {
        stock = player_portfolio.getStock(symbol);
    }

    purchace_price = stock.get_buy_value(quantity);

    if (player_cash >= purchace_price) {
        player_cash -= purchace_price;
        player_portfolio.addStock(stock);
        console.log("You bought " + quantity + " shares of " + symbol + " for $" + purchace_price);
    }
}

buyStock("AAPL", 10);

function sellStock(symbol, quantity) {
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
        player_cash += sell_price;
        player_portfolio.removeStock(symbol);
        console.log("You sold " + quantity + " shares of " + symbol + " for $" + sell_price);
    }
    else {
        console.log("You don't have that stock");
        return;
    }
}
