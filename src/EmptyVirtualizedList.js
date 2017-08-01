import Immutable from 'immutable';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Text, VirtualizedList } from 'react-native';

import ImmutableVirtualizedList from './ImmutableVirtualizedList';

import styles from './styles';

/**
 * A VirtualizedList that displays a single item showing that there is nothing to display.
 * Useful e.g. for preserving the ability to pull-refresh an empty list.
 */
class EmptyVirtualizedList extends PureComponent {

  static propTypes = {
    // Pass through any props that VirtualizedList would normally take.
    ...VirtualizedList.propTypes,

    // Make this prop optional instead of required.
    renderItem: PropTypes.func,

    emptyText: PropTypes.string,
  };

  static defaultProps = {
    ...VirtualizedList.defaultProps,

    keyExtractor: (_, index) => String(index),

    emptyText: 'No data.',
  };

  state = {
    // Contains exactly one item.
    listData: Immutable.List([1]),
  };

  /**
   * Returns a simple text element showing the `emptyText` string.
   * This method can be overridden by passing in your own `renderItem` prop instead.
   */
  renderItem() {
    const { emptyText } = this.props;

    return (
      <Text style={styles.emptyText}>
        {emptyText}
      </Text>
    );
  }

  render() {
    const { listData } = this.state;
    const { renderEmpty, renderEmptyInList, ...passThroughProps } = this.props;

    return (
      <ImmutableVirtualizedList
        key="empty_list"
        renderItem={() => this.renderItem()}
        {...passThroughProps}
        immutableData={listData}
      />
    );
  }

}

export default EmptyVirtualizedList;
