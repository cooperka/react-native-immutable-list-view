import React from 'react';
import renderer from 'react-test-renderer';

import { data, renderers, expectors } from '../../test-utils';

import ImmutableVirtualizedList from '../ImmutableVirtualizedList';

describe('ImmutableVirtualizedList', () => {
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

describe('ImmutableVirtualizedList with renderEmpty', () => {
  it('renders normally when there are some items', () => {
    const tree = renderer.create(
      <ImmutableVirtualizedList
        immutableData={data.LIST_DATA}
        renderItem={renderers.renderRow}
        renderEmpty={() => renderers.renderRow('No items')}
      />,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders empty with a function', () => {
    const tree = renderer.create(
      <ImmutableVirtualizedList
        immutableData={data.EMPTY_DATA}
        renderItem={renderers.renderRow}
        renderEmpty={() => renderers.renderRow('No items')}
      />,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders empty with a string', () => {
    const color = 'red';

    const tree = renderer.create(
      <ImmutableVirtualizedList
        immutableData={data.EMPTY_DATA}
        renderItem={renderers.renderRow}
        renderEmpty="No items"
        contentContainerStyle={{ color }}
      />,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('doesn\'t render empty with null', () => {
    const tree = renderer.create(
      <ImmutableVirtualizedList
        immutableData={data.EMPTY_DATA}
        renderItem={renderers.renderRow}
        renderEmpty={null}
        renderEmptyInList={null}
      />,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe('ImmutableVirtualizedList with renderEmptyInList', () => {
  it('renders normally when there are some items', () => {
    const tree = renderer.create(
      <ImmutableVirtualizedList
        immutableData={data.LIST_DATA}
        renderItem={renderers.renderRow}
        renderEmptyInList={() => renderers.renderRow('No items')}
      />,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders empty with a function', () => {
    const tree = renderer.create(
      <ImmutableVirtualizedList
        immutableData={data.EMPTY_DATA}
        renderItem={renderers.renderRow}
        renderEmptyInList={() => renderers.renderRow('No items')}
      />,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders empty with a string', () => {
    const color = 'red';

    const tree = renderer.create(
      <ImmutableVirtualizedList
        immutableData={data.EMPTY_DATA}
        renderItem={renderers.renderRow}
        renderEmptyInList="No items"
        contentContainerStyle={{ color }}
      />,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('doesn\'t render empty with null', () => {
    const tree = renderer.create(
      <ImmutableVirtualizedList
        immutableData={data.EMPTY_DATA}
        renderItem={renderers.renderRow}
        renderEmpty={null}
        renderEmptyInList={null}
      />,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
