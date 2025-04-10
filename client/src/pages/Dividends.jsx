import React, {useState, useEffect} from 'react';
import DividendTable from '../components/UI/Tables/Dividends/DividendTable';

export default function Dividends({isMobile, accounts, holdings, getDividends, dividends, setDividends}){

  return (
    <>
      <DividendTable dividends={dividends} setDividends={setDividends} isMobile={isMobile} accounts={accounts} holdings={holdings} getDividends={getDividends}/>
    </>
  )
}