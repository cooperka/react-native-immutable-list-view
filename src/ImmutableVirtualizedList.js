import Immutable from 'immutable';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Text, VirtualizedList } from 'react-native';

import utils from './utils';

/**
 * A VirtualizedList capable of displaying {@link https://facebook.github.io/immutable-js/ Immutable} data
 * out of the box.
 */
// eslint-disable-next-line react/prefer-stateless-function
class ImmutableVirtualizedList extends PureComponent {

  static propTypes = {
    // Pass through any props that VirtualizedList would normally take.
    ...VirtualizedList.propTypes,

    /**
     * The immutable data to be rendered in a VirtualizedList.
     */
    // eslint-disable-next-line consistent-return
    immutableData: (props, propName, componentName) => {
      // Note: It's not enough to simply validate PropTypes.instanceOf(Immutable.Iterable),
      // because different imports of Immutable.js across files have different class prototypes.
      // TODO: Add support for Immutable.Map, etc.
      if (Immutable.Map.isMap(props[propName])) {
        return new Error(`Invalid prop ${propName} supplied to ${componentName}: Support for Immutable.Map is coming soon. For now, try an Immutable List, Set, or Range.`);
      } else if (!utils.isImmutableIterable(props[propName])) {
        return new Error(`Invalid prop ${propName} supplied to ${componentName}: Must be instance of Immutable.Iterable.`);
      }
    },

    /**
     * A plain string, or a function that returns some {@link PropTypes.element}
     * to be rendered when there are no items in the list.
     *
     * It will be passed all the original props of the ImmutableListView.
     */
    renderEmpty: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  };

  static defaultProps = {
    ...VirtualizedList.defaultProps,

    renderEmpty: 'No data.',
  };

  getVirtualizedList() {
    return this.virtualizedListRef;
  }

  scrollToEnd(...args) {
    return this.virtualizedListRef && this.virtualizedListRef.scrollToEnd(...args);
  }

  scrollToIndex(...args) {
    return this.virtualizedListRef && this.virtualizedListRef.scrollToIndex(...args);
  }

  scrollToItem(...args) {
    return this.virtualizedListRef && this.virtualizedListRef.scrollToItem(...args);
  }

  scrollToOffset(...args) {
    return this.virtualizedListRef && this.virtualizedListRef.scrollToOffset(...args);
  }

  recordInteraction(...args) {
    return this.virtualizedListRef && this.virtualizedListRef.recordInteraction(...args);
  }

  render() {
    const { immutableData, renderEmpty, contentContainerStyle } = this.props;

    if (renderEmpty && utils.isEmptyListView(immutableData)) {
      if (typeof renderEmpty === 'string') {
        return <Text style={contentContainerStyle}>{renderEmpty}</Text>;
      }

      return renderEmpty(this.props);
    }

    return (
      <VirtualizedList
        ref={(virtualizedList) => { this.virtualizedListRef = virtualizedList; }}
        data={immutableData}
        getItem={(items, index) => utils.getValueFromKey(index, items)}
        getItemCount={(items) => (items.size || 0)}
        keyExtractor={(item, index) => String(index)}
        {...this.props}
      />
    );
  }

}

export default ImmutableVirtualizedList;
