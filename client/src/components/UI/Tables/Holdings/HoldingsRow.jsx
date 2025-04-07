import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faCaretUp, faCaretDown} from '@fortawesome/free-solid-svg-icons';
import {convertToFloat, formatDateForUI, getAccountById, isMultiTicker } from '../../../../functions/utilities';
import HoldingDeleteButton from '../../Buttons/HoldingDeleteButton';
import HoldingEditButton from '../../Buttons/HoldingsEditButton';

export default function HoldingsRow({isMobile, holding, accounts, deleteHolding, marketData}){
  if (accounts.length === 0) {
    return null; 
  }

  // set ticker based on if data has multiple tickers
  // const ticker = isMultiTicker(marketData) && holding ?  marketData[holding.ticker] : marketData;

  let exchangeRate;
  let marketPrice;
  if(holding.currency === 'USD'){
    exchangeRate = (marketData && Object.keys(marketData).length > 0) 
      ? marketData.exchange[0].marketPrice 
      : null;
  } else {
    exchangeRate = 1;
  }

  if(marketData && Object.keys(marketData).length > 0){
    const ticker = marketData.price.find(item => item.ticker === holding.ticker);
    marketPrice = ticker.marketPrice;
  } else {
    marketPrice = 0;
  }

  // const exchangeRate = holding.currency === 'USD' ? marketData?.exchange.marketPrice : 1;

  // const getMarketPrice = (holding) => {
  //   if ((marketData && ticker) && (ticker.meta.symbol === holding.ticker)) {
  //     return parseFloat(parseFloat(ticker.values[0].low).toFixed(2));
  //   } 
  //   return ''; 
  // };

  
  // const marketPrice = getMarketPrice(holding);
  const formattedPrice = marketPrice > 0
  ? `$${marketPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
  : 'not available';
  const totalCost = convertToFloat(holding.totalCost);
  const totalDividend = convertToFloat(holding.totalDividend);
  const generateGLString = (marketPrice, shares, totalCost) => { 
    const gl = ((marketPrice * shares - totalCost)*exchangeRate).toFixed(2);
    const isGLPositive = gl > 0;
    const gLPercentage = ((gl / totalCost) * 100).toFixed(2); 
    const glString = isGLPositive ? `+$${gl}` : `-$${Math.abs(gl)}`;
    const icon = isGLPositive ? faCaretUp : faCaretDown;
    const iconColor = isGLPositive ? "#63E6BE" : "#dc3545";
  
    return (
      <div>
        <div style={{ color: iconColor }}>
          <FontAwesomeIcon icon={icon} className="middle-align" style={{ color: iconColor }} />
          &nbsp;{gLPercentage}%
        </div>
        <div style={{ color: iconColor }}>
          {glString}
        </div>
      </div>
    );
  };

  const generateReturnString = (marketPrice, shares, totalCost, totalDividend) => {   
    const gl = ((marketPrice * shares - totalCost + totalDividend)*exchangeRate).toFixed(2);
    const isGLPositive = gl > 0;
    const gLPercentage = ((gl / totalCost) * 100).toFixed(2); 
    const glString = isGLPositive ? `+$${gl}` : `-$${Math.abs(gl)}`;
    const icon = isGLPositive ? faCaretUp : faCaretDown;
    const iconColor = isGLPositive ? "#63E6BE" : "#dc3545";
  
    return (
      <div>
        <div style={{ color: iconColor }}>
          <FontAwesomeIcon icon={icon} className="middle-align" style={{ color: iconColor }} />
          &nbsp;{gLPercentage}%
        </div>
        <div style={{ color: iconColor }}>
          {glString}
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
      <td>{generateGLString(marketPrice, holding.shares, totalCost)}</td>
      <td>{holding.totalDividend}</td>
      <td>{generateReturnString(marketPrice, holding.shares, totalCost, totalDividend)}</td>
      <td style={{ maxWidth: "auto", textAlign: "right" }}>
        <HoldingEditButton holding={holding} accounts={accounts}/>
        <HoldingDeleteButton deleteHolding={deleteHolding} holding={holding}/>
      </td>
    </tr>
  )
}