import Popup from './components/Others/Popup';
import Navbar from './components/Others/Navbar';
import Activity from './pages/Activity';
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

  //mobile display
  const isMobile = useMediaQuery({ maxWidth: 1000 });
  
  return (
    <div className="container">
      <Navbar className="mb-5"/>
      <Activity accounts={accounts} isMobile={isMobile}/>
      <Popup accounts={accounts} setAccounts={setAccounts} isMobile={isMobile}/>
    </div>
  )
}