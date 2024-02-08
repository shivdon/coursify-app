export const getDate = () => {
  const date = new Date();

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 2).padStart(2, "0"); // Months are 0-based in JavaScript
  const year = date.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate; // Output: DD/MM/YYYY
};
