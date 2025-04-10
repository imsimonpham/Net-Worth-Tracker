import {formatDateForUI, getAccountById, getHoldingById} from '../../../../functions/utilities';
import DividendEditButton from '../../Buttons/DividendEditButton';
import DividendDeleteButton from '../../Buttons/DividendDeleteButton';

export default function DividendRow({dividend, isMobile, accounts, holdings,getDividends}){
  const holding = holdings ? getHoldingById(holdings, dividend.holdingId) : null;
  const account = accounts ? getAccountById(accounts, dividend.acctId) : null;

  return (
    <tr>
      <td>{formatDateForUI(dividend.date)}</td>
      <td>{holding ? holding.ticker : 'Loading...'}</td>
      <td>{holding ? holding.type : 'Loading...'}</td>
      <td>{holding ? holding.shares : 'Loading...'}</td>
      <td>{account ? account.name : 'Loading...'}</td>
      <td>{`${dividend.amount}`}</td>
      <td style={{ maxWidth: "90px", textAlign: "right" }}>
        <DividendEditButton
          dividend={dividend}
          holdings={holdings}
          getDividends={getDividends}
        />
        <DividendDeleteButton />
      </td>
    </tr>
  );
}