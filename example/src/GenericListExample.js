import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

import style from './styles';

class GenericListExample extends Component {

  static propTypes = {
    ListComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
    listComponentProps: PropTypes.object.isRequired,
    extraPropsA: PropTypes.object,
    extraPropsB: PropTypes.object,
    initialDataA: PropTypes.object.isRequired,
    initialDataB: PropTypes.object.isRequired,
    dataMutatorA: PropTypes.func.isRequired,
    dataMutatorB: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const { initialDataA, initialDataB } = this.props;

    this.setState({
      listDataA: initialDataA,
      listDataB: initialDataB,
    });
  }

  changeDataA() {
    this.setState({
      listDataA: this.props.dataMutatorA(this.state.listDataA),
    });
  }

  changeDataB() {
    this.setState({
      listDataB: this.props.dataMutatorB(this.state.listDataB),
    });
  }

  render() {
    const { listDataA, listDataB } = this.state;
    const { ListComponent, extraPropsA, extraPropsB, listComponentProps } = this.props;

    return (
      <View style={style.container}>
        <Text style={style.title}>
          {ListComponent.displayName || ListComponent.name}
        </Text>
        <View style={style.sideBySideLists}>
          <View style={style.list}>
            <View style={style.button}>
              <Button
                onPress={() => this.changeDataA()}
                title="Update Data"
              />
            </View>
            <ListComponent
              immutableData={listDataA}
              {...listComponentProps}
              {...extraPropsA}
            />
          </View>
          <View style={style.list}>
            <View style={style.button}>
              <Button
                onPress={() => this.changeDataB()}
                title="Update Data"
              />
            </View>
            <ListComponent
              immutableData={listDataB}
              {...listComponentProps}
              {...extraPropsB}
            />
          </View>
        </View>
      </View>
    );
  }

}

export default GenericListExample;
