import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import ImmutableListView from 'react-native-immutable-list-view';

import style from './styles';
import mockData from './mockData';

class App extends Component {

  state = {
    listData: mockData,
  };

  changeData() {
    this.setState({
      listData: mockData.setIn(['Section A', 1], 'This value was changed!'),
    });
  }

  renderRow(rowData) {
    return <Text style={style.row}>{JSON.stringify(rowData)}</Text>;
  }

  renderSectionHeader(sectionData, category) {
    return <Text style={style.header}>{category}</Text>;
  }

  render() {
    return (
      <View style={style.container}>
        <Text style={style.welcome}>
          ImmutableListView Example
        </Text>
        <View style={style.button}>
          <Button
            onPress={() => this.changeData()}
            title="Update Data"
          />
        </View>
        <ImmutableListView
          immutableData={this.state.listData}
          renderRow={this.renderRow}
          renderSectionHeader={this.renderSectionHeader}
        />
      </View>
    );
  }

}

export default App;
