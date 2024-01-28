const fs = require('fs');

// Define a function to read the JSON file and return a Promise
const readJsonFile = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('tickerDataCache.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            const jsonData = JSON.parse(data);
            resolve(jsonData);
        });
    });
};

get_stock_data = async (symbol) => {
    try {
        const jsonData = await readJsonFile();
        const symbol_data = jsonData[0][symbol];
        return symbol_data;
        const curr_price = symbol_data[symbol_data.length - 1].close;
        console.log(curr_price);
        return jsonData[symbol];
    } catch (err) {
        console.error(err);
        return;
    }
};

class Stock {
    constructor(symbol) {
        this.symbol = symbol;
        stock_data = get_stock_data(symbol); // Returns a json/array of data 
        // Constructor reads data
        this.price = price;
        this.quantity = quantity;
        this.bought_price = price;
        this.bought_quantity = quantity;

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

    get_sell_value(value_to_be_sold) {
        return value_to_be_sold * this.quantity;
    }

    toString() {
        return `Stock: ${this.symbol}, Price: ${this.price}, Quantity: ${this.quantity}`;
    }
}

class Portfolio {
    constructor() {
        this.stocks = [];
    }

    addStock(stock) {
        this.stocks.push(stock);
    }

    getStock(symbol) {
        return this.stocks.find(stock => stock.symbol === symbol);
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

    sellStock(symbol, quantity) {
        let stock = this.getStock(symbol);
        if (stock) {
            if (stock.quantity >= quantity) {
                stock.set_curr_quantity(stock.quantity - quantity);
                return stock.get_sell_value(stock.price);
            }
        }
        return 0;
    }

    toString() {
        return this.stocks.map(stock => stock.toString()).join("\n");
    }
}
