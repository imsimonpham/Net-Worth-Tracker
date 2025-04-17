import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faCaretUp, faCaretDown} from '@fortawesome/free-solid-svg-icons';
import {convertToFloat, getAccountById, isDataAvailable } from '../../../../functions/utilities';
import HoldingDeleteButton from '../../Buttons/HoldingDeleteButton';
import HoldingEditButton from '../../Buttons/HoldingsEditButton';

export default function HoldingsRow({holding, updatedHoldings, getHoldings, deleteHolding, accounts, getAccounts, marketData, isMobile}){
  if (accounts.length === 0) {
    return null; 
  }

  let exchangeRate;

  if(holding.currency === 'USD'){
    exchangeRate = (isDataAvailable(marketData)) 
      ? marketData.exchange[0].marketPrice 
      : null;
  } else {
    exchangeRate = 1;
  }

  const marketPrice = isDataAvailable(holding) ? holding.marketPrice : 0;
  const marketValue = isDataAvailable(holding) ? holding.marketValue : 0;
  const formattedMarketPrice = marketPrice > 0
  ? `$${marketPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
  : 'loading...';
  const formattedMarketValue = marketValue > 0
  ? `$${marketValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
  : 'loading...';
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
      <div style={{ color: iconColor }}>
        {marketPrice > 0 
         ? <>
              <div>
                <FontAwesomeIcon icon={icon} className="middle-align" />
                &nbsp;{gLPercentage}%
              </div>
              <div>
                {glString}
              </div>
            </>
          : 'calculating...'
        }
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
      <div style={{ color: iconColor }}>
        {marketPrice > 0 
          ? 
            <>
              <div>
                <FontAwesomeIcon icon={icon} className="middle-align" />
                &nbsp;{gLPercentage}%
              </div>
              <div>
                {glString}
              </div>
            </>
          : 
            'calculating...'
        }     
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
          {formattedMarketPrice}
        </span>
      </td>
      <td>
        <span style={{color: "#00aff5"}}>
          {formattedMarketValue}
        </span>
      </td>
      <td>{holding.currency}</td>
      <td>{generateGLString(marketPrice, holding.shares, totalCost)}</td>
      <td>{holding.totalDividend}</td>
      <td>{generateReturnString(marketPrice, holding.shares, totalCost, totalDividend)}</td>
      <td style={{ maxWidth: "auto", textAlign: "right" }}>
        <HoldingEditButton holding={holding} updatedHoldings={updatedHoldings} getHoldings={getHoldings} accounts={accounts} getAccounts={getAccounts} marketData={marketData} />
        <HoldingDeleteButton deleteHolding={deleteHolding} holding={holding}/>
      </td>
    </tr>  
  )
}