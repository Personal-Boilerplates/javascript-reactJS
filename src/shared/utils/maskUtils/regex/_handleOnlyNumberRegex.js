import thisGetValue from '../utils/_thisGetValue';
import thisHandleOptions from '../utils/_thisHandleOptions';

/**
 * @param {String} value Aceita evento html.
 * @param {Object} options
 * @param {Boolean} options.setRef Padrão true. Se o value for uma ref ou um evento html, irá substituir seu valor.
 * @param {Number} options.maxLength Tamanho máximo da string
 */
function _handleSetOnlyNumberRegex(value, options) {
  let v = thisGetValue(value);

  v = v.replace(/\D+/g, '');

  thisHandleOptions(v, value, options);

  return v;
}

export default _handleSetOnlyNumberRegex;
