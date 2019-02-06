import Immutable from 'immutable';

import { data } from '../test-utils';

import utils from '../utils';

const EMPTY_MAP = Immutable.fromJS({ foo: [], bar: {}, baz: null });

describe('Utils', () => {
  Object.keys(data).forEach((dataType) => {
    const shouldBeEmpty = data[dataType] === data.EMPTY_DATA;

    it(`determines that ${dataType} ${shouldBeEmpty ? 'is' : 'is NOT'} empty`, () => {
      const isEmpty = utils.isEmptyListView(data[dataType]);
      expect(isEmpty).toBe(shouldBeEmpty);
    });
  });

  it('determines that a Map with empty sections is empty', () => {
    const isEmpty = utils.isEmptyListView(EMPTY_MAP);
    expect(isEmpty).toBe(true);
  });

  it('determines that a Map with empty sections is NOT empty with enableEmptySections', () => {
    const isEmpty = utils.isEmptyListView(EMPTY_MAP, true);
    expect(isEmpty).toBe(false);
  });

  it('determines that empty data is still empty with enableEmptySections', () => {
    const isEmpty = utils.isEmptyListView(data.EMPTY_DATA, true);
    expect(isEmpty).toBe(true);
  });

  describe('getStickyHeaderIndices', () => {
    it('returns an array of the correct size', () => {
      expect(
        utils.getStickyHeaderIndices(data.MAP_DATA_MAP_ROWS).length,
      ).toBe(data.MAP_DATA_MAP_ROWS.size);
    });

    it('returns an array of header indices', () => {
      expect(
        utils.getStickyHeaderIndices(data.MAP_DATA_MAP_ROWS),
      ).toEqual([0, 3]);

      expect(
        utils.getStickyHeaderIndices(data.MAP_DATA_LIST_ROWS),
      ).toEqual([0, 4, 6, 7]);
    });
  });
});
