import Popup from './components/Others/Popup';
import { Routes, Route, Navigate, useLocation  } from 'react-router-dom';
import NavBar from './components/Others/NavBar';
import Spendings from './pages/Spendings';
import Portfolio from './pages/Portfolio';
import Dividends from './pages/Dividends';
import React, {useState, useEffect} from "react";
import { getAccounts } from './functions/data';
import { useMediaQuery } from "react-responsive";
import { getHoldings, getGoogleSheetData } from './functions/data';

export default function App(){
  //get all accounts
  const [accounts, setAccounts] = useState([]);
  const loadAccounts = async () => {
    const accounts = await getAccounts();
    setAccounts(accounts);
  };
  
  useEffect(()=> {
    loadAccounts();
  }, []);

  //get all holdings and market data
  const [holdings, setHoldings] = useState([]);
  const getAllHoldings = async () => {
    const holdings = await getHoldings();
    setHoldings(holdings);
  }

  const [marketData, setMarketData] = useState([]);

  const getMarketData = async () => {
    const data = await getGoogleSheetData();
    setMarketData(data);
  }

  const dataInterval = 500000;
  

  useEffect(() => {
    getAllHoldings();
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
        <Route path="/portfolio" element={<Portfolio accounts={accounts} holdings={holdings} marketData={marketData}/>} />
        <Route path="/dividends" element={<Dividends accounts={accounts} holdings={holdings}/>} />
        <Route path="/spendings" element={<Spendings accounts={accounts} isMobile={isMobile}/>}/>
        {/* Optionally redirect the root to one of your pages */}
        <Route path="/" element={<Navigate to="/portfolio" replace/>} />
      </Routes>
      <Popup 
        accounts={accounts} setAccounts={setAccounts} 
        isMobile={isMobile} path={path} holdings={holdings}
      />
    </div>
  )
}