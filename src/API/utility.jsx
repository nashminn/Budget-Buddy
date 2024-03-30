export const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateParts = date.toLocaleDateString('en-US', options).split(', ');
    const [weekday, fullDate] = dateParts;
    const [month, day, year] = fullDate.split(' ');
  
    // Format the date as "Wednesday 20-March-2024"
    return `${weekday} ${day}-${month}-${year || date.getFullYear()}`;
};

export const previousMonth = (currentDate) => {
    // Get the month of the current date (0-indexed, January is 0)
    let currentMonth = currentDate.getMonth();

    // Get the year of the current date
    let currentYear = currentDate.getFullYear();

    // Subtract 1 from the current month to get the previous month
    let previousMonth = currentMonth - 1;

    // If the current month is January, set the previous month to December of the previous year
    if (previousMonth < 0) {
        previousMonth = 11; // December is 11
        currentYear -= 1; // Subtract 1 from the current year
    }

    // Construct a new Date object for the previous month
    const previousMonthDate = new Date(currentYear, previousMonth);

    // Now previousMonthDate holds the Date object for the previous month
    return previousMonthDate;
}


export const nextMonth = (currentDate) => {
    // Get the month of the current date (0-indexed, January is 0)
    // Get the month of the current date (0-indexed, January is 0)
let currentMonth = currentDate.getMonth();

// Get the year of the current date
let currentYear = currentDate.getFullYear();

// Add 1 to the current month to get the next month
let nextMonth = currentMonth + 1;

// If the current month is December, set the next month to January of the next year
if (nextMonth > 11) {
  nextMonth = 0; // January is 0
  currentYear += 1; // Add 1 to the current year
}

// Construct a new Date object for the next month
const nextMonthDate = new Date(currentYear, nextMonth);
    // Now nextMonthDate holds the Date object for the next month
    return nextMonthDate
}