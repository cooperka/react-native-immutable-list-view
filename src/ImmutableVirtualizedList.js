import Immutable from 'immutable';
import React, { PureComponent } from 'react';

// This file and its related dependencies needs to be downloaded into your app's `node_modules`.
// See the README for instructions.
//
// eslint-disable-next-line import/no-unresolved, import/extensions
import VirtualizedList from 'react-native/Libraries/CustomComponents/Lists/VirtualizedList';

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
  };

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
    const { immutableData } = this.props;

    return (
      <VirtualizedList
        ref={(virtualizedList) => { this.virtualizedListRef = virtualizedList; }}
        data={immutableData}
        getItem={(items, index) => utils.getValueFromKey(index, items)}
        getItemCount={(items) => (items.size || items.length || 0)}
        keyExtractor={(item, index) => String(index)}
        {...this.props}
      />
    );
  }

}

export default ImmutableVirtualizedList;
