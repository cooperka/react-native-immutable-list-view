import Immutable from 'immutable';
import React, { Component, PropTypes } from 'react';
import { ListView, InteractionManager } from 'react-native';

/**
 * Return the keys from a set of data.
 *
 * @example
 * - getKeys({ foo: 'bar', baz: 'qux' }) will return [foo, baz]
 * - getKeys([2, 3, 5]) will return [0, 1, 2]
 *
 * @param {Immutable.Iterable} immutableData
 * @returns {Array} An array of keys for the data.
 */
function getKeys(immutableData) {
  // TODO: Allow any type of arbitrary data
  return immutableData.keySeq().toArray();
}

/**
 * @param immutableSectionData
 * @returns {Array}
 */
// TODO: Make this getRows instead? Then pass rows into getKeys.
function getRowIdentities(immutableSectionData) {
  // TODO: Allow any type of arbitrary data.
  const sectionKeys = immutableSectionData.map((section) => Object.keys(section));
  return sectionKeys.valueSeq().toArray();
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
 * A ListView capable of displaying {@link https://facebook.github.io/immutable-js/ Immutable} data.
 */
class ImmutableListView extends Component {

  static propTypes = {
    // Pass through any props that ListView would normally take.
    ...ListView.propTypes,

    // ImmutableListView handles creating the dataSource, so don't pass it in.
    dataSource: PropTypes.oneOf([undefined]),

    // TODO: Allow any type of arbitrary data.
    immutableData: PropTypes.instanceOf(Immutable.Iterable).isRequired,

    /**
     * How many rows of data to display while waiting for interactions to finish (e.g. Navigation animations).
     * You can use this to improve the animation performance of longer lists when pushing new routes.
     *
     * @see https://facebook.github.io/react-native/docs/performance.html#slow-navigator-transitions
     */
    rowsDuringInteraction: PropTypes.number,
  };

  static defaultProps = ListView.getDefaultProps();

  state = {
    dataSource: new ListView.DataSource({
      rowHasChanged: (r1, r2) => !Immutable.is(r1, r2),
      getRowData: (dataBlob, sectionID, rowID) => {
        const rowData = getValueFromKey(sectionID, dataBlob);
        return getValueFromKey(rowID, rowData);
      },
      // TODO: This might still return true if just the section data has changed; verify this.
      sectionHeaderHasChanged: (s1, s2) => !Immutable.is(s1, s2),
      getSectionHeaderData: (dataBlob, sectionID) => getValueFromKey(sectionID, dataBlob),
    }),
    interactionOngoing: true,
  };

  componentWillMount() {
    this.setStateFromProps(this.props);

    // If set, wait for animations etc. to complete before rendering the full list of data.
    if (this.props.rowsDuringInteraction >= 0) {
      InteractionManager.runAfterInteractions(() => {
        this.setStateFromProps(this.props, true);
      });
    }
  }

  componentWillReceiveProps(newProps) {
    this.setStateFromProps(newProps);
  }

  setStateFromProps(props, interactionHasFinished = false) {
    const { dataSource, interactionOngoing } = this.state;
    const { immutableData, rowsDuringInteraction, renderSectionHeader } = props;

    const shouldDisplayPartialData = rowsDuringInteraction >= 0 && interactionOngoing && !interactionHasFinished;

    const displayData = (shouldDisplayPartialData
      ? immutableData.slice(0, rowsDuringInteraction)
      : immutableData);

    this.setState({
      dataSource: (renderSectionHeader
        ? dataSource.cloneWithRowsAndSections(displayData, getKeys(displayData), getRowIdentities(displayData))
        : dataSource.cloneWithRows(displayData, getKeys(displayData))
      ),
      interactionOngoing: interactionHasFinished ? false : interactionOngoing,
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
