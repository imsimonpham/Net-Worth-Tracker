import React from 'react';
import HoldingsTable from '../components/UI/Tables/Holdings/HoldingsTable';

export default function Portfolio({accounts, holdings, setHoldings, getHoldings,  marketData, isMobile}){
  return (
    <>
      <HoldingsTable 
        getHoldings={getHoldings}
        setHoldings={setHoldings}
        accounts={accounts} holdings={holdings}
        marketData={marketData}
        isMobile={isMobile}  
      />
    </>
  )
}