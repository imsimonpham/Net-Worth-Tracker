import CashAccountList from "../components/UI/Accordions/CashAccountList";
import TransTable from "../components/UI/Tables/Transactions/TransTable";

export default function Activity({accounts}){

  return (
    <>
      <CashAccountList accounts = {accounts}/>
      <TransTable accounts = {accounts}/>
    </>
  )
}