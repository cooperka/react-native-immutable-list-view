import React, { Component } from 'react';
import { Text, View } from 'react-native';

// eslint-disable-next-line import/no-unresolved, import/extensions
import ImmutableListView from 'react-native-immutable-list-view/src/ImmutableListView';

import style from './styles';
import mockData, { sameData, differentSections, differentRows } from './listData';

class App extends Component {

  state = {
    listData: mockData,
  };

  componentDidMount() {
    const delay = 1000;

    setTimeout(() => {
      console.log('--- Setting sameData');
      this.setState({ listData: sameData });
    }, 1 * delay);

    setTimeout(() => {
      console.log('--- Setting differentSections');
      this.setState({ listData: differentSections });
    }, 2 * delay);

    setTimeout(() => {
      console.log('--- Setting sameData');
      this.setState({ listData: sameData });
    }, 3 * delay);

    setTimeout(() => {
      console.log('--- Setting differentRows');
      this.setState({ listData: differentRows });
    }, 4 * delay);
  }

  renderRow(rowData) {
    console.log('> renderRow\t\t', rowData);
    return <Text style={style.row}>{JSON.stringify(rowData)}</Text>;
  }

  renderSectionHeader(sectionData, category) {
    console.log('> renderHeader\t', category);
    return <Text style={style.header}>{category}</Text>;
  }

  render() {
    const { listData } = this.state;

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
