import React from 'react';
import HoldingsTable from '../components/UI/Tables/Holdings/HoldingsTable';

export default function Portfolio({accounts, getAccounts, holdings, setHoldings, getHoldings,  marketData, isMobile}){
  return (
    <>
      <HoldingsTable 
        getHoldings={getHoldings}
        setHoldings={setHoldings}
        holdings={holdings}
        accounts={accounts} getAccounts={getAccounts}
        marketData={marketData}
        isMobile={isMobile}  
      />
    </>
  )
}