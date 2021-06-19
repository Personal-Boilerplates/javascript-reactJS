/**
 * @param {Date} dateProp
 */
function getDateString(dateProp) {
  const date = typeof dateProp === "string" ? new Date(dateProp) : dateProp;

  if (date instanceof Date) {
    function handleNumb(e) {
      return e > 9 ? e : `0${e}`;
    }

    const day = handleNumb(date.getUTCDate());
    const month = handleNumb(date.getUTCMonth() + 1);
    const year = date.getUTCFullYear();
    const hour = handleNumb(date.getUTCHours());
    const min = handleNumb(date.getUTCMinutes());
    const sec = handleNumb(date.getUTCSeconds());

    const dmy = `${day}/${month}/${year}`;
    const hms = `${hour}:${min}:${sec}`;
    const hm = `${hour}:${min}`;
    const dmyhms = `${dmy} às ${hms}`;
    const dmyhm = `${dmy} às ${hm}`;

    return { day, month, year, hour, min, sec, dmy, hms, hm, dmyhms, dmyhm };
  } else {
    return undefined;
  }
}

export default getDateString;
