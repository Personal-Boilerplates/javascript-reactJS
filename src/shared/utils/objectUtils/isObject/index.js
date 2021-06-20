export default function isObject(checkData) {
  return Object.prototype.toString.call(checkData) === '[object Object]';
}
