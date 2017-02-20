import Immutable from 'immutable';
import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

// ESLint can't resolve the module location when running on Travis, so ignore these lints.
// eslint-disable-next-line import/no-unresolved, import/extensions
import ImmutableVirtualizedList from 'react-native-immutable-list-view/lib/Experimental/ImmutableVirtualizedList';

import style from './styles';

class ImmutableVirtualizedListExample extends Component {

  state = {
    listDataA: Immutable.List(['Simple', 'List', 'of', 'Items']),
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

  renderItemComponent({ item }) {
    return <Text style={style.listRow}>{item}</Text>;
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
            <ImmutableVirtualizedList
              immutableData={listDataA}
              ItemComponent={this.renderItemComponent}
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
              ItemComponent={this.renderItemComponent}
            />
          </View>
        </View>
      </View>
    );
  }

}

export default ImmutableVirtualizedListExample;
