// Define a function to read the JSON file and return a Promise
import tickerDataCache from "./tickerDataCache.json" assert { type : "json"}


// const readJsonFile = () => {

    // return new Promise((resolve, reject) => {
    //     fs.readFile('tickerDataCache.json', 'utf8', (err, data) => {
    //         if (err) {
    //             reject(err);
    //             return;
    //         }
    //         const jsonData = JSON.parse(data);
    //         resolve(jsonData);
    //     });
    // });
// };

export const get_stock_data = (ticker) => {
    try {
        let jsonData = tickerDataCache;
        let ticker_data = jsonData[0][ticker];
        console.log(ticker);
        console.log(jsonData);
        console.log(ticker_data);
        return ticker_data;
    } catch (err) {
        console.error(err);
        return;
    }
};

export class Stock {
    constructor(symbol, quantity, stock_data) {
        this.symbol = symbol;
        this.price = stock_data[stock_data.length - 1]['close'];
        this.quantity = quantity;
        this.bought_price = stock_data[stock_data.length - 1]['close'];
        this.bought_quantity = quantity;
    }

    static create(symbol, quantity) {
        let stock_data = get_stock_data(symbol);
        return new Stock(symbol, quantity, stock_data);
    }

    getQuantity() { 
        return this.quantity; 
    }

    getTotalValue() {
        return this.price * this.quantity;
    }

    getProfit() {
        return (this.price - this.bought_price) * this.quantity;
    }

    set_curr_quantity(quantity) {
        this.quantity = quantity;
    }

    updatePrice() { // TODO

    }

    getBuyValue(value_to_be_bought) {
        return value_to_be_bought * this.price;
    }

    getSellValue(value_to_be_sold) {
        return value_to_be_sold * this.price;
    }

    toString() {
        return `Stock: ${this.ticker}, Price: ${this.price}, Quantity: ${this.quantity}`;
    }

    search(query,others) {
        p = [];
        for(let i = 0; i < others.length; i++){
            if (query.toLowerCase() == others.symbol.slice(0,query.length).toLowerCase()) {
                p.push(query);
            }
        }
    }
}

export class Portfolio {
    constructor() {
        this.stocks = [];
    }

    addStock(stock) {
        if (this.hasStock(stock.ticker)) {
            // Modify existing stock on the list
            let existing_stock = this.getStock(stock.ticker);
            existing_stock.set_curr_quantity(existing_stock.quantity + stock.quantity);
            //existing_stock.set_curr_price(stock.price);
        } else {
            this.stocks.push(stock);
        }
    }

    hasStock(ticker)
    {
        if(this.stocks.find(stock => stock.ticker === ticker)) {
            return true;
        }
        else
        {
            return false;
        }
    }

    getStock(ticker) {
        return this.stocks.find(stock => stock.ticker === ticker);
    }

    getStocks() {
        return this.stocks;
    }

    getMarketValue() {
        return this.stocks.reduce((total, stock) => total + stock.getTotalValue(), 0);
    }

    getProfit() {
        return this.stocks.reduce((total, stock) => total + stock.getProfit(), 0);
    }

    getDisplayInventory() {
        // Returns a dictionary of stock tickers, and quantities
        let inventory = {};
        this.stocks.forEach(stock => {
            inventory[stock.ticker] = stock.quantity;
        });
        return inventory;
    }

    sellStock(ticker, quantity) {
        let stock = this.getStock(ticker);
        if (stock) {
            if (stock.quantity > quantity) {
                stock.set_curr_quantity(stock.quantity - quantity);
                return stock.get_sell_value(stock.price);
            } else {
                this.stocks.splice(this.stocks.indexOf(stock), 1);
                return stock.get_sell_value(stock.price);
            }
        }
        return 0;
    }

    toString() {
        return this.stocks.map(stock => stock.toString()).join("\n");
    }

    
}

//fetchData();
function main() {
    let my_stock = Stock.create("AAPL", 10);
    console.log(my_stock.getBuyValue(1));
}

