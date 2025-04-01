const isDev = true;
const API_BASE_URL = isDev ? 
  'http://localhost:5000' : import.meta.env.VITE_SERVER_API_URL;
export {API_BASE_URL};

const API_TWELVEDATA_BASE_URL = import.meta.env.VITE_TWELVEDATA_API_URL;
const API_TWELVEDATA_KEY = import.meta.env.VITE_TWELVEDATA_API_KEY;

//ACCOUNTS
export const getAccounts = async () => {
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
export const getTransactions = async () => {
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
export const getHoldings = async () => {
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

// TWELVE DATA
export const getTwelveData = async (symbol) => {
  try{
    const interval = '1min'; 
    const outputsize = 1;
    const res = await fetch(
      `${API_TWELVEDATA_BASE_URL}?symbol=${symbol}&interval=${interval}&outputsize=${outputsize}&apikey=${API_TWELVEDATA_KEY}`, 
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
      }
    ) 
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(err.message);
    return null;
  }
}

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