import React, {useState, useEffect} from 'react';
import {Table} from 'react-bootstrap';
import {formatDateForUI, getAccountById} from '../../../../functions/utilities';
import HoldingsRow from './HoldingsRow';

export default function HoldingsTable({isMobile, stock, accounts}){
  const holdings = [
    {
      ticker: 'TSLA', 
      acctId: 15,
      type: 'Stock',
      shares: 2, 
      avgPrice: '$270.00',
      totalCost: '$540.00',
    }, 
    {
      ticker: 'NVDA', 
      acctId: 15,
      type: 'Stock',
      shares: 2, 
      avgPrice: '$120.00',
      totalCost: '$240.00',
    }
  ]

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
            <th>Total Profit</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((holding, index) => (
            <HoldingsRow 
              key={holding.ticker} isMobile={isMobile} holding={holding} stock={stock[holding.ticker]} accounts={accounts}/>
          ))}
        </tbody>
      </Table>
    </div>
  )
}