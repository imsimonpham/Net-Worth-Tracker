import Popup from './components/Others/Popup';
import { Routes, Route, Navigate, useLocation  } from 'react-router-dom';
import NavBar from './components/Others/NavBar';
import Spendings from './pages/Spendings';
import Portfolio from './pages/Portfolio';
import React, {useState, useEffect} from "react";
import { getAccounts } from './functions/data';
import { useMediaQuery } from "react-responsive";

export default function App(){
  const [accounts, setAccounts] = useState([]);
  const loadAccounts = async () => {
    const accounts = await getAccounts();
    setAccounts(accounts);
  };
  
  useEffect(()=> {
    loadAccounts();
  }, []);

  const path = useLocation().pathname;

  //mobile display
  const isMobile = useMediaQuery({ maxWidth: 1000 });
  
  return (
    <div className="container">
      <NavBar className="mb-5" path={path}/>
      <Routes>
        <Route path="/portfolio" element={<Portfolio accounts={accounts}/>} />
        <Route path="/spendings" element={<Spendings accounts={accounts} isMobile={isMobile}/>}/>
        {/* Optionally redirect the root to one of your pages */}
        <Route path="/" element={<Navigate to="/portfolio" replace/>} />
      </Routes>
      <Popup 
        accounts={accounts} setAccounts={setAccounts} 
        isMobile={isMobile} path={path}
      />
    </div>
  )
}