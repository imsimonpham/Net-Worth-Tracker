import React, {useEffect, useRef } from 'react';
import HoldingsTable from '../components/UI/Tables/Holdings/HoldingsTable';
import { updateHoldingValueById } from '../functions/data';
import { isDataAvailable } from '../functions/utilities';

export default function Portfolio({accounts, getAccounts, updatedHoldings, setHoldings, getHoldings,  marketData, isMobile}){

  const hasUpdatedRef = useRef(false);
  // this will be set to run periodically later
  const updateHoldingValues = async () => {
    for (const holding of updatedHoldings) {
      const shares = holding.shares;
      const ticker = holding.ticker;
      const marketPrice = marketData.price.find(data => data.ticker === ticker)?.marketPrice;
      const exchangeRate = marketData.exchange[0]?.marketPrice;
      const marketValueCad = parseFloat((shares * marketPrice * exchangeRate).toFixed(2));
      const body = {
        marketValueCad: marketValueCad
      };
  
      await updateHoldingValueById(holding.id, body);
    }
  };

  useEffect(() => {
    if (!hasUpdatedRef.current && isDataAvailable(marketData) && isDataAvailable(updatedHoldings)) {
      updateHoldingValues();
      hasUpdatedRef.current = true; // prevents future updates
    }
  }, [marketData]);

  return (
    <>
      <HoldingsTable 
        getHoldings={getHoldings}
        setHoldings={setHoldings}
        updatedHoldings={updatedHoldings}
        accounts={accounts} getAccounts={getAccounts}
        marketData={marketData}
        isMobile={isMobile}  
      />
    </>
  )
}