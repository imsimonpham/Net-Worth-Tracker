import Popup from './components/Others/Popup';
import { Routes, Route, Navigate, useLocation  } from 'react-router-dom';
import NavBar from './components/Others/NavBar';
import Spendings from './pages/Spendings';
import Portfolio from './pages/Portfolio';
import Dividends from './pages/Dividends';
import React, {useState, useEffect} from "react";
import { getAllAccounts } from './functions/data';
import { useMediaQuery } from "react-responsive";
import { getAllHoldings, getGoogleSheetData, getAllDividends, getAllTransactions } from './functions/data';
import { isDataAvailable } from './functions/utilities';

export default function App(){
  //get all accounts
  const [accounts, setAccounts] = useState([]);
  const getAccounts = async () => {
    const accounts = await getAllAccounts();
    setAccounts(accounts);
  };

  // get market data
  const [marketData, setMarketData] = useState([]);
  const getMarketData = async () => {
    const data = await getGoogleSheetData();
    setMarketData(data);
  }

  // get all holdings and update them
  const [holdings, setHoldings] = useState([]);
  const [updatedHoldings, setUpdatedHoldings] = useState([]);
  const getHoldings = async () => {
    const holdings = await getAllHoldings();
    setHoldings(holdings);
  }

  const updateHoldingsWithMarketData = (holdings, marketData) => {
    return holdings.map((holding) => {
      const { ticker, shares} = holding;
      
      const exchangeRate = marketData.exchange[0].marketPrice;
      const holdingTicker = marketData.price.find((item) => item.ticker === ticker);
      const marketPrice = holdingTicker.marketPrice;
  
      const numShares = parseFloat(shares);
      const marketValue = numShares * marketPrice;
      const marketValueCad = marketValue * exchangeRate;
      
      return {
        ...holding,
        shares: numShares,
        marketPrice: parseFloat(marketPrice.toFixed(2)),
        marketValue: parseFloat(marketValue.toFixed(2)),
        marketValueCad: parseFloat(marketValueCad.toFixed(2))
      };
    });
  };

  //get dividends
  const [dividends, setDividends] = useState([]);
  const getDividends = async() => {
    const dividends = await getAllDividends();
    setDividends(dividends);
  }

  //get transactions
  const [transactions, setTransactions] = useState([]);
  const getTransactions = async() => {
    const transactions = await getAllTransactions();
    setTransactions(transactions);
  }

  useEffect(()=>{
    getAccounts();
    getTransactions();
    getDividends();
    getHoldings();
  }, [])
  
  useEffect(() => {
    getMarketData();
    if (holdings.length > 0 && isDataAvailable(marketData)) {
      const updated = updateHoldingsWithMarketData(holdings, marketData);
      setUpdatedHoldings(updated);
    }
  }, [marketData]);

  // path
  const path = useLocation().pathname;

  //mobile display
  const isMobile = useMediaQuery({ maxWidth: 1000 });
  
  return (
    <div className="container">
      <NavBar className="mb-5" path={path}/>
      <Routes>
        <Route path="/portfolio" 
          element={<Portfolio 
                    accounts={accounts} getAccounts={getAccounts}
                    updatedHoldings={updatedHoldings} 
                    setHoldings={setUpdatedHoldings}
                    getHoldings={getHoldings}
                    marketData={marketData}/>} />

        <Route path="/dividends" 
          element={<Dividends 
                    accounts={accounts} updatedHoldings={updatedHoldings} 
                    getDividends={getDividends} setDividends={setDividends} dividends={dividends}/>} />

        <Route path="/spendings" 
          element={<Spendings 
                    transactions={transactions} 
                    setTransactions={setTransactions}
                    getTransactions={getTransactions}
                    accounts={accounts} getAccounts={getAccounts}
                    isMobile={isMobile}/>}/>
         <Route path="*" element={<Navigate to="/portfolio" replace />} />
      </Routes>
      <Popup 
        accounts={accounts} setAccounts={setAccounts} 
        getAccounts={getAccounts}
        getTransactions={getTransactions}
        getHoldings={getHoldings}
        path={path} updatedHoldings={updatedHoldings}  
        getDividends={getDividends}
        marketData={marketData}
        isMobile={isMobile} 
      />
    </div>
  )
}