import { data, expectors } from './testUtils';

describe('ImmutableListView', () => {
  it('renders with empty data', () => {
    expectors.expectVirtualizedToMatchSnapshotWithData(data.EMPTY_DATA);
  });

  it('renders basic List', () => {
    expectors.expectVirtualizedToMatchSnapshotWithData(data.LIST_DATA);
  });

  it('renders nested List', () => {
    expectors.expectVirtualizedToMatchSnapshotWithData(data.LIST_DATA_NESTED);
  });

  it('renders basic Range', () => {
    expectors.expectVirtualizedToMatchSnapshotWithData(data.RANGE_DATA);
  });
});
