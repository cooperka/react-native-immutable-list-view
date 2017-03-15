import Immutable from 'immutable';
import React, { PureComponent, PropTypes } from 'react';
import { View, Text, ListView, StyleSheet } from 'react-native';

import ImmutableListView from './ImmutableListView';

const styles = StyleSheet.create({
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    margin: 12,
    fontSize: 14,
  },
});

/**
 * A ListView that displays a single item showing that there is nothing to display.
 * Useful e.g. for preserving the ability to pull-refresh an empty list.
 */
class EmptyListView extends PureComponent {

  static propTypes = {
    // Pass through any props that ListView would normally take.
    ...ListView.propTypes,

    emptyText: PropTypes.string,
  };

  static defaultProps = {
    ...ListView.defaultProps,

    emptyText: 'No data.',
  };

  state = {
    // Contains exactly one item.
    listData: Immutable.List(['']),
  };

  /**
   * Returns a simple text element showing the `emptyText` string.
   * This method can be overridden by passing in your own `renderRow` prop instead.
   */
  renderRow() {
    const { emptyText } = this.props;

    return (
      <View style={styles.centerContent}>
        <Text style={styles.emptyText}>
          {emptyText}
        </Text>
      </View>
    );
  }

  render() {
    const { listData } = this.state;

    return (
      <ImmutableListView
        immutableData={listData}
        renderRow={() => this.renderRow()}
        {...this.props}
      />
    );
  }

}

export default EmptyListView;
