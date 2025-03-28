import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faCaretUp, faCaretDown} from '@fortawesome/free-solid-svg-icons';
import {convertToFloat, formatDateForUI, getAccountById } from '../../../../functions/utilities';
import HoldingDeleteButton from '../../Buttons/HoldingDeleteButton';
import HoldingEditButton from '../../Buttons/HoldingsEditButton';

export default function HoldingsRow({isMobile, holding, stock, accounts}){
  if (accounts.length === 0) {
    return null; 
  }
  // console.log(accounts)
  // console.log(stock)
  const marketPrice = parseFloat((stock.values[0].low));
  const totalCost = convertToFloat(holding.totalCost);

  const generateProfitString = (marketPrice, shares, totalCost) => {
    const profit = (marketPrice * shares - totalCost).toFixed(2);
    const isProfitPositive = profit > 0;
    const profitPercentage = ((profit / totalCost) * 100).toFixed(2); 
    const profitString = isProfitPositive ? `+$${profit}` : `-$${Math.abs(profit)}`;
    const icon = isProfitPositive ? faCaretUp : faCaretDown;
    const iconColor = isProfitPositive ? "#63E6BE" : "#dc3545";
  
    return (
      <div>
        <div style={{ color: iconColor }}>
          <FontAwesomeIcon icon={icon} className="middle-align" style={{ color: iconColor }} />
          &nbsp;{profitPercentage}%
        </div>
        <div style={{ color: iconColor }}>
          {profitString}
        </div>
      </div>
    );
  };
  
  

  return (
    <tr>
      <td>{holding.ticker}</td>
      <td>{getAccountById(accounts, holding.acctId).name}</td>
      <td>{holding.type}</td>
      <td>{holding.shares}</td>
      <td>{holding.avgPrice}</td>
      <td>{holding.totalCost}</td>
      <td>${stock.values[0].low}</td>
      <td>
        {generateProfitString(marketPrice, holding.shares, totalCost)}
      </td>
      <td style={{ maxWidth: "90px", textAlign: "right" }}>
        <HoldingEditButton/>
        <HoldingDeleteButton/>
      </td>
    </tr>
  )
}