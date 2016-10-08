import Immutable from 'immutable';
import React, { Component, PropTypes } from 'react';
import { ListView } from 'react-native';

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
  };

  componentWillMount() {
    this.setDataFromProps(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.setDataFromProps(newProps);
  }

  setDataFromProps(props) {
    const { dataSource } = this.state;
    const { immutableData: data, renderSectionHeader } = props;

    const hasSectionHeaders = !!renderSectionHeader;

    this.setState({
      dataSource: (hasSectionHeaders
        ? dataSource.cloneWithRowsAndSections(data, getIdentities(data), getRowIdentities(data))
        : dataSource.cloneWithRows(data, getIdentities(data))
      ),
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
