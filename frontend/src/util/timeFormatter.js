function timeFormatter(timestamp) {
    // Create a Date object from the timestamp
    const date = new Date(timestamp);

    // Extract hours and minutes
    let hours = date.getHours();
    const minutes = date.getMinutes();

    // Determine if it's AM or PM
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)

    // Format the time components
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    // Return the formatted time string with AM/PM
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

module.exports = timeFormatter;

