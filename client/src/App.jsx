import Popup from './components/Others/Popup';
import Navbar from './components/Others/Navbar';
import Activity from './pages/Activity';
import React, {useState, useEffect} from "react";
import { getAccounts } from './functions/data';

export default function App(){
  const [accounts, setAccounts] = useState([]);
  
  const loadAccounts = async () => {
    const accounts = await getAccounts();
    setAccounts(accounts);
  };
  
  useEffect(()=> {
    loadAccounts();
  }, []);
  
  return (
    <div className="container">
      <Navbar className="mb-5"/>
      <Activity accounts={accounts}/>
      <Popup accounts={accounts} setAccounts={setAccounts}/>
    </div>
  )
}