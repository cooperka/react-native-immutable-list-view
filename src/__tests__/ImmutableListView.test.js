/* eslint-disable import/no-extraneous-dependencies */

import _keys from 'lodash/keys';
import Immutable from 'immutable';
import React from 'react';
import { Text, InteractionManager } from 'react-native';
import renderer from 'react-test-renderer';

import ImmutableListView from '../ImmutableListView';

const EMPTY_DATA = Immutable.List();
const LIST_DATA = Immutable.List(['l', 'i', 's', 't']);
const MAP_DATA = Immutable.Map({ 1: 'm', 2: 'a', 3: 'p' });
const MAP_DATA_COMPLEX = Immutable.Map({ first: ['m', 'a', 'p'], second: ['foo'], third: [], fourth: ['bar'] });

/**
 * @param {*} rowData
 */
function renderRow(rowData) {
  return <Text>{JSON.stringify(rowData)}</Text>;
}

/**
 * @param {Object} sectionData
 * @param {String} category
 */
function renderSectionHeader(sectionData, category) {
  return <Text header>{`${category} (${_keys(sectionData).length} items)`}</Text>;
}

describe('ImmutableListView', () => {
  it('renders with empty data', () => {
    const tree = renderer.create(
      <ImmutableListView
        immutableData={EMPTY_DATA}
        renderRow={renderRow}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders basic List', () => {
    const tree = renderer.create(
      <ImmutableListView
        immutableData={LIST_DATA}
        renderRow={renderRow}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders basic Map', () => {
    const tree = renderer.create(
      <ImmutableListView
        immutableData={MAP_DATA}
        renderRow={renderRow}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders basic Map with section headers', () => {
    const tree = renderer.create(
      <ImmutableListView
        immutableData={MAP_DATA}
        renderRow={renderRow}
        renderSectionHeader={renderSectionHeader}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders more complex Map with section headers', () => {
    const tree = renderer.create(
      <ImmutableListView
        immutableData={MAP_DATA_COMPLEX}
        renderRow={renderRow}
        renderSectionHeader={renderSectionHeader}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('ImmutableListView with delayed rendering', () => {
  it('renders basic List during interactions', () => {
    // Mock this method to make sure it's not run.
    InteractionManager.runAfterInteractions = () => {};

    const tree = renderer.create(
      <ImmutableListView
        immutableData={LIST_DATA}
        rowsDuringInteraction={1}
        renderRow={renderRow}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders basic List after interactions', () => {
    // Mock this method to make sure it runs immediately.
    InteractionManager.runAfterInteractions = (callback) => callback();

    const tree = renderer.create(
      <ImmutableListView
        immutableData={LIST_DATA}
        rowsDuringInteraction={1}
        renderRow={renderRow}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
