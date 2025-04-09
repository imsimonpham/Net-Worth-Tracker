import React, {useState, useEffect} from 'react';
import DividendTable from '../components/UI/Tables/Dividends/DividendTable';
import { getAllDividends } from '../functions/data';

export default function Dividends({isMobile, accounts, holdings}){
  //fetch dividends
  const [dividends, setDividends] = useState([]);
  const getDividends = async() => {
    const dividends = await getAllDividends();
    setDividends(dividends);
  }

  useEffect(()=>{
    getDividends();
  }, [])

  return (
    <>
      <DividendTable dividends={dividends} setDividends={setDividends} isMobile={isMobile} accounts={accounts} holdings={holdings}/>
    </>
  )
}