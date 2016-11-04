import React, { Component } from 'react';
import { Text, View } from 'react-native';

// eslint-disable-next-line
import ImmutableListView from 'react-native-immutable-list-view/src/ImmutableListView';

import style from './styles';
import listData from './listData';

class App extends Component {

  renderRow(rowData) {
    return <Text style={style.row}>{rowData}</Text>;
  }

  renderSectionHeader(sectionData, category) {
    return <Text style={style.header}>{category}</Text>;
  }

  render() {
    return (
      <View style={style.container}>
        <Text style={style.welcome}>
          Welcome to React Native!
        </Text>
        <ImmutableListView
          immutableData={listData}
          renderRow={this.renderRow}
          renderSectionHeader={this.renderSectionHeader}
        />
      </View>
    );
  }

}

export default App;
