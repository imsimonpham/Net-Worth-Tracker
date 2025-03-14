import TransTable from "../components/UI/Tables/Transactions/TransTable";
import IEChartArea from "../components/UI/Charts/IEChartArea";
import React, {useState, useEffect} from 'react';
import { getTransactions } from "../functions/data";

export default function Activity({accounts}){
  //fetch transactions
  const [transactions, setTransactions] = useState([]);
  const getTrans = async() => {
    const transactions = await getTransactions();
    setTransactions(transactions);
  }

  useEffect(()=>{
    getTrans();
  }, [])

  return (
    <>
      <IEChartArea accounts = {accounts}/>
      {/* <CashAccountList accounts = {accounts}/> */}
      <TransTable accounts = {accounts} transactions={transactions} setTransactions={setTransactions}/>
    </>
  )
}