import Immutable from 'immutable';

const isImmutableIterable = Immutable.Iterable.isIterable;

const utils = {

  isImmutableIterable,

  /**
   * Return the keys from a set of data.
   *
   * @example
   * - getKeys({ foo: 'bar', baz: 'qux' }) will return [foo, baz].
   * - getKeys([2, 3, 5]) will return [0, 1, 2].
   *
   * @param {Immutable.Iterable} immutableData
   * @returns {Array} An array of keys for the data.
   */
  getKeys(immutableData) {
    if (__DEV__ && !isImmutableIterable(immutableData)) {
      console.warn(`Can't get keys: Data is not Immutable: ${JSON.stringify(immutableData)}`);
    }

    return immutableData.keySeq().toArray();
  },

  /**
   * Return a 2D array of row keys.
   *
   * @example
   * - getRowIdentities({ section1: ['row1', 'row2'], section2: ['row1'] })
   *   will return [[0, 1], [0]].
   *
   * @param {Immutable.Iterable} immutableSectionData
   * @returns {Array}
   */
  getRowIdentities(immutableSectionData) {
    if (__DEV__ && !isImmutableIterable(immutableSectionData)) {
      console.warn(`Can't get row identities: Data is not Immutable: ${JSON.stringify(immutableSectionData)}`);
    }

    const sectionRowKeys = immutableSectionData.map(this.getKeys);
    return sectionRowKeys.valueSeq().toArray();
  },

  /**
   * @param {String|Number} key
   * @param {Immutable.Iterable|Object|Array} data
   * @returns {*} The value at the given key, whether the data is Immutable or not.
   */
  getValueFromKey(key, data) {
    return (typeof data.get === 'function') ? data.get(key) : data[key];
  },

};

export default utils;
