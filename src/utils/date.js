/**
 * Return a relative day time string
 *
 * @param {Date} date
 * @return {string}
 */
export const getDayRelativityFormat = (date) => {
  const now = new Date();
  const diffHours = Math.round((now.getTime() - date.getTime()) / (60 * 60 * 1000));

  if (diffHours < - 1) return 'Futuro';
  if (diffHours < 24) return 'Hoy'; 
  if (diffHours <= 24 * 2) return 'Ayer';
  if (diffHours <= 24 * 7) return 'Hace menos de una semana';
  if (diffHours <= 24 * 30) return 'Hace menos de 30 días';
  return 'Antiguo';
}

/**
 * Return the usual date format 
 *
 * @param {string} date-
 * @return {string} - date in format DD/MM/YYYY
 */
export const getUsualDateFormat = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;

    return day + "/" + month + "/" + year;
}