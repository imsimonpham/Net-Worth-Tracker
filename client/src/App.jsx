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

export default function App(){
  //get all accounts
  const [accounts, setAccounts] = useState([]);
  const getAccounts = async () => {
    const accounts = await getAllAccounts();
    setAccounts(accounts);
  };

  //get all holdings and market data
  const [holdings, setHoldings] = useState([]);
  const getHoldings = async () => {
    const holdings = await getAllHoldings();
    setHoldings(holdings);
  }

  const [marketData, setMarketData] = useState([]);
  const getMarketData = async () => {
    const data = await getGoogleSheetData();
    setMarketData(data);
  }

  //get dividends
  const [dividends, setDividends] = useState([]);
  const getDividends = async() => {
    const dividends = await getAllDividends();
    setDividends(dividends);
  }

  //fetch transactions
  const [transactions, setTransactions] = useState([]);
  const getTransactions = async() => {
    const transactions = await getAllTransactions();
    setTransactions(transactions);
  }

  useEffect(()=>{
    getAccounts();
    getTransactions();
    getDividends();
  }, [])
  
  useEffect(() => {
    getHoldings();
    getMarketData();
  }, [marketData]);


  //path
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
                    holdings={holdings} setHoldings={setHoldings}
                    getHoldings={getHoldings}
                    marketData={marketData}/>} />

        <Route path="/dividends" 
          element={<Dividends 
                    accounts={accounts} holdings={holdings} 
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
        path={path} holdings={holdings}  
        getDividends={getDividends}
        marketData={marketData}
        isMobile={isMobile} 
      />
    </div>
  )
}