import { Table, Spinner } from 'react-bootstrap';
import { getAccounts } from '../../functions/data';
import AccountRow from './AccountRow';

export default function AccountTable ({accounts, deleteAccount}) {
  return (
    <Table className="table" borderless>
      <thead>
        <tr>
          <th className="fw-bold" style={{width: "35%"}}>Account Name</th>
          <th className="fw-bold" style={{width: "30%"}}>Account Type</th>
          <th className="fw-bold" style={{width: "30%"}}>Balance</th>
          <th className="fw-bold" style={{width: "5%"}}></th>
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