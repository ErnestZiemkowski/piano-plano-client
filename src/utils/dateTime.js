export const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const daysNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const renderMinutes = minutes => {
    if (/^\d$/.test(minutes)) return '0' + minutes;
    return minutes === 0 ? '00' : minutes; 
}