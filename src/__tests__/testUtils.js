import Immutable from 'immutable';
import React from 'react';
import { Text, ListView } from 'react-native';
import renderer from 'react-test-renderer';

import ImmutableListView from '../ImmutableListView';
import ImmutableVirtualizedList from '../Experimental/ImmutableVirtualizedList';

/**
 * Some common types of data you may want to render with ImmutableListView.
 * @see https://facebook.github.io/react-native/docs/listviewdatasource.html#constructor
 */
const data = {

  EMPTY_DATA: Immutable.List(),

  LIST_DATA: Immutable.List([
    'lists',
    'are',
    'great',
  ]),

  LIST_DATA_NESTED: Immutable.List([
    [
      'so',
      'are',
    ],
    [
      'nested',
      'lists',
    ],
  ]),

  MAP_DATA_LIST_ROWS: Immutable.fromJS({
    first: [
      'm',
      'a',
      'p',
    ],
    second: [
      'foo',
    ],
    third: [
    ],
    fourth: [
      'bar',
    ],
  }),

  MAP_DATA_MAP_ROWS: Immutable.fromJS({
    first: {
      row1: 'data 1',
      row2: 'data 2',
    },
    second: {},
  }),

  SET_DATA: Immutable.Set([
    'one',
    'two',
    'three',
  ]),

  RANGE_DATA: Immutable.Range(3, 10, 3),

};

const renderers = {

  /**
   * @param {*} rowData
   */
  renderRow(rowData) {
    return <Text>{JSON.stringify(rowData)}</Text>;
  },

  // eslint-disable-next-line react/prop-types
  renderItem({ item }) {
    return <Text>{JSON.stringify(item)}</Text>;
  },

  /**
   * @param {Immutable.Iterable} sectionData
   * @param {String} category
   */
  renderSectionHeader(sectionData, category) {
    return <Text header>{`${category} (${sectionData.size} items)`}</Text>;
  },

};

const mocks = {

  /**
   * Mock ScrollView so that it doesn't contain any props when rendered by ListView.
   * This is useful for comparison between ListView and ImmutableListView.
   *
   * @returns {ImmutableListView}
   */
  getImmutableListViewWithoutProps() {
    jest.resetModules();

    // eslint-disable-next-line react/prop-types
    const mockScrollView = (props) => React.createElement('ScrollView', {}, props.children);
    jest.doMock('ScrollView', () => mockScrollView);

    // eslint-disable-next-line global-require
    return require('../ImmutableListView').default;
  },

};

const expectors = {

  expectToMatchSnapshotWithData(immutableData, shouldRenderSectionHeaders) {
    const renderSectionHeaderProps = shouldRenderSectionHeaders
      ? { renderSectionHeader: renderers.renderSectionHeader }
      : {};

    const tree = renderer.create(
      <ImmutableListView
        immutableData={immutableData}
        renderRow={renderers.renderRow}
        {...renderSectionHeaderProps}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  },

  expectVirtualizedToMatchSnapshotWithData(immutableData) {
    const tree = renderer.create(
      <ImmutableVirtualizedList
        immutableData={immutableData}
        renderItem={renderers.renderItem}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  },

  expectToMatchListViewWithData(immutableData, shouldRenderSectionHeaders) {
    const MockedImmutableListView = mocks.getImmutableListViewWithoutProps();

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    const renderSectionHeaderProps = shouldRenderSectionHeaders
      ? { renderSectionHeader: renderers.renderSectionHeader }
      : {};

    const immutableTree = renderer.create(
      <MockedImmutableListView
        immutableData={immutableData}
        renderRow={renderers.renderRow}
        {...renderSectionHeaderProps}
      />,
    ).toJSON();

    const updatedDataSource = dataSource.cloneWithRows(immutableData.toJS());
    const regularTree = renderer.create(
      <ListView
        dataSource={updatedDataSource}
        renderRow={renderers.renderRow}
        {...renderSectionHeaderProps}
      />,
    ).toJSON();

    expect(immutableTree).toEqual(regularTree);
  },

};

export {
  data,
  renderers,
  mocks,
  expectors,
};
