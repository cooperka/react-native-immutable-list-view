import Immutable from 'immutable';
import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

// ESLint can't resolve the module location when running on Travis, so ignore these lints.
// eslint-disable-next-line import/no-unresolved, import/extensions
import { ImmutableListView } from 'react-native-immutable-list-view';

import style from './styles';
import mockData from './mockData';

class ImmutableListViewExample extends Component {

  state = {
    listDataA: mockData,
    listDataB: Immutable.Range(1, 100),
  };

  changeDataA() {
    this.setState({
      listDataA: mockData.setIn(['Section A', 1], 'This value was changed!'),
    });
  }

  changeDataB() {
    this.setState({
      listDataB: this.state.listDataB.toSeq().map((n) => n * 2),
    });
  }

  renderRow(rowData) {
    return <Text style={style.listRow}>{rowData}</Text>;
  }

  renderSectionHeader(sectionData, category) {
    return (
      <View>
        <Text style={style.listHeader}>{category}</Text>
      </View>
    );
  }

  render() {
    const { listDataA, listDataB } = this.state;

    return (
      <View style={style.container}>
        <Text style={style.title}>
          ImmutableListView Example
        </Text>
        <View style={style.sideBySideLists}>
          <View style={style.list}>
            <View style={style.button}>
              <Button
                onPress={() => this.changeDataA()}
                title="Update Data"
              />
            </View>
            <ImmutableListView
              immutableData={listDataA}
              renderRow={this.renderRow}
              renderSectionHeader={this.renderSectionHeader}
            />
          </View>
          <View style={style.list}>
            <View style={style.button}>
              <Button
                onPress={() => this.changeDataB()}
                title="Update Data"
              />
            </View>
            <ImmutableListView
              immutableData={listDataB}
              renderRow={this.renderRow}
            />
          </View>
        </View>
      </View>
    );
  }

}

export default ImmutableListViewExample;
