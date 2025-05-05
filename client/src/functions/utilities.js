import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

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

export const getColorFromId = (id) => {
  const hue = (id * 137) % 360; // Spread hues evenly
  return `hsl(${hue}, 60%, 65%)`; // Reduce lightness for a darker pastel look
};

export const exportToExcel = (data, filename = 'transactions.xlsx') => {
  // Convert data to worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);
  
  // Create a workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');

  // Write to buffer
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  // Save file
  const fileBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(fileBlob, filename);
};




