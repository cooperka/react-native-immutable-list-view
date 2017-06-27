import Immutable from 'immutable';
import React, { PureComponent, PropTypes } from 'react';
import { ListView, InteractionManager } from 'react-native';

import utils from './utils';

/**
 * A ListView capable of displaying {@link https://facebook.github.io/immutable-js/ Immutable} data
 * out of the box.
 */
class ImmutableListView extends PureComponent {

  static propTypes = {
    // Pass through any props that ListView would normally take.
    ...ListView.propTypes,

    // ImmutableListView handles creating the dataSource, so don't allow it to be passed in.
    dataSource: PropTypes.oneOf([undefined]),

    /**
     * The immutable data to be rendered in a ListView.
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
     * A function taking (prevSectionData, nextSectionData)
     * and returning true if the section header will change.
     */
    sectionHeaderHasChanged: PropTypes.func,

    /**
     * How many rows of data to display while waiting for interactions to finish (e.g. Navigation animations).
     * You can use this to improve the animation performance of longer lists when pushing new routes.
     *
     * @see https://facebook.github.io/react-native/docs/performance.html#slow-navigator-transitions
     */
    rowsDuringInteraction: PropTypes.number,

    /**
     * A function that returns some {@link PropTypes.element} to be rendered when there are no items in the list.
     */
    renderEmpty: PropTypes.func,
  };

  static defaultProps = {
    ...ListView.defaultProps,

    // The data contained in the section generally doesn't affect the header text, so return false.
    // eslint-disable-next-line no-unused-vars
    sectionHeaderHasChanged: (prevSectionData, nextSectionData) => false,
  };

  state = {
    dataSource: new ListView.DataSource({
      rowHasChanged: (prevRowData, nextRowData) => !Immutable.is(prevRowData, nextRowData),

      getRowData: (dataBlob, sectionID, rowID) => {
        const rowData = utils.getValueFromKey(sectionID, dataBlob);
        return utils.getValueFromKey(rowID, rowData);
      },

      sectionHeaderHasChanged: this.props.sectionHeaderHasChanged,

      getSectionHeaderData: (dataBlob, sectionID) => utils.getValueFromKey(sectionID, dataBlob),
    }),

    interactionOngoing: true,
  };

  componentWillMount() {
    this.canSetState = true;
    this.setStateFromPropsAfterInteraction(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.setStateFromPropsAfterInteraction(newProps);
  }

  componentWillUnmount() {
    this.canSetState = false;
  }

  setStateFromPropsAfterInteraction(props) {
    // Always set state right away before the interaction.
    this.setStateFromProps(props, false);

    // If set, wait for animations etc. to complete before rendering the full list of data.
    if (props.rowsDuringInteraction >= 0) {
      InteractionManager.runAfterInteractions(() => {
        this.setStateFromProps(props, true);
      });
    }
  }

  setStateFromProps(props, interactionHasJustFinished) {
    // In some cases the component will have been unmounted before executing
    // InteractionManager.runAfterInteractions, causing a warning if we try to set state.
    if (!this.canSetState) return;

    const { dataSource, interactionOngoing } = this.state;
    const { immutableData, rowsDuringInteraction, renderSectionHeader } = props;

    const shouldDisplayPartialData = rowsDuringInteraction >= 0 && interactionOngoing && !interactionHasJustFinished;

    const displayData = (shouldDisplayPartialData
      ? immutableData.slice(0, rowsDuringInteraction)
      : immutableData);

    const updatedDataSource = (renderSectionHeader
      ? dataSource.cloneWithRowsAndSections(
          displayData, utils.getKeys(displayData), utils.getRowIdentities(displayData))
      : dataSource.cloneWithRows(
          displayData, utils.getKeys(displayData)));

    this.setState({
      dataSource: updatedDataSource,
      interactionOngoing: interactionHasJustFinished ? false : interactionOngoing,
    });
  }

  getListView() {
    return this.listViewRef;
  }

  getMetrics(...args) {
    return this.listViewRef && this.listViewRef.getMetrics(...args);
  }

  scrollTo(...args) {
    return this.listViewRef && this.listViewRef.scrollTo(...args);
  }

  scrollToEnd(...args) {
    return this.listViewRef && this.listViewRef.scrollToEnd(...args);
  }

  isEmptyList() {
    const { immutableData } = this.props;

    if (!immutableData) {
      return true;
    }

    if (Immutable.List.isList(immutableData)) {
      return immutableData.isEmpty();
    }

    const keys = immutableData.keySeq().toArray();
    let empty = true;

    keys.forEach((key) => {
      if (immutableData.get(key) && !immutableData.get(key).isEmpty()) {
        empty = false;
      }
    });

    return empty;
  }

  render() {
    const { dataSource } = this.state;
    const { renderEmpty } = this.props;

    if (renderEmpty && this.isEmptyList()) {
      return renderEmpty(this.props);
    }

    // Note: enableEmptySections is being used to mimic the default behavior of the upcoming version.
    // Note: removeClippedSubviews is disabled to work around a long-standing bug:
    //   https://github.com/facebook/react-native/issues/1831
    return (
      <ListView
        ref={(listView) => { this.listViewRef = listView; }}
        dataSource={dataSource}
        enableEmptySections
        removeClippedSubviews={false}
        {...this.props}
      />
    );
  }

}

export default ImmutableListView;
