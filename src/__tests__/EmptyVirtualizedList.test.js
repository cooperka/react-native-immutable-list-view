import React from 'react';
import renderer from 'react-test-renderer';

import { renderers } from './testUtils';

import EmptyVirtualizedList from '../EmptyVirtualizedList';

describe('EmptyVirtualizedList', () => {
  it('renders with default text', () => {
    const tree = renderer.create(
      <EmptyVirtualizedList />,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders with custom text', () => {
    const tree = renderer.create(
      <EmptyVirtualizedList
        emptyText="Nothing. Nothing at all."
      />,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders with custom renderRow', () => {
    const tree = renderer.create(
      <EmptyVirtualizedList
        emptyText="Nothing. Nothing at all."
        renderItem={() => renderers.renderRow('Overridden!')}
      />,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
