/* eslint-disable import/no-extraneous-dependencies, global-require */

import React from 'react';
import { ListView } from 'react-native';
import renderer from 'react-test-renderer';

import { data, renderers, mocks } from './testUtils';

describe('ImmutableListView vs. ListView', () => {
  // We don't care about the props for this suite of tests; only the rendered output.
  const ImmutableListView = mocks.getImmutableListViewWithoutProps();

  let dataSource;

  beforeEach(() => {
    dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });
  });

  it('renders the same as ListView with empty data', () => {
    const immutableTree = renderer.create(
      <ImmutableListView
        immutableData={data.EMPTY_DATA}
        renderRow={renderers.renderRow}
      />,
    ).toJSON();

    dataSource = dataSource.cloneWithRows(data.EMPTY_DATA.toJS());
    const regularTree = renderer.create(
      <ListView
        dataSource={dataSource}
        renderRow={renderers.renderRow}
      />,
    ).toJSON();

    expect(immutableTree).toEqual(regularTree);
  });

  it('renders the same as ListView with basic List', () => {
    const immutableTree = renderer.create(
      <ImmutableListView
        immutableData={data.LIST_DATA}
        renderRow={renderers.renderRow}
      />,
    ).toJSON();

    dataSource = dataSource.cloneWithRows(data.LIST_DATA.toJS());
    const regularTree = renderer.create(
      <ListView
        dataSource={dataSource}
        renderRow={renderers.renderRow}
      />,
    ).toJSON();

    expect(immutableTree).toEqual(regularTree);
  });

  it('renders the same as ListView with nested List', () => {
    const immutableTree = renderer.create(
      <ImmutableListView
        immutableData={data.LIST_DATA_NESTED}
        renderRow={renderers.renderRow}
      />,
    ).toJSON();

    dataSource = dataSource.cloneWithRows(data.LIST_DATA_NESTED.toJS());
    const regularTree = renderer.create(
      <ListView
        dataSource={dataSource}
        renderRow={renderers.renderRow}
      />,
    ).toJSON();

    expect(immutableTree).toEqual(regularTree);
  });

  it('renders the same as ListView with Map: List rows, without section headers', () => {
    const immutableTree = renderer.create(
      <ImmutableListView
        immutableData={data.MAP_DATA_LIST_ROWS}
        renderRow={renderers.renderRow}
      />,
    ).toJSON();

    dataSource = dataSource.cloneWithRows(data.MAP_DATA_LIST_ROWS.toJS());
    const regularTree = renderer.create(
      <ListView
        dataSource={dataSource}
        renderRow={renderers.renderRow}
      />,
    ).toJSON();

    expect(immutableTree).toEqual(regularTree);
  });

  it('does NOT render the same as ListView with Map: List rows, WITH section headers', () => {
    const immutableTree = renderer.create(
      <ImmutableListView
        immutableData={data.MAP_DATA_LIST_ROWS}
        renderRow={renderers.renderRow}
        renderSectionHeader={renderers.renderSectionHeader}
      />,
    ).toJSON();

    dataSource = dataSource.cloneWithRows(data.MAP_DATA_LIST_ROWS.toJS());
    const regularTree = renderer.create(
      <ListView
        dataSource={dataSource}
        renderRow={renderers.renderRow}
        renderSectionHeader={renderers.renderSectionHeader}
      />,
    ).toJSON();

    // This just asserts they're not equal. To see what actually renders, look at the snapshot file.
    expect(immutableTree).not.toEqual(regularTree);
  });

  it('renders the same as ListView with Map: Map rows, without section headers', () => {
    const immutableTree = renderer.create(
      <ImmutableListView
        immutableData={data.MAP_DATA_MAP_ROWS}
        renderRow={renderers.renderRow}
      />,
    ).toJSON();

    dataSource = dataSource.cloneWithRows(data.MAP_DATA_MAP_ROWS.toJS());
    const regularTree = renderer.create(
      <ListView
        dataSource={dataSource}
        renderRow={renderers.renderRow}
      />,
    ).toJSON();

    expect(immutableTree).toEqual(regularTree);
  });

  it('does NOT render the same as ListView with Map: Map rows, WITH section headers', () => {
    const immutableTree = renderer.create(
      <ImmutableListView
        immutableData={data.MAP_DATA_MAP_ROWS}
        renderRow={renderers.renderRow}
        renderSectionHeader={renderers.renderSectionHeader}
      />,
    ).toJSON();

    dataSource = dataSource.cloneWithRows(data.MAP_DATA_MAP_ROWS.toJS());
    const regularTree = renderer.create(
      <ListView
        dataSource={dataSource}
        renderRow={renderers.renderRow}
        renderSectionHeader={renderers.renderSectionHeader}
      />,
    ).toJSON();

    expect(immutableTree).not.toEqual(regularTree);
  });

  it('renders the same as ListView with basic Set', () => {
    const immutableTree = renderer.create(
      <ImmutableListView
        immutableData={data.SET_DATA}
        renderRow={renderers.renderRow}
      />,
    ).toJSON();

    dataSource = dataSource.cloneWithRows(data.SET_DATA.toJS());
    const regularTree = renderer.create(
      <ListView
        dataSource={dataSource}
        renderRow={renderers.renderRow}
      />,
    ).toJSON();

    expect(immutableTree).toEqual(regularTree);
  });
});
