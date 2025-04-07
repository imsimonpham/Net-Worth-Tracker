import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faCaretUp, faCaretDown} from '@fortawesome/free-solid-svg-icons';
import {convertToFloat, formatDateForUI, getAccountById, isMultiTicker } from '../../../../functions/utilities';
import HoldingDeleteButton from '../../Buttons/HoldingDeleteButton';
import HoldingEditButton from '../../Buttons/HoldingsEditButton';

export default function HoldingsRow({isMobile, holding, accounts, exchange, deleteHolding, marketData, exchangeRateData}){
  if (accounts.length === 0) {
    return null; 
  }

  // set ticker based on if data has multiple tickers
  const ticker = isMultiTicker(marketData) && holding ?  marketData[holding.ticker] : marketData;

  const exchangeRate = holding.currency === 'USD' ? exchangeRateData?.values?.[0]?.low || 1 : 1;

  const getMarketPrice = (holding) => {
    if ((marketData && ticker) && (ticker.meta.symbol === holding.ticker)) {
      return parseFloat(parseFloat(ticker.values[0].low).toFixed(2));
    } 
    return ''; 
  };

  
  const marketPrice = getMarketPrice(holding);
  const formattedPrice = typeof marketPrice === 'number' 
  ? `$${marketPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
  : 'not available';
  const totalCost = convertToFloat(holding.totalCost);
  const generateProfitString = (marketPrice, shares, totalCost) => {   
    const profit = ((marketPrice * shares - totalCost)*exchangeRate).toFixed(2);
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
      <td>
        <span style={{color: "#00aff5"}}>
          {formattedPrice}
        </span>
      </td>
      <td>{holding.currency}</td>
      <td>
        {generateProfitString(marketPrice, holding.shares, totalCost)}
      </td>
      <td style={{ maxWidth: "auto", textAlign: "right" }}>
        <HoldingEditButton holding={holding} accounts={accounts}/>
        <HoldingDeleteButton deleteHolding={deleteHolding} holding={holding}/>
      </td>
    </tr>
  )
}