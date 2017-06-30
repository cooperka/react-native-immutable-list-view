import Immutable from 'immutable';

import { data } from './testUtils';

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
});
