import Immutable from 'immutable';
import React, { PureComponent, PropTypes } from 'react';
import { ListView, InteractionManager } from 'react-native';

const isImmutableIterable = Immutable.Iterable.isIterable;

/**
 * Return the keys from a set of data.
 *
 * @example
 * - getKeys({ foo: 'bar', baz: 'qux' }) will return [foo, baz].
 * - getKeys([2, 3, 5]) will return [0, 1, 2].
 *
 * @param {Immutable.Iterable} immutableData
 * @returns {Array} An array of keys for the data.
 */
function getKeys(immutableData) {
  if (__DEV__ && !isImmutableIterable(immutableData)) {
    console.warn(`Can't get keys: Data is not Immutable: ${JSON.stringify(immutableData)}`);
  }

  return immutableData.keySeq().toArray();
}

/**
 * Return a 2D array of row keys.
 *
 * @example
 * - getRowIdentities({ section1: ['row1', 'row2'], section2: ['row1'] })
 *   will return [[0, 1], [0]].
 *
 * @param {Immutable.Iterable} immutableSectionData
 * @returns {Array}
 */
function getRowIdentities(immutableSectionData) {
  if (__DEV__ && !isImmutableIterable(immutableSectionData)) {
    console.warn(`Can't get row identities: Data is not Immutable: ${JSON.stringify(immutableSectionData)}`);
  }

  const sectionRowKeys = immutableSectionData.map(getKeys);
  return sectionRowKeys.valueSeq().toArray();
}

/**
 * @param {String|Number} key
 * @param {Immutable.Iterable|Object|Array} data
 * @returns {*} The value at the given key, whether the data is Immutable or not.
 */
function getValueFromKey(key, data) {
  return (typeof data.get === 'function') ? data.get(key) : data[key];
}

/**
 * A ListView capable of displaying {@link https://facebook.github.io/immutable-js/ Immutable} data
 * out of the box.
 */
class ImmutableListView extends PureComponent {

  static propTypes = {
    // Pass through any props that ListView would normally take.
    ...ListView.propTypes,

    // ImmutableListView handles creating the dataSource, so don't pass it in.
    dataSource: PropTypes.oneOf([undefined]),

    // TODO: Allow any type of arbitrary data.
    // eslint-disable-next-line consistent-return
    immutableData: (props, propName, componentName) => {
      // Note: It's not enough to simply validate PropTypes.instanceOf(Immutable.Iterable),
      // because different imports of Immutable.js across files have different class prototypes.
      if (!isImmutableIterable(props[propName])) {
        return new Error(`Invalid prop ${propName} supplied to ${componentName}: Must be Immutable.Iterable.`);
      }
    },

    sectionHeaderHasChanged: PropTypes.func,

    /**
     * How many rows of data to display while waiting for interactions to finish (e.g. Navigation animations).
     * You can use this to improve the animation performance of longer lists when pushing new routes.
     *
     * @see https://facebook.github.io/react-native/docs/performance.html#slow-navigator-transitions
     */
    rowsDuringInteraction: PropTypes.number,
  };

  static defaultProps = {
    ...ListView.getDefaultProps(),

    // The data contained in the section generally doesn't affect the header text, so return false.
    // eslint-disable-next-line no-unused-vars
    sectionHeaderHasChanged: (prevSectionData, nextSectionData) => false,
  };

  state = {
    dataSource: new ListView.DataSource({
      rowHasChanged: (prevRowData, nextRowData) => !Immutable.is(prevRowData, nextRowData),

      getRowData: (dataBlob, sectionID, rowID) => {
        const rowData = getValueFromKey(sectionID, dataBlob);
        return getValueFromKey(rowID, rowData);
      },

      sectionHeaderHasChanged: this.props.sectionHeaderHasChanged,

      getSectionHeaderData: (dataBlob, sectionID) => getValueFromKey(sectionID, dataBlob),
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
    // In some cases the component will have been unmounted as we receive new props, causing a warning.
    if (!this.canSetState) return;

    const { dataSource, interactionOngoing } = this.state;
    const { immutableData, rowsDuringInteraction, renderSectionHeader } = props;

    const shouldDisplayPartialData = rowsDuringInteraction >= 0 && interactionOngoing && !interactionHasJustFinished;

    const displayData = (shouldDisplayPartialData
      ? immutableData.slice(0, rowsDuringInteraction)
      : immutableData);

    this.setState({
      dataSource: (renderSectionHeader
        ? dataSource.cloneWithRowsAndSections(displayData, getKeys(displayData), getRowIdentities(displayData))
        : dataSource.cloneWithRows(displayData, getKeys(displayData))
      ),
      interactionOngoing: interactionHasJustFinished ? false : interactionOngoing,
    });
  }

  render() {
    const { dataSource } = this.state;

    // Note: enableEmptySections is being used to mimic the default behavior of the upcoming version.
    return (
      <ListView
        dataSource={dataSource}
        enableEmptySections
        {...this.props}
      />
    );
  }

}

export default ImmutableListView;
