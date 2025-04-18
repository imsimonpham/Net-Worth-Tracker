import { Table } from 'react-bootstrap';
import AccountRow from './AccountRow';

export default function AccountTable ({accounts, getAccounts, deleteAccount, isMobile}) {
  if(!isMobile){
    return (
      <Table className="table" borderless>
        <thead>
          <tr>
            <th className="fw-bold align-middle" style={{width: "20%"}}>Account Name</th>
            <th className="fw-bold align-middle" style={{width: "15%"}}> Balance</th>
            <th className="fw-bold align-middle" style={{width: "15%"}}></th>
          </tr>
        </thead>
        <tbody>
          {accounts.map(account=> (
            <AccountRow 
            key={account.id} 
            account={account}  getAccounts={getAccounts}
            deleteAccount={deleteAccount} 
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
          accounts={accounts}
          account={account} getAccounts={getAccounts}      
          index={index}   
          isMobile={isMobile}/>
        ))}
      </div>
    )
  }
}