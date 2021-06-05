/**
 * @callback toggleBorderDoc
 * @param {{time: number, color: string}} options
 */

/**
 * @callback showMessageDoc
 * @param {{time: number, message: string}} options
 */

/**
 * @callback toggleAllDoc
 * @param {{time: number, color: string, message: string}} options
 */

/**
 * @typedef validationOptionsDoc
 * @property {any} castValue
 * @property {any} realValue
 * @property {HTMLElement} ref
 */

/**
 * @callback validationDoc
 * @param {validationOptionsDoc} options
 */

/**
 * @typedef {('number'|'string'|'boolean'|'parse'|'tryparse')} castDoc
 */

/**
 * @callback innerRefDoc
 * @param {HTMLElement} ref
 */

/**
 * @callback setterDoc
 * @param {any} value
 */

/**
 * @typedef {Object} customFormElementsPropsDoc
 * @property {validationDoc} validation
 * @property {castDoc} cast
 * @property {innerRefDoc} innerRef
 * @property {setterDoc} setter
 */

/**
 * @callback funcChildrenDoc
 * @param {customFormElementsPropsDoc} props
 */

/**
 * @typedef {(customFormElementsPropsDoc|{children: funcChildrenDoc})} FormElementBasicProps
 */
