import TransTable from "../components/UI/Tables/TransTable";
import IEChartArea from "../components/UI/Charts/IEChartArea";
import React from 'react';

export default function Spendings({transactions, setTransactions, getTransactions, isMobile}){
  return (
    <>
      <IEChartArea transactions={transactions} isMobile={isMobile}/>
      <TransTable  
        getTransactions={getTransactions}
        transactions={transactions} setTransactions={setTransactions}  
        isMobile={isMobile}/>
    </>
  )
}