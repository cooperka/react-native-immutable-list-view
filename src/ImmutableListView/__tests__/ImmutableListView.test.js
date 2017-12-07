import React from 'react';
import { InteractionManager } from 'react-native';
import renderer from 'react-test-renderer';

import ImmutableListView from '../ImmutableListView';

import { data, renderers, expectors } from '../../test-utils';

describe('ImmutableListView', () => {
  it('renders with empty data', () => {
    expectors.expectToMatchSnapshotWithData(data.EMPTY_DATA);
  });

  it('renders basic List', () => {
    expectors.expectToMatchSnapshotWithData(data.LIST_DATA);
  });

  it('renders nested List', () => {
    expectors.expectToMatchSnapshotWithData(data.LIST_DATA_NESTED);
  });

  it('renders Map: List rows, without section headers', () => {
    expectors.expectToMatchSnapshotWithData(data.MAP_DATA_LIST_ROWS);
  });

  it('renders Map: List rows, with section headers', () => {
    expectors.expectToMatchSnapshotWithData(data.MAP_DATA_LIST_ROWS, true);
  });

  it('renders Map: Map rows, without section headers', () => {
    expectors.expectToMatchSnapshotWithData(data.MAP_DATA_MAP_ROWS);
  });

  it('renders Map: Map rows, with section headers', () => {
    expectors.expectToMatchSnapshotWithData(data.MAP_DATA_MAP_ROWS, true);
  });

  it('renders basic Set', () => {
    expectors.expectToMatchSnapshotWithData(data.SET_DATA);
  });

  it('renders basic Range', () => {
    expectors.expectToMatchSnapshotWithData(data.RANGE_DATA);
  });
});

describe('ImmutableListView with delayed rendering', () => {
  it('renders basic List during interactions', () => {
    // Mock this method to make sure it's not run.
    InteractionManager.runAfterInteractions = () => {};

    const tree = renderer
      .create(
        <ImmutableListView
          immutableData={data.LIST_DATA}
          rowsDuringInteraction={1}
          renderRow={renderers.renderRow}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders basic List after interactions', () => {
    // Mock this method to make sure it runs immediately.
    InteractionManager.runAfterInteractions = (callback) => callback();

    const tree = renderer
      .create(
        <ImmutableListView
          immutableData={data.LIST_DATA}
          rowsDuringInteraction={1}
          renderRow={renderers.renderRow}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('ImmutableListView with renderEmpty', () => {
  it('renders normally when there are some items', () => {
    const tree = renderer.create(
      <ImmutableListView
        immutableData={data.LIST_DATA}
        renderRow={renderers.renderRow}
        renderEmpty={() => renderers.renderRow('No items')}
      />,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders empty with a function', () => {
    const tree = renderer.create(
      <ImmutableListView
        immutableData={data.EMPTY_DATA}
        renderRow={renderers.renderRow}
        renderEmpty={() => renderers.renderRow('No items')}
      />,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders empty with a string', () => {
    const color = 'red';

    const tree = renderer.create(
      <ImmutableListView
        immutableData={data.EMPTY_DATA}
        renderRow={renderers.renderRow}
        renderEmpty="No items"
        contentContainerStyle={{ color }}
      />,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("doesn't render empty with null", () => {
    const tree = renderer.create(
      <ImmutableListView
        immutableData={data.EMPTY_DATA}
        renderRow={renderers.renderRow}
        renderEmpty={null}
        renderEmptyInList={null}
      />,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe('ImmutableListView with renderEmptyInList', () => {
  it('renders normally when there are some items', () => {
    const tree = renderer.create(
      <ImmutableListView
        immutableData={data.LIST_DATA}
        renderRow={renderers.renderRow}
        renderEmptyInList={() => renderers.renderRow('No items')}
      />,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders empty with a function', () => {
    const tree = renderer.create(
      <ImmutableListView
        immutableData={data.EMPTY_DATA}
        renderRow={renderers.renderRow}
        renderEmptyInList={() => renderers.renderRow('No items')}
      />,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders empty with a string', () => {
    const color = 'red';

    const tree = renderer.create(
      <ImmutableListView
        immutableData={data.EMPTY_DATA}
        renderRow={renderers.renderRow}
        renderEmptyInList="No items"
        contentContainerStyle={{ color }}
      />,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("doesn't render empty with null", () => {
    const tree = renderer.create(
      <ImmutableListView
        immutableData={data.EMPTY_DATA}
        renderRow={renderers.renderRow}
        renderEmpty={null}
        renderEmptyInList={null}
      />,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
