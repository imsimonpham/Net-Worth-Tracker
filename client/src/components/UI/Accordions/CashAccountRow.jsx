export default function CashAccountRow({account}){
  return (
    <div className="d-flex justify-content-between account" >
      <p>{account.name}</p>
      <p>{account.cashBalance}</p>
    </div>
  )
}