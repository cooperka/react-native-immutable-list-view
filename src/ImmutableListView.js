import Immutable from 'immutable';
import React, { Component, PropTypes } from 'react';
import { ListView, InteractionManager } from 'react-native';

const getIdentities = (immutableData) => {
  return immutableData.keySeq().toArray();
};

const getRowIdentities = (immutableSectionData) => {
  const sectionKeys = immutableSectionData.map((section) => {
    return Object.keys(section);
  });
  return sectionKeys.valueSeq().toArray();
};

// TODO: Accept all types of Immutable data.
const getValueFromKey = (key, data) => {
  return (Immutable.List.isList(data) || Immutable.Map.isMap(data)) ? data.get(key) : data[key];
};

/**
 * A ListView capable of displaying {@link https://facebook.github.io/immutable-js/ Immutable} data.
 */
class ImmutableListView extends Component {

  static propTypes = {
    // Pass through any props that ListView would normally take.
    ...ListView.propTypes,

    // ImmutableListView handles creating the dataSource, so don't pass it in.
    dataSource: PropTypes.oneOf([undefined]),

    // TODO: Accept all types of Immutable data.
    immutableData: PropTypes.oneOfType([
      PropTypes.instanceOf(Immutable.List),
      PropTypes.instanceOf(Immutable.Map),
    ]).isRequired,

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

    const hasSectionHeaders = !!renderSectionHeader;

    this.setState({
      dataSource: (hasSectionHeaders
        ? dataSource.cloneWithRowsAndSections(displayData, getIdentities(displayData), getRowIdentities(displayData))
        : dataSource.cloneWithRows(displayData, getIdentities(displayData))
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
