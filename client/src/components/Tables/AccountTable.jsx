import { Table, Spinner } from 'react-bootstrap';
import { getAccounts } from '../../functions/data';
import AccountRow from './AccountRow';

export default function AccountTable ({accounts, deleteAccount}) {
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
        {!accounts ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : accounts.map((account)=> (
          <AccountRow 
            key={account.id} 
            account={account} 
            deleteAccount={deleteAccount} 
            getAccounts={getAccounts}/>
        ))}
      </tbody>
    </Table>
  )
}