import React, {useState, useEffect, useMemo} from 'react';
import { getTwelveData, getHoldings} from '../functions/data';
import HoldingsTable from '../components/UI/Tables/Holdings/HoldingsTable';

export default function Portfolio({isMobile, accounts}){
  const [holdings, setHoldings] = useState([]);
  const getAllHoldings = async () => {
    const holdings = await getHoldings();
    setHoldings(holdings);
  }

  useEffect(() => {
    getAllHoldings();
  }, []);
  
  const tickerString = useMemo(
    () => holdings
      .map(item => item.ticker)
      .join(","),
    [holdings]
  );

  const exchangeTickerString = 'USD/CAD';
  const [marketData, setMarketData] = useState(() => {
    const storedMarketData = localStorage.getItem('marketData');
    return storedMarketData ? JSON.parse(storedMarketData) : {};
  });
  const [exchangeRateData, setExchangeRateData] = useState(() => {
    const storedExchangeData = localStorage.getItem('exchangeRateData');
    return storedExchangeData ? JSON.parse(storedExchangeData) : {};
  })

  const getMarketData = async (tickerString) => {
    if (tickerString) {
      const data = await getTwelveData(tickerString);
      // Only update state and localStorage if the data is valid (not an error message)
      if (data && !data.message?.includes('out of credits')) { // Adjust condition based on API response
        setMarketData(data);
        localStorage.setItem('marketData', JSON.stringify(data));
      }
    }
  };
  
  const getExchangeData = async (tickerString) => {
    if (tickerString) {
      const data = await getTwelveData(tickerString);
      // Only update state and localStorage if the data is valid (not an error message)
      if (data && !data.message?.includes('out of credits')) { // Adjust condition based on API response
        setExchangeRateData(data);
        localStorage.setItem('exchangeRateData', JSON.stringify(data));
      }
    }
  };

  useEffect(() => {
    // Only fetch immediately if no valid data exists in localStorage
    const storedMarketData = localStorage.getItem('marketData');
    const storedExchangeData = localStorage.getItem('exchangeRateData');
  
    const hasValidMarketData = storedMarketData && JSON.parse(storedMarketData)?.values; // Adjust based on your data structure
    const hasValidExchangeData = storedExchangeData && JSON.parse(storedExchangeData)?.values; // Adjust based on your data structure
  
    if (tickerString && !hasValidMarketData) {
      getMarketData(tickerString);
    }
    if (exchangeTickerString && !hasValidExchangeData) {
      getExchangeData(exchangeTickerString);
    }
    // Set lastFetchTime even if we skip the fetch, to track the last check
    if (!hasValidMarketData || !hasValidExchangeData) {
      localStorage.setItem('lastFetchTime', Date.now());
    }
  
    // Set up the interval for subsequent fetches every 60 seconds
    const interval = setInterval(() => {
      const lastFetchTime = localStorage.getItem('lastFetchTime');
      const currentTime = Date.now();
      const oneMinuteInMs = 60000;
  
      if (!lastFetchTime || currentTime - lastFetchTime > oneMinuteInMs) {
        if (tickerString) {
          getMarketData(tickerString);
        }
        if (exchangeTickerString) {
          getExchangeData(exchangeTickerString);
        }
        localStorage.setItem('lastFetchTime', currentTime);
      }
    }, 60000); // Check every 60 seconds
  
    return () => clearInterval(interval); // Clean up interval
  }, [tickerString, exchangeTickerString]);
  

  // const marketData = {
  //   "BTC/USD": {
  //     meta: {
  //       symbol: "BTC/USD",
  //       interval: "1min",
  //       currency_base: "Bitcoin",
  //       currency_quote: "US Dollar",
  //       exchange: "Coinbase Pro",
  //       type: "Digital Currency"
  //     },
  //     values: [
  //       {
  //         datetime: "2025-04-01 18:43:00",
  //         open: "85080.46",
  //         high: "85088.76",
  //         low: "85042.32",
  //         close: "85083.54"
  //       }
  //     ],
  //     status: "ok"
  //   },
  //   TSLA: {
  //     meta: {
  //       symbol: "TSLA",
  //       interval: "1min",
  //       currency: "USD",
  //       exchange_timezone: "America/New_York",
  //       exchange: "NASDAQ",
  //       mic_code: "XNGS",
  //       type: "Common Stock"
  //     },
  //     values: [
  //       {
  //         datetime: "2025-04-01 14:43:00",
  //         open: "269.13",
  //         high: "269.45",
  //         low: "268.77",
  //         close: "269.45",
  //         volume: "15912"
  //       }
  //     ],
  //     status: "ok"
  //   },
  //   "XRP/USD": {
  //     meta: {
  //       symbol: "XRP/USD",
  //       interval: "1min",
  //       currency_base: "XRP",
  //       currency_quote: "US Dollar",
  //       exchange: "Huobi",
  //       type: "Digital Currency"
  //     },
  //     values: [
  //       {
  //         datetime: "2025-04-01 18:40:00",
  //         open: "2.13435",
  //         high: "2.13594",
  //         low: "2.13435",
  //         close: "2.13594"
  //       }
  //     ],
  //     status: "ok"
  //   },
  //   NVDA: {
  //     meta: {
  //       symbol: "NVDA",
  //       interval: "1min",
  //       currency: "USD",
  //       exchange_timezone: "America/New_York",
  //       exchange: "NASDAQ",
  //       mic_code: "XNGS",
  //       type: "Common Stock"
  //     },
  //     values: [
  //       {
  //         datetime: "2025-04-01 14:43:00",
  //         open: "107.955",
  //         high: "108.03",
  //         low: "107.91",
  //         close: "108",
  //         volume: "6910"
  //       }
  //     ],
  //     status: "ok"
  //   }
  // };

  // const exchangeRateData = {
  //   meta: {
  //     currency_base: "US Dollar",
  //     currency_quote: "Canadian Dollar",
  //     interval: "1min",
  //     symbol: "USD/CAD",
  //     type: "Physical Currency"
  //   },
  //   status: "ok",
  //   values: [
  //     {
  //       close: "1.43100",
  //       datetime: "2025-03-28 01:43:00",
  //       high: "1.43110",
  //       low: "1.43100",
  //       open: "1.43110"
  //     }
  //   ]
  // }

  return (
    <>
      <HoldingsTable 
        isMobile={isMobile}  
        accounts={accounts} holdings={holdings}
        exchangeRateData={exchangeRateData} setHoldings={setHoldings} 
        marketData={marketData}/>
    </>
  )
}