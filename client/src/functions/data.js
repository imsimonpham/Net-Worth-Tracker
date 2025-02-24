const API_BASE_URL = 'http://localhost:5000';

export const getAccounts = async () => {
  return getData('/accounts/');
};

export const getTransactions = async () => {
  return getData('/transactions/')
}

const getData = async (endpoint, method = 'GET', body = null) => {
  try {
    const options = { 
      method, 
      headers: { 'Content-Type': 'application/json' } 
    };
    
    if (body) options.body = JSON.stringify(body);

    const res = await fetch(
      `${API_BASE_URL}${endpoint}`, 
      options)
    ;
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    
    return await res.json();
  } catch (err) {
    console.error(err.message);
    return null; // Ensure function always returns something
  }
};