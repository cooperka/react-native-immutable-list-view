import { data, expectors } from './testUtils';

describe('ImmutableListView vs. ListView', () => {
  it('renders the same as ListView with empty data', () => {
    expectors.expectToMatchListViewWithData(data.EMPTY_DATA);
  });

  it('renders the same as ListView with basic List', () => {
    expectors.expectToMatchListViewWithData(data.LIST_DATA);
  });

  it('renders the same as ListView with nested List', () => {
    expectors.expectToMatchListViewWithData(data.LIST_DATA_NESTED);
  });

  it('renders the same as ListView with Map: List rows, without section headers', () => {
    expectors.expectToMatchListViewWithData(data.MAP_DATA_LIST_ROWS);
  });

  // This is currently NOT the same. This behavior is documented in the README.
  // To see what actually renders, look at the snapshot file.
  it.skip('renders the same as ListView with Map: List rows, WITH section headers', () => {
    expectors.expectToMatchListViewWithData(data.MAP_DATA_LIST_ROWS, true);
  });

  it('renders the same as ListView with Map: Map rows, without section headers', () => {
    expectors.expectToMatchListViewWithData(data.MAP_DATA_MAP_ROWS);
  });

  // This is currently NOT the same. This behavior is documented in the README.
  // To see what actually renders, look at the snapshot file.
  it.skip('renders the same as ListView with Map: Map rows, WITH section headers', () => {
    expectors.expectToMatchListViewWithData(data.MAP_DATA_MAP_ROWS, true);
  });

  it('renders the same as ListView with basic Set', () => {
    expectors.expectToMatchListViewWithData(data.SET_DATA);
  });
});
