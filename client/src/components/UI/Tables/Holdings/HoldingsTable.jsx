import React, {useState, useEffect} from 'react';
import {Table} from 'react-bootstrap';
import {formatDateForUI, getAccountById} from '../../../../functions/utilities';
import HoldingsRow from './HoldingsRow';

export default function HoldingsTable({isMobile, stock, accounts, holdings, exchange}){

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
              holding={holding} stock={stock[holding.ticker]} 
              accounts={accounts} exchange={exchange}/>
          ))}
        </tbody>
      </Table>
    </div>
  )
}