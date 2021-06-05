/**
 * @param {Number} month
 * @param {Object} options
 * @param {Number} options.digits
 */
function getMonthName(month, options) {
  const { digits } = options || {};

  function checkName(name) {
    if (digits) {
      return name.slice(0, digits);
    }

    return name;
  }

  switch (month) {
    case 0:
      return checkName("Janeiro");
    case 1:
      return checkName("Fevereiro");
    case 2:
      return checkName("Março");
    case 3:
      return checkName("Abril");
    case 4:
      return checkName("Maio");
    case 5:
      return checkName("Junho");
    case 6:
      return checkName("Julho");
    case 7:
      return checkName("Agosto");
    case 8:
      return checkName("Setembro");
    case 9:
      return checkName("Outubro");
    case 10:
      return checkName("Novembro");
    case 11:
      return checkName("Dezembro");
    default:
      return undefined;
  }
}

export default getMonthName;
