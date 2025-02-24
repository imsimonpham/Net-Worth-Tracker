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

export function formatDateForUI (stringDate) {
  const date = new Date(stringDate);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  return date.toLocaleDateString('en-US', options);
}