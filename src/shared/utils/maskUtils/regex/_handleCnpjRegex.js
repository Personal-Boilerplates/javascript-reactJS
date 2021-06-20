import thisGetValue from '../utils/_thisGetValue';
import thisHandleOptions from '../utils/_thisHandleOptions';

/**
 * @param {String} value Aceita evento html.
 * @param {Object} options
 * @param {Boolean} options.setRef Padrão true. Se o value for uma ref ou um evento html, irá substituir seu valor.
 * @param {Number} options.maxLength Tamanho máximo da string
 */
function _handleCnpjRegex(value, options) {
  let v = thisGetValue(value);

  v = v.replace(/\D/g, '');
  if (v.length > 14) v = v.slice(0, 14);

  v = v.replace(/(\d{2})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d)/, '$1/$2');
  v = v.replace(/(\d{4})(\d{1,2})$/, '$1-$2');

  thisHandleOptions(v, value, options);

  return v;
}

export default _handleCnpjRegex;
