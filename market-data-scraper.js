#!/usr/bin/env node
/**
 * Market Data Scraper
 * Uses Playwright + APIs to gather real-time market data for Kimi analysis
 */

import { chromium } from 'playwright';
import axios from 'axios';

const MARKET_DATA = {
  alphaVantageKey: process.env.ALPHA_VANTAGE_KEY,
  polygonKey: process.env.POLYGON_KEY
};

/**
 * Get Stock Data via Alpha Vantage
 */
async function getStockData(ticker) {
  if (!MARKET_DATA.alphaVantageKey) {
    console.warn('Alpha Vantage API key not set');
    return null;
  }

  try {
    const response = await axios.get('https://www.alphavantage.co/query', {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol: ticker,
        apikey: MARKET_DATA.alphaVantageKey
      }
    });

    if (response.data['Global Quote']) {
      return {
        ticker,
        price: response.data['Global Quote']['05. price'],
        change: response.data['Global Quote']['09. change'],
        changePercent: response.data['Global Quote']['10. change percent'],
        volume: response.data['Global Quote']['06. volume'],
        timestamp: new Date().toISOString()
      };
    }
  } catch (error) {
    console.error(`Error fetching ${ticker}:`, error.message);
  }
  return null;
}

/**
 * Get Crypto Data via CoinGecko (Free, no API key)
 */
async function getCryptoData(cryptoIds = ['bitcoin', 'ethereum']) {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: cryptoIds.join(','),
        vs_currencies: 'usd',
        include_market_cap: true,
        include_24hr_vol: true,
        include_24hr_change: true
      }
    });

    return {
      data: response.data,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('CoinGecko error:', error.message);
  }
  return null;
}

/**
 * Scrape TradingView for Technical Analysis (Playwright)
 */
async function getTradingViewData(symbol) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto(`https://www.tradingview.com/chart/?symbol=${symbol}`);
    
    // Wait for chart to load
    await page.waitForTimeout(3000);

    // Take screenshot for manual analysis
    const screenshotPath = `/tmp/tradingview_${symbol}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });

    await browser.close();

    return {
      symbol,
      screenshot: screenshotPath,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error(`TradingView error for ${symbol}:`, error.message);
    await browser.close();
  }
  return null;
}

/**
 * Scrape Finviz for Stock Screener
 */
async function getFinvizData(filters = 'ta_highlow_newhigh') {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto(`https://finviz.com/screener.ashx?v=111&f=${filters}`);
    await page.waitForTimeout(2000);

    // Extract table data
    const stocks = await page.evaluate(() => {
      const rows = document.querySelectorAll('table tr');
      const results = [];
      
      rows.forEach((row, idx) => {
        if (idx > 0 && idx < 20) { // First 20 stocks
          const cells = row.querySelectorAll('td');
          if (cells.length > 0) {
            results.push({
              ticker: cells[1]?.textContent?.trim(),
              company: cells[2]?.textContent?.trim(),
              price: cells[3]?.textContent?.trim(),
              change: cells[4]?.textContent?.trim()
            });
          }
        }
      });
      
      return results;
    });

    await browser.close();
    return { stocks, timestamp: new Date().toISOString() };
  } catch (error) {
    console.error('Finviz error:', error.message);
    await browser.close();
  }
  return null;
}

/**
 * Aggregate all market data
 */
async function aggregateMarketData(stocks = ['AAPL', 'MSFT', 'GOOGL'], cryptos = ['bitcoin', 'ethereum']) {
  console.log('📊 Fetching market data...');

  const data = {
    stocks: {},
    crypto: {},
    screener: {},
    timestamp: new Date().toISOString()
  };

  // Fetch stocks
  for (const stock of stocks) {
    const stockData = await getStockData(stock);
    if (stockData) data.stocks[stock] = stockData;
  }

  // Fetch crypto
  const cryptoData = await getCryptoData(cryptos);
  if (cryptoData) data.crypto = cryptoData.data;

  // Fetch screener highlights
  const finvizData = await getFinvizData();
  if (finvizData) data.screener = finvizData;

  return data;
}

// Export for use in other modules
export { getStockData, getCryptoData, getTradingViewData, getFinvizData, aggregateMarketData };

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const data = await aggregateMarketData();
  console.log(JSON.stringify(data, null, 2));
}
