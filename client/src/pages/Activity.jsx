import CashAccountList from "../components/UI/Accordions/CashAccountList";
import TransTable from "../components/UI/Tables/Transactions/TransTable";
import IEChartArea from "../components/UI/Charts/IEChartArea";

export default function Activity({accounts}){

  return (
    <>
      <IEChartArea accounts = {accounts}/>
      {/* <CashAccountList accounts = {accounts}/> */}
      <TransTable accounts = {accounts}/>
    </>
  )
}