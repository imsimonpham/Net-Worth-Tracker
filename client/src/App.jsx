import Popup from './components/Others/Popup';
import { Routes, Route} from 'react-router-dom';
import NavigationBar from './components/Others/NavigationBar';
import Spendings from './pages/Spendings';
import React, {useState, useEffect} from "react";
import {getAllTransactions } from './functions/data';
import { useMediaQuery } from "react-responsive";

export default function App(){
  //get transactions
  const [transactions, setTransactions] = useState([]);
  const getTransactions = async() => {
    const transactions = await getAllTransactions();
    setTransactions(transactions);
  }

  useEffect(()=>{
    getTransactions();
  }, [])
  

  //mobile display
  const isMobile = useMediaQuery({ maxWidth: 1000 });
  
  return (
    <div className="container">
      <NavigationBar className="mb-5"/>
      <Routes>
        <Route path="/" 
          element={<Spendings 
          transactions={transactions} 
          setTransactions={setTransactions}
          getTransactions={getTransactions}
          isMobile={isMobile}/>}/>
      </Routes>
      <Popup 
        getTransactions={getTransactions}
        isMobile={isMobile} 
      />
    </div>
  )
}