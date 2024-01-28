const { Stock, Portfolio } = require('./stockclasses');

// Test the Stock class
describe('Stock', () => {
  test('should calculate the total value correctly', () => {
    const stock = new Stock('AAPL', 150, 10);
    expect(stock.getTotalValue()).toBe(1500);
  });

  test('should calculate the profit correctly', () => {
    const stock = new Stock('AAPL', 150, 10);
    expect(stock.getProfit()).toBe(0); // Assuming the bought price is the same as the current price
  });

  test('should set the current quantity correctly', () => {
    const stock = new Stock('AAPL', 150, 10);
    stock.set_curr_quantity(5);
    expect(stock.quantity).toBe(5);
  });

  test('should calculate the sell value correctly', () => {
    const stock = new Stock('AAPL', 150, 10);
    expect(stock.get_sell_value(200)).toBe(2000);
  });

  test('should return the correct string representation', () => {
    const stock = new Stock('AAPL', 150, 10);
    expect(stock.toString()).toBe('Stock: AAPL, Price: 150, Quantity: 10');
  });
});

// Test the Portfolio class
describe('Portfolio', () => {
  test('should add stocks correctly', () => {
    const portfolio = new Portfolio();
    const stock = new Stock('AAPL', 150, 10);
    portfolio.addStock(stock);
    expect(portfolio.stocks.length).toBe(1);
  });

  test('should get a stock correctly', () => {
    const portfolio = new Portfolio();
    const stock = new Stock('AAPL', 150, 10);
    portfolio.addStock(stock);
    expect(portfolio.getStock('AAPL')).toBe(stock);
  });

  test('should calculate the market value correctly', () => {
    const portfolio = new Portfolio();
    const stock1 = new Stock('AAPL', 150, 10);
    const stock2 = new Stock('GOOGL', 200, 5);
    portfolio.addStock(stock1);
    portfolio.addStock(stock2);
    expect(portfolio.getMarketValue()).toBe(2500);
  });

  test('should calculate the profit correctly', () => {
    const portfolio = new Portfolio();
    const stock1 = new Stock('AAPL', 150, 10);
    const stock2 = new Stock('GOOGL', 200, 5);
    portfolio.addStock(stock1);
    portfolio.addStock(stock2);
    expect(portfolio.getProfit()).toBe(0); // Assuming the bought prices are the same as the current prices
  });

  test('should sell a stock correctly', () => {
    const portfolio = new Portfolio();
    const stock = new Stock('AAPL', 150, 10);
    portfolio.addStock(stock);
    const sellValue = portfolio.sellStock('AAPL', 5);
    expect(sellValue).toBe(750);
    expect(stock.quantity).toBe(5);
  });

  test('should return the correct string representation', () => {
    const portfolio = new Portfolio();
    const stock1 = new Stock('AAPL', 150, 10);
    const stock2 = new Stock('GOOGL', 200, 5);
    portfolio.addStock(stock1);
    portfolio.addStock(stock2);
    const expectedString = 'Stock: AAPL, Price: 150, Quantity: 10\nStock: GOOGL, Price: 200, Quantity: 5';
    expect(portfolio.toString()).toBe(expectedString);
  });
});