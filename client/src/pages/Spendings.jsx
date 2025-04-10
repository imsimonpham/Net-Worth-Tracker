import TransTable from "../components/UI/Tables/Transactions/TransTable";
import IEChartArea from "../components/UI/Charts/IEChartArea";
import React from 'react';

export default function Spendings({accounts, getAccounts, transactions, setTransactions, getTransactions, isMobile}){
  return (
    <>
      <IEChartArea accounts = {accounts} transactions={transactions} isMobile={isMobile}/>
      <TransTable 
        accounts = {accounts} getAccounts={getAccounts} 
        getTransactions={getTransactions}
        transactions={transactions} setTransactions={setTransactions}  
        isMobile={isMobile}/>
    </>
  )
}