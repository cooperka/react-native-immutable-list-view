/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { InteractionManager } from 'react-native';
import renderer from 'react-test-renderer';

import ImmutableListView from '../ImmutableListView';

import { data, renderers } from './testUtils';

describe('ImmutableListView', () => {
  it('renders with empty data', () => {
    const tree = renderer.create(
      <ImmutableListView
        immutableData={data.EMPTY_DATA}
        renderRow={renderers.renderRow}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders basic List', () => {
    const tree = renderer.create(
      <ImmutableListView
        immutableData={data.LIST_DATA}
        renderRow={renderers.renderRow}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Map without section headers', () => {
    const tree = renderer.create(
      <ImmutableListView
        immutableData={data.MAP_DATA}
        renderRow={renderers.renderRow}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Map with section headers', () => {
    const tree = renderer.create(
      <ImmutableListView
        immutableData={data.MAP_DATA}
        renderRow={renderers.renderRow}
        renderSectionHeader={renderers.renderSectionHeader}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders basic Set', () => {
    const tree = renderer.create(
      <ImmutableListView
        immutableData={data.SET_DATA}
        renderRow={renderers.renderRow}
      />,
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
