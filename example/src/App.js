import React, { Component } from 'react';
import { Text, View, ListView } from 'react-native';

import style from './styles';
import listData from './listData';

class App extends Component {

  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    const mutableData = listData.toJS();

    this.state = {
      dataSource: dataSource.cloneWithRowsAndSections(mutableData),
    };
  }

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
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderSectionHeader={this.renderSectionHeader}
        />
      </View>
    );
  }

}

export default App;
