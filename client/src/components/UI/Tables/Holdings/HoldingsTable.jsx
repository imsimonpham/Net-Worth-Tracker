import React, {useState, useEffect} from 'react';
import {Table, Badge } from 'react-bootstrap';
import HoldingsRow from './HoldingsRow';
import { deleteHoldingById } from '../../../../functions/data';
import { isDataAvailable } from '../../../../functions/utilities';

export default function HoldingsTable({accounts, getAccounts, updatedHoldings, setHoldings, getHoldings, marketData, isMobile}){ 

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate loading for 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer); // cleanup on unmount
  }, []);

  //delete holding
  const deleteHolding = async (id) => {
    const deleteHolding = await deleteHoldingById(id);
    await getHoldings(); // need this because of the intermediate derived state of updatedHoldings
    setHoldings(updatedHoldings.filter(
      holding => holding.id !== id
    ))
  }

  return(
    <div className="section-primary">
      <Badge pill bg="dark">
        <span className="fw-bold">
          {isDataAvailable(marketData) > 0 
          ? `1 USD = ${marketData.exchange[0].marketPrice.toFixed(4)} CAD` 
          : 'loading...'}
        </span>
      </Badge>
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : !isDataAvailable(updatedHoldings) ? (
        <p className="text-center">No data available.</p>
      ) : (
        <Table className="table table-hover">
          <thead>
            <tr>
              <th className="align-middle">Holding</th>
              <th className="align-middle">Account</th>
              <th className="align-middle">Category</th>
              <th className="align-middle">Shares</th>
              <th className="align-middle">Average Price</th>
              <th className="align-middle">Total Cost</th>
              <th className="align-middle">Market Price</th>
              <th className="align-middle">Market Value</th>
              <th className="align-middle">Currency</th>
              <th className="align-middle">
                Capital Gain <br />
                (CAD)
              </th>
              <th className="align-middle">
                Total Dividend <br />
                (CAD)
              </th>
              <th className="align-middle">
                Total Return <br />
                (CAD)
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {updatedHoldings.map((holding) => (
              <HoldingsRow
                key={holding.ticker}
                getHoldings={getHoldings}
                holding={holding}
                deleteHolding={deleteHolding}
                updatedHoldings={updatedHoldings}
                accounts={accounts}
                getAccounts={getAccounts}
                marketData={marketData}
                isMobile={isMobile}
              />
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}