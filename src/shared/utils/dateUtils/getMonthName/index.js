/**
 * @param {Number} month
 * @param {Object} options
 * @param {Number} options.digits
 */
function getMonthName(month, options) {
  const { digits } = options || {};

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]
  const thisMonth = month?.[month]
  
  if (digits) {
    return thisMonth.slice(0, digits);
  }

  return thisMonth;
}

export default getMonthName;
