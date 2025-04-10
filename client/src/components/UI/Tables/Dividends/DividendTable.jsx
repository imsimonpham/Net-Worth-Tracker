import { Table } from 'react-bootstrap';
import DividendRow from './DividendRow';

export default function DividendTable ({dividends, setDividends, isMobile, accounts, holdings, getDividends}) {
  return (
    <div className="section-primary">
      <Table className="table table-hover">
        <thead>
          <tr>
            <th>Date</th>
            <th>Holding</th>
            <th>Type</th>
            <th>Shares</th>
            <th>Account</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {dividends
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((dividend) => (
              <DividendRow 
                isMobile={isMobile} key={dividend.id} 
                dividend={dividend} accounts={accounts}
                holdings={holdings} getDividends={getDividends}
              />
          ))}
        </tbody>
      </Table>
    </div>
  )
}