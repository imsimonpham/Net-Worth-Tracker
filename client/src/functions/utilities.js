export function convertToFloat(currency) {
  return parseFloat(currency.replace(/[^0-9.-]/g, ""));
}

export  function convertDateToSystemFormat(date) {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDateForUI(stringDate) {
  // Parse the ISO 8601 string directly with new Date()
  const date = new Date(stringDate);

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  // Use the UTC version of the date to avoid time zone issues
  return date.toLocaleDateString('en-US', {
    ...options,
    timeZone: 'UTC',
  });
}

export function getAccountById(accounts, id){
  return accounts.find(account => account.id === Number(id));
}

export function getAccountBalanceById(accounts, id){
  const account = accounts.find(account => account.id === Number(id));
  return convertToFloat(account.balance);
}

export const getColorFromId = (id) => {
  const hue = (id * 137) % 360; // Spread hues evenly
  return `hsl(${hue}, 60%, 65%)`; // Reduce lightness for a darker pastel look
};

export function isDataAvailable(marketData) {
  return marketData && Object.keys(marketData).length > 0;
}



