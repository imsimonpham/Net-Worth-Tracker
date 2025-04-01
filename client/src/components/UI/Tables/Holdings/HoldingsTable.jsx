import React, {useState, useEffect} from 'react';
import {Table} from 'react-bootstrap';
import {formatDateForUI, getAccountById} from '../../../../functions/utilities';
import HoldingsRow from './HoldingsRow';
import { deleteHoldingById } from '../../../../functions/data';

export default function HoldingsTable({isMobile, accounts, holdings, exchangeRateData, setHoldings, marketData}){
  //delete holding
  const deleteHolding = async (id) => {
    const deleteTrans = await deleteHoldingById(id);
    setHoldings(holdings.filter(
      holding => holding.id !== id
    ))
    window.location = '/';
  }

  return(
    <div className="section-primary">
      <Table className="table table-hover">
        <thead>
          <tr>
            <th>Holding</th>
            <th>Account</th>
            <th>Category</th>
            <th>Shares</th>
            <th>Average Price</th>
            <th>Total Cost</th>
            <th>Market Price</th>
            <th>Currency</th>
            <th>Total Profit (CAD)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((holding, index) => (
            <HoldingsRow 
              key={holding.ticker} isMobile={isMobile} 
              holding={holding} 
              accounts={accounts} exchangeRateData={exchangeRateData} 
              deleteHolding={deleteHolding} marketData={marketData}/>
          ))}
        </tbody>
      </Table>
    </div>
  )
}