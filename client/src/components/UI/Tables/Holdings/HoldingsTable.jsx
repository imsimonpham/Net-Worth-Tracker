import React, {useState, useEffect} from 'react';
import {Table} from 'react-bootstrap';
import HoldingsRow from './HoldingsRow';
import { deleteHoldingById } from '../../../../functions/data';

export default function HoldingsTable({isMobile, accounts, holdings, setHoldings, marketData}){
  
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
            <th>Capital Gain (CAD)</th>
            <th>Total Dividend</th>
            <th>Total Return</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((holding, index) => (
            <HoldingsRow 
              key={holding.ticker} isMobile={isMobile} 
              holding={holding} deleteHolding={deleteHolding}
              accounts={accounts} marketData = {marketData}
            />
          ))}
        </tbody>
      </Table>
    </div>
  )
}