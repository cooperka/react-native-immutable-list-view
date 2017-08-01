import Immutable from 'immutable';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Text, ListView } from 'react-native';

import ImmutableListView from './ImmutableListView';

import styles from './styles';

/**
 * A ListView that displays a single item showing that there is nothing to display.
 * Useful e.g. for preserving the ability to pull-refresh an empty list.
 */
class EmptyListView extends PureComponent {

  static propTypes = {
    // Pass through any props that ListView would normally take.
    ...ListView.propTypes,

    // ImmutableListView handles creating the dataSource, so don't allow it to be passed in.
    dataSource: PropTypes.oneOf([undefined]),

    // Make this prop optional instead of required.
    renderRow: PropTypes.func,

    emptyText: PropTypes.string,
  };

  static defaultProps = {
    ...ListView.defaultProps,

    emptyText: 'No data.',
  };

  state = {
    // Contains exactly one item.
    listData: Immutable.List([1]),
  };

  /**
   * Returns a simple text element showing the `emptyText` string.
   * This method can be overridden by passing in your own `renderRow` prop instead.
   */
  renderRow() {
    const { emptyText } = this.props;

    return (
      <Text style={styles.emptyText}>
        {emptyText}
      </Text>
    );
  }

  render() {
    const { listData } = this.state;
    const { renderEmpty, renderEmptyInList, renderSectionHeader, ...passThroughProps } = this.props;

    return (
      <ImmutableListView
        key="empty_list"
        renderRow={() => this.renderRow()}
        {...passThroughProps}
        immutableData={listData}
      />
    );
  }

}

export default EmptyListView;
