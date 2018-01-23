import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Text, VirtualizedList } from 'react-native';

import styles from '../styles';
import utils from '../utils';

import { EmptyVirtualizedList } from './EmptyVirtualizedList';

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
      if (!utils.isImmutableIterable(props[propName])) {
        return new Error(`Invalid prop ${propName} supplied to ${componentName}: Must be instance of Immutable.Iterable.`);
      }
    },

    /**
     * Whether to treat immutableData as a sectioned list,
     * applying section headers.
     */
    treatAsSections: PropTypes.bool,

    /**
     * A function that returns some {@link PropTypes.element}
     * to be rendered as a section header. It will be passed a List
     * or Map of the section's items, and the section key.
     */
    renderSectionHeader: PropTypes.func,

    /**
     * A function that returns some {@link PropTypes.element}
     * to be rendered as a section row. It will be passed the item,
     * and the item's key.
     */
    renderRow: PropTypes.func,

    /**
     * A plain string, or a function that returns some {@link PropTypes.element}
     * to be rendered in place of a `VirtualizedList` when there are no items in the list.
     *
     * Things like pull-refresh functionality will be lost unless explicitly supported by your custom component.
     * Consider `renderEmptyInList` instead if you want this.
     *
     * It will be passed all the original props of the ImmutableVirtualizedList.
     */
    renderEmpty: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

    /**
     * A plain string, or a function that returns some {@link PropTypes.element}
     * to be rendered inside of an `EmptyVirtualizedList` when there are no items in the list.
     *
     * This allows pull-refresh functionality to be preserved.
     *
     * It will be passed all the original props of the ImmutableVirtualizedList.
     */
    renderEmptyInList: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  };

  static defaultProps = {
    ...VirtualizedList.defaultProps,
    treatAsSections: false,
    renderEmptyInList: 'No data.',
  };

  state = {
    flattenedData: this.props.treatAsSections
      ? utils.flattenMap(this.props.immutableData)
      : null,
  }

  componentDidUpdate(prevProps) {
    const { treatAsSections, immutableData } = this.props;
    if (treatAsSections && prevProps.immutableData !== immutableData) {
      const flattenedData = utils.flattenMap(immutableData);
      this.setState({
        flattenedData,
        stickyHeaderIndices: utils.getStickyHeaderIndices(flattenedData),
      });
    }
  }

  getVirtualizedList() {
    return this.virtualizedListRef;
  }

  keyExtractor = (item, index) => (
    this.props.treatAsSections
      ? this.state.flattenedData
        .keySeq()
        .skip(index)
        .first()
      : String(index)
  )

  scrollToEnd = (...args) =>
    this.virtualizedListRef && this.virtualizedListRef.scrollToEnd(...args);

  scrollToIndex = (...args) =>
    this.virtualizedListRef && this.virtualizedListRef.scrollToIndex(...args);

  scrollToItem = (...args) =>
    this.virtualizedListRef && this.virtualizedListRef.scrollToItem(...args);

  scrollToOffset = (...args) =>
    this.virtualizedListRef && this.virtualizedListRef.scrollToOffset(...args);

  recordInteraction = (...args) =>
    this.virtualizedListRef && this.virtualizedListRef.recordInteraction(...args);

  renderItem = (info) => (
    this.props.treatAsSections
      ? utils.isSectionHeader(info.item)
        ? this.renderSectionHeader(
          info.item,
          this.keyExtractor(info.item, info.index),
        )
        : this.renderRow(
          info.item,
          this.keyExtractor(info.item, info.index),
        )
      : this.props.renderItem(info)
  )

  renderEmpty() {
    const {
      immutableData, renderEmpty, renderEmptyInList, contentContainerStyle,
    } = this.props;

    const shouldTryToRenderEmpty = renderEmpty || renderEmptyInList;
    if (shouldTryToRenderEmpty && utils.isEmptyListView(immutableData)) {
      if (renderEmpty) {
        if (typeof renderEmpty === 'string') {
          return <Text style={[styles.emptyText, contentContainerStyle]}>{renderEmpty}</Text>;
        }
        return renderEmpty(this.props);
      }
      if (renderEmptyInList) {
        if (typeof renderEmptyInList === 'string') {
          const { renderItem, ...passThroughProps } = this.props;
          return <EmptyVirtualizedList {...passThroughProps} emptyText={renderEmptyInList} />;
        }
        return <EmptyVirtualizedList {...this.props} renderItem={() => renderEmptyInList(this.props)} />;
      }
    }

    return null;
  }

  render() {
    const {
      immutableData,
      treatAsSections,
      renderEmpty,
      renderEmptyInList,
      ...passThroughProps
    } = this.props;

    const { flattenedData, stickyHeaderIndices } = this.state;

    return this.renderEmpty() || (
      <VirtualizedList
        ref={(component) => { this.virtualizedListRef = component; }}
        data={treatAsSections ? flattenedData : immutableData}
        getItem={(items, index) => (
          treatAsSections
            ? items.skip(index).first()
            : utils.getValueFromKey(index, items)
        )}
        getItemCount={(items) => (items.size || 0)}
        keyExtractor={this.keyExtractor}
        stickyHeaderIndices={treatAsSections ? stickyHeaderIndices : null}
        renderItem={this.renderItem}
        {...passThroughProps}
      />
    );
  }

}

export default ImmutableVirtualizedList;
