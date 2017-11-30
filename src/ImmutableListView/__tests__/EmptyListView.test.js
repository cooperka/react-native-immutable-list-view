import React from 'react';
import renderer from 'react-test-renderer';

import { renderers } from '../../test-utils';

import { EmptyListView } from '../EmptyListView';

describe('EmptyListView', () => {
  it('renders with default text', () => {
    const tree = renderer.create(
      <EmptyListView />,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders with custom text', () => {
    const tree = renderer.create(
      <EmptyListView
        emptyText="Nothing. Nothing at all."
      />,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders with custom renderRow', () => {
    const tree = renderer.create(
      <EmptyListView
        emptyText="Nothing. Nothing at all."
        renderRow={() => renderers.renderRow('Overridden!')}
      />,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
