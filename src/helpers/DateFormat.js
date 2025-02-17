import { format } from 'date-fns';

/**
 * Formats a given date to a specified format.
 * @param {Date | string | number} date - The date to format (Date object, timestamp, or ISO string).
 * @param {string} dateFormat - The desired format for the date.
 * @returns {string} - Formatted date string.
 */

//'MMMM d, yyyy' => "February 9, 2025"

/* import { formatDistanceToNow } from 'date-fns';

const date = new Date('2025-02-07');
const relativeDate = formatDistanceToNow(date, { addSuffix: true });
console.log(relativeDate); // "2 days ago" */
export const formatDate = (date, dateFormat = 'EEEE, MMMM d, yyyy, h:mm a') => {
  try {
    // Handle the date string or object
    const parsedDate =
      typeof date === 'string' || typeof date === 'number'
        ? new Date(date)
        : date;

    // Check for an invalid date
    if (!parsedDate || isNaN(parsedDate.getTime())) {
      throw new Error('Invalid date');
    }

    return format(parsedDate, dateFormat);
  } catch (error) {
    console.error('Error formatting date:', error.message);
    return 'Invalid date';
  }
};
