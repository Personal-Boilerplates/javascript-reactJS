/* eslint-disable eqeqeq */

import cloneValue from "../cloneValue";
import isObject from "../isObject";

function convertData(data, options) {
  const {
    exactly,
    equal,
    caseSensitive = false,
    symbols = false,
    spaces = false,
  } = options || {};

  if ((exactly || equal) && typeof data !== "string") {
    return data;
  } else {
    let d = String(data);
    if (!symbols) {
      if (!spaces) {
        d = d.replace(/[^a-zA-Z0-9 ]/g, "");
      } else {
        d = d.replace(/[^a-zA-Z0-9]/g, "");
      }
    } else if (!spaces) {
      d = d.replace(/[^ ]/g, "");
    }
    if (!caseSensitive) {
      d = d.toLowerCase();
    }
    return d;
  }
}

function everyKey(thisData, thisFilter, options) {
  const { deepFilter, exactlyFilter, equalFilter, exactly, equal } =
    options || {};

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
    if (exactly) {
      return convertData(thisData) === convertData(thisFilter);
    } else if (equal) {
      return convertData(thisData) == convertData(thisFilter);
    } else {
      return convertData(thisData).includes(convertData(thisFilter));
    }
  } else if (exactlyFilter) {
    return thisData === thisFilter;
  } else if (equalFilter) {
    return thisData == thisFilter;
  } else {
    return true;
  }
}

/**
 * @param {any} data
 * @param {any} filter
 * @param {Object} options
 * @param {Boolean} options.deepFilter
 * @param {Boolean} options.clone
 * @param {Boolean} options.caseSensitive
 * @param {Boolean} options.symbols
 * @param {Boolean} options.spaces
 * @param {Boolean} options.exactly
 * @param {Boolean} options.equal
 * @param {Boolean} options.includes
 */
function dataFilter(data, filter, options) {
  const { deepFilter, clone } = options || {};

  const clonedData =
    clone || (deepFilter && clone !== false) ? cloneValue(data) : data;

  if (clonedData) {
    const isArray = Array.isArray(clonedData);
    const thisData = isArray ? clonedData : [clonedData];
    const thisFilter = Array.isArray(filter) ? filter : [filter];

    const thisResult = thisData.filter(
      (d) => thisFilter.findIndex((f) => everyKey(d, f, options)) >= 0
    );

    return isArray ? thisResult : thisResult?.[0];
  } else {
    return clonedData;
  }
}

export default dataFilter;
