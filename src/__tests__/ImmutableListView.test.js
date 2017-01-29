import React from 'react';
import { InteractionManager } from 'react-native';
import renderer from 'react-test-renderer';

import ImmutableListView from '../ImmutableListView';

import { data, renderers, expectors } from './testUtils';

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
});

describe('ImmutableListView with delayed rendering', () => {
  it('renders basic List during interactions', () => {
    // Mock this method to make sure it's not run.
    InteractionManager.runAfterInteractions = () => {};

    const tree = renderer.create(
      <ImmutableListView
        immutableData={data.LIST_DATA}
        rowsDuringInteraction={1}
        renderRow={renderers.renderRow}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders basic List after interactions', () => {
    // Mock this method to make sure it runs immediately.
    InteractionManager.runAfterInteractions = (callback) => callback();

    const tree = renderer.create(
      <ImmutableListView
        immutableData={data.LIST_DATA}
        rowsDuringInteraction={1}
        renderRow={renderers.renderRow}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
