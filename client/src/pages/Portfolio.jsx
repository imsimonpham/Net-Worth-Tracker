import React, {useState, useEffect} from 'react';
import { getTwelveData, getHoldings} from '../functions/data';
import HoldingsTable from '../components/UI/Tables/Holdings/HoldingsTable';

export default function Portfolio({isMobile, accounts}){
  const [holdings, setHoldings] = useState([]);

  const getMarketPrice = async (symbol, isCrypto) => {
    try {
      const price = await getTwelveData(symbol, isCrypto);
      console.log( price); // Only 1 log
    } catch (error) {
        console.error("Error fetching market price:", error);
    }
  }

  // useEffect(() => {
  //   getMarketPrice('TSLA,NVDA', false);
  // }, []);

 const getAllHoldings = async () => {
  const holdings = await getHoldings();
  setHoldings(holdings);
 }

 useEffect(() => {
  getAllHoldings();
  }, []);

  const stock = {
    TSLA: {
      meta: {
        symbol: "TSLA",
        interval: "1min",
        currency: "USD",
        exchange_timezone: "America/New_York",
        exchange: "NASDAQ",
        mic_code: "XNGS",
        type: "Common Stock"
      },
      values: [
        {
          datetime: "2025-03-27 12:22:00",
          open: "284.7",
          high: "285.13",
          low: "288.00",
          close: "284.37",
          volume: "10591"
        }
      ],
      status: "ok"
    },
    NVDA: {
      meta: {
        symbol: "NVDA",
        interval: "1min",
        currency: "USD",
        exchange_timezone: "America/New_York",
        exchange: "NASDAQ",
        mic_code: "XNGS",
        type: "Common Stock"
      },
      values: [
        {
          datetime: "2025-03-27 12:22:00",
          open: "112.86",
          high: "112.91",
          low: "105.00",
          close: "112.8",
          volume: "11245"
        }
      ],
      status: "ok"
    }
  };
  

  const crypto = {
    meta: {
      currency_base: "XRP",
      currency_quote: "Canadian Dollar",
      exchange: "Synthetic",
      interval: "1min",
      symbol: "XRP/CAD",
      type: "Digital Currency"
    },
    status: "ok",
    values: [
      {
        close: "3.34448",
        datetime: "2025-03-27 14:29:00",
        high: "3.34448",
        low: "3.34448",
        open: "3.34448"
      }
    ]
  }

  const exchange = {
    meta: {
      currency_base: "US Dollar",
      currency_quote: "Canadian Dollar",
      interval: "1min",
      symbol: "USD/CAD",
      type: "Physical Currency"
    },
    status: "ok",
    values: [
      {
        close: "1.43100",
        datetime: "2025-03-28 01:43:00",
        high: "1.43110",
        low: "1.43100",
        open: "1.43110"
      }
    ]
  }

  return (
    <>
      <HoldingsTable 
        isMobile={isMobile} stock={stock} 
        accounts={accounts} holdings={holdings}
        exchange={exchange}/>
    </>
  )
}