import {formatDateForUI, getAccountById, getHoldingById} from '../../../../functions/utilities';
import DividendEditButton from '../../Buttons/DividendEditButton';
import DividendDeleteButton from '../../Buttons/DividendDeleteButton';

export default function DividendRow({dividend, isMobile, accounts, holdings}){
  const holding = holdings ? getHoldingById(holdings, dividend.holdingId) : '';
  const account = accounts ? getAccountById(accounts, dividend.acctId) : '';
  return (
    <tr>
      <td>{formatDateForUI(dividend.date)}</td>
      <td>{holding.ticker}</td>
      <td>{holding.type}</td>
      <td>{holding.shares}</td>
      <td>{account.name}</td>
      <td>{`${dividend.amount}`}</td>
      <td style={{ maxWidth: "90px", textAlign: "right" }}>
        <DividendEditButton/>
        <DividendDeleteButton/>
      </td>
    </tr>
  )
}