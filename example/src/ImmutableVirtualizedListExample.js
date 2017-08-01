import Immutable from 'immutable';
import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

// ESLint can't resolve the module location when running on Travis, so ignore these lints.
// eslint-disable-next-line import/no-unresolved, import/extensions
import { ImmutableVirtualizedList } from 'react-native-immutable-list-view';

import style from './styles';

class ImmutableVirtualizedListExample extends Component {

  state = {
    listDataA: Immutable.List(['Simple', 'List', 'of', 'Items']),
    // OR to see EmptyListView:
    // listDataA: Immutable.List(),

    listDataB: Immutable.Range(1, 100),
  };

  changeDataA() {
    this.setState({
      listDataA: this.state.listDataA.set(3, 'This value was changed!'),
    });
  }

  changeDataB() {
    this.setState({
      listDataB: this.state.listDataB.toSeq().map((n) => n * 2),
    });
  }

  renderItem({ item }) {
    return <Text style={style.listRow}>{item}</Text>;
  }

  render() {
    const { listDataA, listDataB } = this.state;

    return (
      <View style={style.container}>
        <Text style={style.title}>
          ImmutableVirtualizedList Example
        </Text>
        <View style={style.sideBySideLists}>
          <View style={style.list}>
            <View style={style.button}>
              <Button
                onPress={() => this.changeDataA()}
                title="Update Data"
              />
            </View>
            <ImmutableVirtualizedList
              immutableData={listDataA}
              renderItem={this.renderItem}
              keyExtractor={(_, index) => String(index)}
            />
          </View>
          <View style={style.list}>
            <View style={style.button}>
              <Button
                onPress={() => this.changeDataB()}
                title="Update Data"
              />
            </View>
            <ImmutableVirtualizedList
              immutableData={listDataB}
              renderItem={this.renderItem}
              keyExtractor={(_, index) => String(index)}
            />
          </View>
        </View>
      </View>
    );
  }

}

export default ImmutableVirtualizedListExample;
