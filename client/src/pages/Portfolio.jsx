import React from 'react';
import HoldingsTable from '../components/UI/Tables/Holdings/HoldingsTable';

export default function Portfolio({isMobile, accounts, holdings, marketData}){
  return (
    <>
      <HoldingsTable 
        isMobile={isMobile}  
        accounts={accounts} holdings={holdings}
        marketData={marketData}
      />
    </>
  )
}