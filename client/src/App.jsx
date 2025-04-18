import Popup from './components/Others/Popup';
import { Routes, Route, Navigate} from 'react-router-dom';
import NavBar from './components/Others/NavBar';
import Spendings from './pages/Spendings';
import React, {useState, useEffect} from "react";
import { getAllAccounts, getAllTransactions } from './functions/data';
import { useMediaQuery } from "react-responsive";

export default function App(){
  //get all accounts
  const [accounts, setAccounts] = useState([]);
  const getAccounts = async () => {
    const accounts = await getAllAccounts();
    setAccounts(accounts);
  };

  //get transactions
  const [transactions, setTransactions] = useState([]);
  const getTransactions = async() => {
    const transactions = await getAllTransactions();
    setTransactions(transactions);
  }

  useEffect(()=>{
    getAccounts();
    getTransactions();
  }, [])
  

  //mobile display
  const isMobile = useMediaQuery({ maxWidth: 1000 });
  
  return (
    <div className="container">
      <NavBar className="mb-5"/>
      <Routes>
        <Route path="/spendings" 
          element={<Spendings 
          transactions={transactions} 
          setTransactions={setTransactions}
          getTransactions={getTransactions}
          accounts={accounts} getAccounts={getAccounts}
          isMobile={isMobile}/>}/>
         <Route path="*" element={<Navigate to="/spendings" replace />} />
      </Routes>
      <Popup 
        accounts={accounts} setAccounts={setAccounts} 
        getAccounts={getAccounts}
        getTransactions={getTransactions}
        isMobile={isMobile} 
      />
    </div>
  )
}