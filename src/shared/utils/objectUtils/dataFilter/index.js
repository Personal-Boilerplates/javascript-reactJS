/* eslint-disable eqeqeq */
import isObject from "../isObject";

/**
 * @typedef {Object} optionsType
 * @property {Boolean} deepFilter
 * @property {Boolean} caseSensitive
 * @property {Boolean} allowSymbols
 * @property {Boolean} allowSpaces
 * @property {'exactly' | 'equal' | 'includes'} compareMethod
 */

/**
 * @param {any} data 
 * @param {optionsType} options
 */
function convertData(data, options) {
  const isNotIncludes = ['equal', 'exactly'].some(e => e === options.compareMethod);
  const {
    caseSensitive = isNotIncludes,
    allowSymbols = isNotIncludes,
    allowSpaces = isNotIncludes,
  } = options || {};

  let d = String(data);
  if (!allowSymbols) {
    if (!allowSpaces) {
      d = d.replace(/[^a-zA-Z0-9 ]/g, "");
    } else {
      d = d.replace(/[^a-zA-Z0-9]/g, "");
    }
  } else if (!allowSpaces) {
    d = d.replace(/[^ ]/g, "");
  }
  if (!caseSensitive) {
    d = d.toLowerCase();
  }
  return d;
}

/**
 * @param {any} thisData 
 * @param {any} thisFilter 
 * @param {optionsType} options
 */
function everyKey(thisData, thisFilter, options) {
  const { deepFilter, compareMethod } = options || {};

  if (isObject(thisFilter)) {
    return Object.entries(thisFilter).every(([k, v]) => {
      if (thisData?.[k]) {
        return everyKey(thisData[k], v, options);
      } else {
        return false;
      }
    });
  } else if (Array.isArray(thisFilter) && Array.isArray(thisData)) {
    if (deepFilter) {
      for (let index = thisData.length; index > 0; index--) {
        const thisIndex = thisFilter.indexOf((f) =>
          everyKey(thisData[index], f, options)
        );
        if (!(thisIndex >= 0)) {
          thisData.splice(index, 1);
        }
      }

      return thisData.length > 0;
    } else {
      return thisFilter.every((f) => {
        const thisIndex = thisData.indexOf((d) => everyKey(d, f, options));

        return thisIndex >= 0;
      });
    }
  } else if (typeof thisFilter === "function") {
    return thisFilter(thisData);
  } else if (thisFilter) {
    const convertedData = convertData(thisData);
    const filteredData = convertData(thisFilter);
    if (compareMethod === 'exactly') {
      return convertedData === filteredData;
    } else if (compareMethod === 'equal') {
      return convertedData == filteredData;
    } else {
      return convertedData.includes(filteredData);
    }
  } else {
    return true;
  }
}

/**
 * @param {any} data
 * @param {any} filter
 * @param {optionsType} options
 */
function dataFilter(data, filter, options) {
  if (data) {
    const isArray = Array.isArray(data);
    const thisData = isArray ? data : [data];
    const thisFilter = Array.isArray(filter) ? filter : [filter];

    const thisResult = thisData.filter(
      (d) => thisFilter.findIndex((f) => everyKey(d, f, options)) >= 0
    );

    return isArray ? thisResult : thisResult?.[0];
  } else {
    return data;
  }
}

export default dataFilter;
