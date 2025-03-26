import { Table } from 'react-bootstrap';
import { getAccounts } from '../../../../functions/data';
import AccountRow from './AccountRow';

export default function AccountTable ({accounts, deleteAccount, isMobile}) {
  if(!isMobile){
    return (
      <Table className="table" borderless>
        <thead>
          <tr>
            <th className="fw-bold align-middle" style={{width: "20%"}}>Account Name</th>
            <th className="fw-bold align-middle" style={{width: "15%"}}>Account Type</th>
            <th className="fw-bold align-middle" style={{width: "15%"}}>Cash Balance</th>
            <th className="fw-bold align-middle" style={{width: "20%"}}>Investment Balance</th>
            <th className="fw-bold align-middle" style={{width: "15%"}}>Total Balance</th>
            <th className="fw-bold align-middle" style={{width: "15%"}}></th>
          </tr>
        </thead>
        <tbody>
          {accounts.map(account=> (
            <AccountRow 
            key={account.id} 
            account={account} 
            deleteAccount={deleteAccount} 
            getAccounts={getAccounts}
            isMobile={isMobile}/>
          ))}
        </tbody>
      </Table>
    )
  } else {
    return (
      <div className="">
        {accounts.map((account, index)=> (
          <AccountRow 
          key={account.id} 
          account={account}  
          getAccounts={getAccounts}
          isMobile={isMobile}
          index={index}
          accounts={accounts}/>
        ))}
      </div>
    )
  }
}