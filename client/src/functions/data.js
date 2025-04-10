const isDev = true;
const API_BASE_URL = isDev ? 
  'http://localhost:5000' : import.meta.env.VITE_SERVER_API_URL;
export {API_BASE_URL};

//ACCOUNTS
export const getAllAccounts = async () => {
  return getData('/accounts/');
};

export const deleteAccountById = async (id) => {
  return deleteData(`/accounts/${id}`)
}

export const createNewAccount = async (body) => {
  return createData(`/accounts`, body);
}

export const updateAccountNameById = async (id, body) => {
  return updateData(`/accounts/name/${id}`, body);
}

//TRANSACTIONS
export const getAllTransactions = async () => {
  return getData('/transactions/');
}

export const getMonthlyIncome = async (year, month) => {
  return getData(`/transactions/income/monthly?year=${year}&month=${month}`);
}

export const getYearlyIncome = async (year) => {
  return getData(`/transactions/income/yearly?year=${year}`);
}

export const getMonthlyExpenses = async (year, month) => {
  return getData(`/transactions/expense/monthly?year=${year}&month=${month}`);
}

export const getYearlyExpenses = async (year) => {
  return getData(`/transactions/expense/yearly?year=${year}`);
}

export const getYearlyData = async (year) => {
  return getData(`/transactions/yearlyByMonth?year=${year}`);
}

export const createNewTransaction = async (body) => {
  return createData(`/transactions`, body);
}

export const updateTransactionById = async (id, body) => {
  return updateData(`/transactions/${id}`, body);
}

export const deleteTransactionById = async (id) => {
  return deleteData(`/transactions/${id}`);
}

// HOLDING
export const getAllHoldings = async () => {
  return getData('/holdings/');
}

export const createNewHolding = async (body) => {
  return createData(`/holdings`, body);
}

export const updateHolding = async (id, body) => {
  return updateData(`/holdings/${id}`, body); 
}

export const deleteHoldingById = async (id) => {
  return deleteData(`/holdings/${id}`);
}

// export const addDividendById= async (id, body) => {
//   return updateData(`/holdings/dividend/${id}`, body)
// }

// DVIDENDS
export const createNewDividend = async (body) => {
  return createData(`/dividends`, body);
}

export const getAllDividends = async () => {
  return getData('/dividends/');
}

export const updateDividend = async (id, body) => {
  return updateData(`/dividends/${id}`, body); 
}  

// GET DATA FROM GOOGLE SHEET
export const getGoogleSheetData = async () => {
  return getData('/market/');
};

///////////////////
const getData = async (endpoint) => {
  try {
    const res = await fetch(
      `${API_BASE_URL}${endpoint}`, 
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
      }
    );
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(err.message);
    return null;
  }
};

const updateData = async (endpoint, body) => {
  try {
    const res = await fetch(
      `${API_BASE_URL}${endpoint}`, 
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(body) 
      }
    );
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(err.message);
    return null;
  }
};

const createData = async (endpoint, body) => {
  try {
    const res = await fetch(
      `${API_BASE_URL}${endpoint}`, 
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: body && JSON.stringify(body) 
      }
    );
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(err.message);
    return null;
  }
}

const deleteData = async (endpoint) => {
  try {
    const res = await fetch(
      `${API_BASE_URL}${endpoint}`, 
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'},
      }
    );
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(err.message);
    return null;
  }
}